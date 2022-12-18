export default class SwapPay {
    static instance = new SwapPay({ apikey: "66696e616c596561724032326973546f7567689ab5c4e2f9eed7d082f242def3d50e8dc5d4d2993276368a5e59715f3dc0ae31" });
    secretKey;
    BaseUrl = "http://localhost:9000/api/v1/payments";
    endpoint = async (method, endpointName, body) => fetch(`${this.BaseUrl}/${endpointName}`, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-Swap-Key": this.secretKey
        },
        body: JSON.stringify(body)
    });
    constructor(param) {
        this.secretKey = param.apikey;
    }
    async initialized() {
        var res = await fetch(`${this.BaseUrl}/hello`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Swap-Key": this.secretKey
            },
        });
        if (res.status !== 202) {
            console.error('SwapPay >> Error initializing swappay,check api  key ');
            console.error(res.statusText);
            throw new Error('SwapPay >> Error  initializing swappay,check api  key ');
        }
    }
    async AcceptPayments(param) {
        var payload = param.txnPayload;
        var result = await this.endpoint("POST", "accept", payload);
        if (result.ok) {
            return await result.json();
        }
        else {
            throw new Error(`${result.json()}`);
        }
    }
    async RefundPayments(transaction_id) {
        var result = await fetch(`${this.BaseUrl}/refund`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                "X-Swap-Key": this.secretKey
            },
            body: JSON.stringify({ "transaction_id": transaction_id })
        });
        if (result.ok) {
            return;
        }
        else {
            throw new Error(`${result.json()}`);
        }
    }
}
//# sourceMappingURL=swappay.js.map