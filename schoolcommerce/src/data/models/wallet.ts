export class Wallet {
   readonly accountNumber :string;
    balance:number;

    constructor(accountNumber:string, balance :number = 0){
        this.accountNumber = accountNumber
        this.balance = balance
    }
}