import { MongoClient, Db } from "mongodb";
import { Collection, ObjectId } from "mongodb";
import { Admin } from "../data/models/admin";
import { Student } from "../data/models/student";
import { PurchaseTransaction } from "../data/models/transaction";






const client = new MongoClient("mongodb://<host>:<port>/", );
const db: Db = client.db("schoolcommerce");
const studentcollection: Collection = db.collection("student");
const admincollection: Collection = db.collection("admins");




// async function getStudent(stdNo:string) : Promise<Student> {

// }


// async function payStudentFees(amount:number) : Promise<Student> {

// }



// async function getAdmin(email:string):  Promise<Admin>{
  
// }


// async function getTransactions(forAdminID:string):  Promise<[PurchaseTransaction]>{
  
// }


// async function AddTransaction(forAdminID:string,txnID:string):  Promise<PurchaseTransaction>{
  
// }
// async function refundTransaction(txnID:string):  Promise<PurchaseTransaction>{
  
// }








// // await collection.insertOne({
// //     _id: new ObjectId(),
// //     name: "John Doe",
// //     age: 30
// //   });
  



//   export async function connectToDatabase() {
   

//     await client.connect();
//   }