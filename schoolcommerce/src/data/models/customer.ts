import { Wallet } from "./wallet"

export class Customer {
    id:string
    name:string
    email:string|null
    phone :string|null
    dateCreated:string
  readonly  wallet:Wallet|null


    constructor(id:string ,name:string,email:string|null = null,phone:string|null = null,wallet:Wallet|null,createdDate?:Date){
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
        this.wallet =wallet
        if(createdDate !== undefined){
         this.dateCreated = createdDate.toISOString()
        }else{
            this.dateCreated = Date.now().toString()
        }

    }
    

}