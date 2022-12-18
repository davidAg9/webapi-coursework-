import { PurchaseTransaction } from "./transaction"

export class Admin{
    readonly id:string
    readonly name:string
    readonly  email:string
    txns:[PurchaseTransaction]
   

    constructor(id:string,name:string,email:string,transactions:[PurchaseTransaction]){
        this.id = id
        this.name = name
        this.email =email
        this.txns = transactions
    }

}