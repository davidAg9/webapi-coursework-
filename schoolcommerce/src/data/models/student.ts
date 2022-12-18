

export class Student{
    readonly studentNo:string
    readonly name:string
    readonly  feeAmount:number
    readonly  lastPaid:Date
    readonly isOwing:boolean
    year:number
    semester:1|2

    constructor(id:string,name:string, feeamount:number,lastPaid:Date,owing:boolean,year:number,sem:1|2 =1){
        this.studentNo = id
        this.name = name
        this.feeAmount = feeamount
        this.lastPaid = lastPaid
        this.isOwing = owing
        this.year = year
        this.semester = sem
    }

}