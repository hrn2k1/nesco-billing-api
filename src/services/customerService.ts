import { ICustomerBill, ICustomerBillResponse, ICustomerInfo } from "../Dtos/customerBill";
import { IMonthlyConsumption, IMonthlyConsumptionResponse, IRechargeHistory, IRechargeHistoryResponse } from "../Dtos/rechargeHistory";

const axios = require("axios") as typeof import("axios");
const cheerio = require("cheerio");

function createSessionAwareClient() {
    const cookies = new Map<string, string>();

    const setCookies = (headerValue?: string | string[]) => {
        const values = Array.isArray(headerValue) ? headerValue : headerValue ? [headerValue] : [];

        values.forEach((cookieHeader) => {
            cookieHeader.split(",").forEach((part) => {
                const match = part.match(/([^=;]+)=([^;]+)/);
                if (!match) return;
                const key = match[1].trim();
                const value = match[2].trim();
                if (key) cookies.set(key, value);
            });
        });
    };

    const client = axios.create({
        withCredentials: true,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
        },
        validateStatus: () => true
    });

    client.interceptors.request.use((config: any) => {
        const cookieHeader = Array.from(cookies.entries()).map(([key, value]) => `${key}=${value}`).join("; ");
        if (cookieHeader) {
            config.headers = config.headers || {};
            config.headers.Cookie = cookieHeader;
        }
        return config;
    });

    client.interceptors.response.use((response: any) => {
        setCookies(response.headers?.["set-cookie"]);
        return response;
    });

    return client;
}

async function fetchHtmlPage(client: any, url: string, extraHeaders: Record<string, string> = {}) {
    const response = await client.get(url, {
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            ...extraHeaders
        }
    });

    const contentType = response.headers?.["content-type"] || "";
    const html = typeof response.data === "string"
        ? response.data
        : Buffer.isBuffer(response.data)
            ? response.data.toString("utf-8")
            : String(response.data ?? "");

    if (response.status < 200 || response.status >= 300) {
        throw new Error(
            `NESCO returned HTTP ${response.status} for ${url}. ` +
            `Content-Type=${contentType}. Response=${html.slice(0, 500)}`
        );
    }

    if (!html || html.trim().length === 0) {
        throw new Error(`Empty HTML response from ${url}. Status=${response.status}. Content-Type=${contentType}`);
    }

    return { response, html };
}

function assertSuccessfulResponse(response: any, url: string) {
    if (response.status < 200 || response.status >= 300) {
        const contentType = response.headers?.["content-type"] || "";
        const body = typeof response.data === "string" ? response.data : JSON.stringify(response.data);
        throw new Error(
            `NESCO returned HTTP ${response.status} for ${url}. ` +
            `Content-Type=${contentType}. Response=${body.slice(0, 500)}`
        );
    }
}

export class CustomerService {
    public constructor() { }

    private parseNumber(value: string): number {
        if (!value) return 0;

        return Number(
            value
                .replace(/,/g, "")
                .replace(/\u00A0/g, "")
                .trim()
        ) || 0;
    }

    private parseDate(value: string): Date | null {
        value = value.trim();

        if (!value)
            return null;

        const date = new Date(value);

        return isNaN(date.getTime())
            ? null
            : date;
    }
    public async getPostpaidCustomerBills(customerAccount: string): Promise<ICustomerBillResponse | null> {
        const webDomain = "https://customer.nesco.gov.bd/";
        const webUrl = `${webDomain}post/bill`;
        try {
            const client = createSessionAwareClient();

            const { html, response } = await fetchHtmlPage(client, webUrl, {
                Referer: webDomain,
                Origin: webDomain,
            });

            console.log("GET /post/bill status:", response.status);
            console.log("GET /post/bill content-type:", response.headers?.["content-type"]);
            console.log("GET /post/bill snippet:", html.slice(0, 400));

            const $ = cheerio.load(html);
            const csrfToken = $("input[name='_token']").val() || $("meta[name='csrf-token']").attr("content");

            console.log("Token=", csrfToken);

            const qs = new URLSearchParams();
            qs.append("_token", String(csrfToken));
            qs.append("cust_no", customerAccount.trim());
            qs.append("submit", "All Bills");
            const postResponse = await client.post(webUrl,
                qs.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-CSRF-TOKEN": String(csrfToken),
                        "X-Requested-With": "XMLHttpRequest",
                        Referer: webDomain,
                        Origin: webDomain
                    }
                }
            );

            assertSuccessfulResponse(postResponse, webUrl);

            const resultHtml = postResponse.data;
            const $2 = cheerio.load(resultHtml);

            const bills: ICustomerBill[] = [];
            const customerInfo: ICustomerInfo = { type: "postpaid", meterStatus: "active" };
            $2("#con_info_div .card-body .form-group.row input[type='text']")
                .each((index: number, input: any) => {
                    switch (index) {
                        case 0:
                            customerInfo.name = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 1:
                            customerInfo.careOf = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 2:
                            customerInfo.address = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 3:
                            customerInfo.mobile = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 4:
                            customerInfo.concernOffice = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 5:
                            customerInfo.feederName = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 6:
                            customerInfo.consumerNo = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 9:
                            customerInfo.meterNo = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 10:
                            customerInfo.loadKw = Number($2(input).val()) || 0;
                            break;
                        case 11:
                            customerInfo.tariff = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 12:
                            customerInfo.meterType = $2(input).val()?.toString()?.trim() || "";
                            break;
                    };
                });

            $2("table tbody tr").each((index: number, row: any) => {
                const cells = $2(row).find("td");
                if (cells.length < 10)
                    return;

                const link = cells.eq(0).find("a");

                bills.push({
                    billNo: link.text().trim(),
                    detailUrl: link.attr("href"),
                    consumerNo: link.attr("data-consno"),
                    year: Number(cells.eq(1).text().trim()),
                    month: cells.eq(2).text().trim(),
                    totalBill: Number(cells.eq(3).text().trim()),
                    lateFee: Number(cells.eq(4).text().trim()),
                    dueDate: cells.eq(5).text().trim(),
                    paidAmount: Number(cells.eq(6).text().trim()),
                    paymentDate: cells.eq(7).text().trim(),
                    paymentMethod: cells.eq(8).text().trim(),
                    paymentStatus: cells.eq(9).text().trim()
                });
            });

            console.log(bills);

            return {
                customerInfo,
                bills
            } as ICustomerBillResponse;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("NESCO customer bills request failed", {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    responseData: error.response?.data
                });
            } else {
                console.error("NESCO customer bills processing failed", error);
            }

            throw error;
        }
    }

    public async getPrepaidCustomerRechargeHistories(customerAccount: string): Promise<IRechargeHistoryResponse | null> {
        const webDomain = "https://customer.nesco.gov.bd/";
        const webUrl = `${webDomain}pre/panel`;
        try {
            const client = createSessionAwareClient();

            const { html, response } = await fetchHtmlPage(client, webUrl, {
                Referer: webDomain,
                Origin: webDomain,
            });

            console.log("GET /pre/panel status:", response.status);
            console.log("GET /pre/panel content-type:", response.headers?.["content-type"]);
            console.log("GET /pre/panel snippet:", html.slice(0, 400));

            const $ = cheerio.load(html);
            const csrfToken = $("input[name='_token']").val() || $("meta[name='csrf-token']").attr("content");

            console.log("Token:", csrfToken);

            const qs = new URLSearchParams();
            qs.append("_token", String(csrfToken));
            qs.append("cust_no", customerAccount.trim());
            qs.append("submit", "Recharge History");
            const postResponse = await client.post(webUrl,
                qs.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-CSRF-TOKEN": String(csrfToken),
                        "X-Requested-With": "XMLHttpRequest",
                        Referer: webDomain,
                        Origin: webDomain
                    }
                }
            );

            assertSuccessfulResponse(postResponse, webUrl);

            const resultHtml = postResponse.data;
            const $2 = cheerio.load(resultHtml);

            const customerInfo: ICustomerInfo = { type: "prepaid", meterStatus: "active" };
            $2("#con_info_div .card-body .form-group.row input[type='text']")
                .each((index: number, input: any) => {
                    switch (index) {
                        case 0:
                            customerInfo.name = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 1:
                            customerInfo.careOf = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 2:
                            customerInfo.address = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 3:
                            customerInfo.mobile = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 4:
                            customerInfo.concernOffice = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 5:
                            customerInfo.feederName = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 6:
                            customerInfo.consumerNo = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 7:
                            customerInfo.meterNo = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 8:
                            customerInfo.loadKw = Number($2(input).val()) || 0;
                            break;
                        case 9:
                            customerInfo.tariff = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 10:
                            customerInfo.meterType = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 11:
                            customerInfo.meterStatus = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 14:
                            customerInfo.balance = Number($2(input).val()) || 0;
                            break;
                    };
                });

            const rechargeHistory: IRechargeHistory[] = [];

            $2("table tbody tr").each((index: number, row: any) => {
                const td = $(row).find("td");

                if (td.length < 15)
                    return;

                rechargeHistory.push({

                    slNo: this.parseNumber(td.eq(0).text()),

                    seqNo: td.eq(1).text().trim(),

                    tokenNumber: td.eq(2).text().trim(),

                    meterRent: this.parseNumber(td.eq(3).text()),

                    demandCharge: this.parseNumber(td.eq(4).text()),

                    pfcCharge: this.parseNumber(td.eq(5).text()),

                    vat: this.parseNumber(td.eq(6).text()),

                    paidDebt: this.parseNumber(td.eq(7).text()),

                    rebate: this.parseNumber(td.eq(8).text()),

                    energyAmount: this.parseNumber(td.eq(9).text()),

                    rechargeAmount: this.parseNumber(td.eq(10).text()),

                    estimatedUnit: this.parseNumber(td.eq(11).text()),

                    rechargeMedia: td.eq(12).text().trim(),

                    rechargeDate: this.parseDate(td.eq(13).text()),

                    remoteRechargeStatus: td.eq(14).text().trim()
                });
            });
            console.log(rechargeHistory);

            return {
                customerInfo,
                rechargeHistories: rechargeHistory
            } as IRechargeHistoryResponse;

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("NESCO customer bills request failed", {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    responseData: error.response?.data
                });
            } else {
                console.error("NESCO customer bills processing failed", error);
            }

            throw error;
        }
    }

    public async getPrepaidCustomerMonthlyConsumption(customerAccount: string): Promise<IMonthlyConsumptionResponse | null> {

        const webDomain = "https://customer.nesco.gov.bd/";
        const webUrl = `${webDomain}pre/panel`;
        try {
            const client = createSessionAwareClient();

            const { html, response } = await fetchHtmlPage(client, webUrl, {
                Referer: webDomain,
                Origin: webDomain,
            });

            console.log("GET /pre/panel status:", response.status);
            console.log("GET /pre/panel content-type:", response.headers?.["content-type"]);
            console.log("GET /pre/panel snippet:", html.slice(0, 400));

            const $ = cheerio.load(html);
            const csrfToken = $("input[name='_token']").val() || $("meta[name='csrf-token']").attr("content");

            console.log("Token:", csrfToken);

            const qs = new URLSearchParams();
            qs.append("_token", String(csrfToken));
            qs.append("cust_no", customerAccount.trim());
            qs.append("submit", "Monthly Consumption");
            const postResponse = await client.post(webUrl,
                qs.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-CSRF-TOKEN": String(csrfToken),
                        "X-Requested-With": "XMLHttpRequest",
                        Referer: webDomain,
                        Origin: webDomain
                    }
                }
            );

            assertSuccessfulResponse(postResponse, webUrl);

            const resultHtml = postResponse.data;
            const $2 = cheerio.load(resultHtml);

            const customerInfo: ICustomerInfo = { type: "prepaid", meterStatus: "active" };
            $2("#con_info_div .card-body .form-group.row input[type='text']")
                .each((index: number, input: any) => {
                    switch (index) {
                        case 0:
                            customerInfo.name = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 1:
                            customerInfo.careOf = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 2:
                            customerInfo.address = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 3:
                            customerInfo.mobile = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 4:
                            customerInfo.concernOffice = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 5:
                            customerInfo.feederName = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 6:
                            customerInfo.consumerNo = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 7:
                            customerInfo.meterNo = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 8:
                            customerInfo.loadKw = Number($2(input).val()) || 0;
                            break;
                        case 9:
                            customerInfo.tariff = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 10:
                            customerInfo.meterType = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 11:
                            customerInfo.meterStatus = $2(input).val()?.toString()?.trim() || "";
                            break;
                        case 14:
                            customerInfo.balance = Number($2(input).val()) || 0;
                            break;
                    };
                });

            const monthlyConsumptions: IMonthlyConsumption[] = [];

            $2("table tbody tr").each((index: number, row: any) => {
                const td = $(row).find("td");

                monthlyConsumptions.push({

                    year: this.parseNumber(td.eq(0).text()),
                    month: td.eq(1).text().trim(),
                    totalRecharge: this.parseNumber(td.eq(2).text()),
                    rebate: this.parseNumber(td.eq(3).text()),
                    energyUsage: this.parseNumber(td.eq(4).text()),
                    meterRent: this.parseNumber(td.eq(5).text()),
                    demandCharge: this.parseNumber(td.eq(6).text()),
                    pfcCharge: this.parseNumber(td.eq(7).text()),
                    paidDebt: this.parseNumber(td.eq(8).text()),
                    vat: this.parseNumber(td.eq(9).text()),
                    totalUsageDeduction: this.parseNumber(td.eq(10).text()),
                    monthEndBalance: this.parseNumber(td.eq(11).text()),
                    energyUsageUnit: this.parseNumber(td.eq(12).text())
                });
            });
            console.log(monthlyConsumptions);

            return {
                customerInfo,
                monthlyConsumptions
            } as IMonthlyConsumptionResponse;

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("NESCO customer bills request failed", {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    responseData: error.response?.data
                });
            } else {
                console.error("NESCO customer bills processing failed", error);
            }

            throw error;
        }
    }
}
