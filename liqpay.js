/*

LiqPay handler by SashaGoncharov19 © 2022

const api = liqpay.api('request', {
    "action"   : "invoice_bot",
    "version"  : "3",
    "amount"   : "900",
    "currency" : "UAH",
    "order_id" : "order_id_7",
    "phone": "+380933333333",
    "server_url": "https://test.api",
    "description": "Hello world!"
}).then((data) => console.log(data))


 */


const axios = require('axios');
const base64 = require('base-64');
const crypto = require('crypto');
const qs = require("qs");
const sha1 = crypto.createHash('sha1');

let liqpay = {};
liqpay.public_key = 'public_key';
liqpay.private_key = 'private_key';

liqpay.api_url = 'https://www.liqpay.ua/api/'

liqpay.api = async function (method, params, callback) {
    if (!method) return callback(new Error('Method missing!'))

    params = params || {};
    params.public_key = liqpay.public_key;
    params.description = params['description'];

    const enc_data = base64.encode(JSON.stringify(params))

    const sign_string = liqpay.private_key + enc_data + liqpay.private_key;
    const signature = base64.encode(sha1.update(sign_string).digest('binary'));

    const {data} = await axios({
        method: 'POST',
        url: liqpay.api_url + method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
            'data': enc_data,
            'signature': signature
        })
    })

    return data
}

module.exports = liqpay;