# liqpay-handler

```javascript
const liqpay = require('./liqpay');

const api = liqpay.api('request', {
    "action"   : "invoice_bot",
    "version"  : "3",
    "amount"   : "900",
    "currency" : "UAH",
    "order_id" : "order_id_7",
    "phone": "+380933333333",
    "server_url": "https://test.api",
    "description": "Hello world!"
}).then((data) => console.log(data));
```
