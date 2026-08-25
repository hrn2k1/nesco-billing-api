import { CustomerBill } from "../Dtos/customerBill";

const axios = require("axios") as typeof import("axios");
const cheerio = require("cheerio");
const { CookieJar } = require("tough-cookie");
const { wrapper } = require("axios-cookiejar-support");

export class CustomerService {
    public constructor() { }

    public async getPostpaidCustomerBills(customerAccount: string): Promise<CustomerBill[] | null> {
        try {
            const jar = new CookieJar();
            const client = wrapper(
                axios.create({
                    jar,
                    withCredentials: true,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
                    }
                } as any)
            );

            const getResponse = await client.get("https://customer.nesco.gov.bd/post/bill");
            const html = getResponse.data;
            const $ = cheerio.load(html);
            const csrfToken = $("input[name='_token']").val();

            console.log("Token:", csrfToken);

            const qs = new URLSearchParams();
            qs.append("_token", csrfToken);
            qs.append("cust_no", customerAccount);
            qs.append("submit", "All Bills");
            const postResponse = await client.post("https://customer.nesco.gov.bd/post/bill",
                qs.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Referer: "https://customer.nesco.gov.bd/",
                        Origin: "https://customer.nesco.gov.bd"
                    }
                }
            );

            const resultHtml = postResponse.data;
            const $2 = cheerio.load(resultHtml);

            const bills: CustomerBill[] = [];

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

}
