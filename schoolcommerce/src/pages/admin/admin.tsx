import React from "react"
import { TransactionHistory } from "../Transaction_History"


export function Admin() {
    return (
        <div>
            <h3>Welcome Administrator</h3>
            <TransactionHistory title={"Transaction"} userIdFieldName={"Account No"} isFeeTransaction={false} refundBtton={true} />
        </div>
    )
}


