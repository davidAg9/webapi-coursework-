
export  interface Transaction{
transaction_id :string;
amount :number;
debit_acct:string;
credit_acct:string;
reference:string|undefined;
createdAt:Date|undefined;
metadata:MetaData|undefined;
details:TransactionDetails|undefined;
}



export interface TransactionDetails {

}


export interface MetaData {
fag:boolean
refunded:boolean
}



export type TransactionRequest = {
    pn: string,
    txn: {
        amount: number
        debit_acct: number
        reference: string
        details: any
    }
}