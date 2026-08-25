import { ICustomerBill } from "../Dtos/customerBill";
import { IRechargeHistory } from "../Dtos/rechargeHistory";

const axios = require("axios") as typeof import("axios");
const cheerio = require("cheerio");
const { CookieJar } = require("tough-cookie");

async function getCookieJarWrapper() {
    const mod = await import("axios-cookiejar-support");
    return mod.wrapper;
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
    public async getPostpaidCustomerBills(customerAccount: string): Promise<ICustomerBill[] | null> {
        const webDomain = "https://customer.nesco.gov.bd/";
        const webUrl = `${webDomain}post/bill`;
        try {
            const jar = new CookieJar();
            const { wrapper } = await import("axios-cookiejar-support");
            const client: any = (wrapper as any)(
                axios.create({
                    jar,
                    withCredentials: true,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
                    }
                } as any)
            );

            const getResponse = await client.get(webUrl);
            const html = getResponse.data;
            const $ = cheerio.load(html);
            const csrfToken = $("input[name='_token']").val();

            console.log("Token:", csrfToken);

            const qs = new URLSearchParams();
            qs.append("_token", csrfToken);
            qs.append("cust_no", customerAccount);
            qs.append("submit", "All Bills");
            const postResponse = await client.post(webUrl,
                qs.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Referer: webDomain,
                        Origin: webDomain
                    }
                }
            );

            const resultHtml = postResponse.data;
            const $2 = cheerio.load(resultHtml);

            const bills: ICustomerBill[] = [];

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

            return bills;
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

    public async getPrepaidCustomerRechargeHistories(customerAccount: string): Promise<IRechargeHistory[] | null> {
        const webDomain = "https://customer.nesco.gov.bd/";
        const webUrl = `${webDomain}pre/panel`;
        try {
            const jar = new CookieJar();
            const { wrapper } = await import("axios-cookiejar-support");
            const client: any = (wrapper as any)(
                axios.create({
                    jar,
                    withCredentials: true,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
                    }
                } as any)
            );

            const getResponse = await client.get(webUrl);
            const html = getResponse.data;
            const $ = cheerio.load(html);
            const csrfToken = $("input[name='_token']").val();

            console.log("Token:", csrfToken);

            const qs = new URLSearchParams();
            qs.append("_token", csrfToken);
            qs.append("cust_no", customerAccount);
            qs.append("submit", "Recharge History");
            const postResponse = await client.post(webUrl,
                qs.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Referer: webDomain,
                        Origin: webDomain
                    }
                }
            );

            const resultHtml = postResponse.data;
            const $2 = cheerio.load(resultHtml);

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

            return rechargeHistory;
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
