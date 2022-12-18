import { Transaction, TransactionRequest } from "../models";


export default class SwapPay {
    static instance: SwapPay = new SwapPay({ apikey: "66696e616c596561724032326973546f7567689ab5c4e2f9eed7d082f242def3d50e8dc5d4d2993276368a5e59715f3dc0ae31" });


    private secretKey: string;
  
    private BaseUrl: string = "http://localhost:9000/api/v1/payments"
  
  
    private endpoint = async (method: string, endpointName: string, body: any | null): Promise<Response> => fetch(`${this.BaseUrl}/${endpointName}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "X-Swap-Key": this.secretKey
      },
  
      body: JSON.stringify(body)
  
    });
    public constructor(param: swapparams) {
      this.secretKey = param.apikey;
  
    }
  
  
  
    public async initialized(): Promise<void> {
      var res = await fetch(`${this.BaseUrl}/hello`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "X-Swap-Key": this.secretKey
        },
  
  
  
      });
      if (res.status !== 202) {
        console.error('SwapPay >> Error initializing swappay,check api  key ')
        console.error(res.statusText)
        throw new Error('SwapPay >> Error  initializing swappay,check api  key ');
      }
  
  
  
  
    }
  
  
  
    public async AcceptPayments(param: transactionparams): Promise<Transaction> {
      var payload = param.txnPayload;
  
      var result = await this.endpoint("POST", "accept", payload)
  
      if (result.ok) {
  
  
        return await result.json()
  
      } else {
        throw new Error(`${result.json()}`)
  
      }
  
    }
  
  
    public async RefundPayments(transaction_id: string): Promise<void> {
  
  
      var result = await fetch(`${this.BaseUrl}/refund`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          "X-Swap-Key": this.secretKey
  
        },
        body: JSON.stringify({ "transaction_id": transaction_id })
  
      })
  
      if (result.ok) {
  
  
        return
  
      } else {
  
        throw new Error(`${result.json()}`)
  
      }
  
    }
  
  
  
  }
  
  
  
  
  
  interface swapparams {
    apikey: string
  }
  
  interface transactionparams {
    txnPayload: TransactionRequest
  }