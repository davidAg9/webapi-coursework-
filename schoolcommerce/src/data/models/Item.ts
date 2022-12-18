export class Item {
   readonly id:number
   readonly productName:string
   readonly price:number
   readonly photoUrl:string

    constructor(id:number,name:string, price:number, photoUrl:string){
        this.id = id
        this.productName = name
        this.price = price
        this.photoUrl = photoUrl
    }   
}