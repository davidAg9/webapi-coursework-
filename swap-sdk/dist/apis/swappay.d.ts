import { Transaction, TransactionRequest } from "../models";
export default class SwapPay {
    static instance: SwapPay;
    private secretKey;
    private BaseUrl;
    private endpoint;
    constructor(param: swapparams);
    initialized(): Promise<void>;
    AcceptPayments(param: transactionparams): Promise<Transaction>;
    RefundPayments(transaction_id: string): Promise<void>;
}
interface swapparams {
    apikey: string;
}
interface transactionparams {
    txnPayload: TransactionRequest;
}
export {};
