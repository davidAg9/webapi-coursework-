import { Spinner } from "react-bootstrap";
import { useSwap } from "../../context/swapcontext";
import { SwapErrorPayment } from "./paymenterror";
import { SwapSuccessPayment } from "./paymentsuccess";




type SwapStatusProps = {
    isLoading: boolean
    isSuccess: boolean
    msg: string
    tid: string
}
export function SwapStatus({ tid, isLoading, isSuccess, msg = "" }: SwapStatusProps) {
    const { transaction } = useSwap()

    if (isLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                <Spinner animation="border" variant="danger" className="mx-auto" > </Spinner>
            </div>)
    }
    else if (isSuccess) { return (<SwapSuccessPayment id={tid} amount={transaction.txn.amount} />) }
    else if (!isSuccess) { return (<SwapErrorPayment msg={msg} amount={transaction.txn.amount}></SwapErrorPayment>) }
    else {
        return (<div>Something went horribly wrong</div>)
    }





}