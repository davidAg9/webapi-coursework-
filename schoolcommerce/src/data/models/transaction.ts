import { Item } from "./Item"

export class PurchaseTransaction{
    readonly txnId:string
    readonly  amount:number
    readonly  date:string
    readonly products:[Item]
    status:"purchase"|"refunded"

    constructor(id:string, amount:number,date:string,item:[Item],status:"purchase"|"refunded"){
        this.txnId = id
        this.amount = amount
        this.date = date
        this.products = item
        this.status = status
    }

}