import FontAwesome from "react-fontawesome";


interface SwapErrorPaymentProps {
    msg: string
    amount: number
}


export function SwapErrorPayment({ msg, amount }: SwapErrorPaymentProps) {
    return (
        <div >
            <div className="text-danger d-flex align-items-center justify-content-center"> <strong>Error</strong>
                <FontAwesome name="exclamation"></FontAwesome><br /></div>

            <div className="container ">
                <p className="text-danger"><br />{msg ?? "Something went wrong"}
                    Payment of GHS {amount} could not be completed.</p>
            </div>
        </div>
    );
}