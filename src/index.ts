import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto'
const sha = crypto.createHmac("aes-256-cbc-hmac-sha256", 'secretKey xxx')
// var cry = (crypto.getCiphers());



export default class BiZuYun {
    ak: string = "accessKey xxx";
    sk: string = "secretKey xxx";
    req: AxiosInstance;
    url: string = "https://api.fubt.co/v1/"
    /**
     * 
     * @param ak 
     * @param sk 
     */
    constructor(ak: string, sk: string) {
        this.ak = ak;
        this.sk = sk;
        this.req = axios.create({ withCredentials: true })
    }
    /**
     * 下单
     * @param count 数量
     * @param matchType 匹配类型
     * @param payPwd 支付密码
     * @param symbol 交易对
     * @param type 交易类型
     * @param price 
     * @param source 
     */
    async saveEntrust(count: number, matchType: "LIMIT" | "MARKET", payPwd: string, symbol: string, type: "BUY" | "SALE", price: number = 0, source: string = '') {
        return await this.req.post(this.getUrl('order/saveEntrust'), { count, matchType, payPwd, price, source, symbol, type })
    }
    getUrl(method: string) {
        return `${this.url}${method}`
    }
    /**
     * 签名
     * @param data 
     */
    sign(data: { [index: string]: string | number }) {
        let strs = [];
        data['accessKey'] = this.ak;
        for (let k of Object.keys(data)) {
            strs.push(`${k}=${data[k]}`)
        }
        let str = strs.sort().join('&')
        return `${str}&signature=${sha.update(str).digest('base64')}`
    }
}