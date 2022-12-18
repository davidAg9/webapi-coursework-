import { TransactionHistory } from "../Transaction_History";



export function StudentPage() {
    return (
        <div>
            <h1>Welcome Dear Student</h1>
            <TransactionHistory title={"Fee Payment"} userIdFieldName={"Student No"} isFeeTransaction={true} refundBtton={false} />
        </div>
    )
}