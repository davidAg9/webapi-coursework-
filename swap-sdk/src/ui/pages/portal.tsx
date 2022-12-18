import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useSwap } from "../../context/swapcontext";
import { formatCurrency } from "../../utilites/formatCurrency";
import SwapLogo from "../components/swaplogo";
import { SwapStatus } from "../components/status";
import { PaymentVerificationForm } from "../components/verifypaymentform";
import PayWithSwapButton from "../components/PaywithSwap";
import { Transaction } from "../../models";





interface SwapPaymentPortalProps {
    isOpen: boolean

}


export function SwapPaymentPortal({ isOpen }: SwapPaymentPortalProps) {

    const { transaction, closeSwap } = useSwap()


    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isFormComplete, setIsFormComplete] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [errMsg, setErrMsg] = useState<string>("")


    return (

        <Modal show={isOpen} onHide={() => { setErrMsg(""); setIsFormComplete(false); closeSwap() }}   >
            <Modal.Header closeButton  >
                <SwapLogo />
                <Modal.Title className="mx-auto" >
                    <br />
                    <div >
                        <h3 className="text-success" >{"  "}Pay  {formatCurrency(transaction.txn.amount)} </h3>
                    </div>
                </Modal.Title>
            </Modal.Header  >
            {(!isLoading && !isFormComplete && <Modal.Body >
                <PaymentVerificationForm />
            </Modal.Body>)}
            {isFormComplete && <SwapStatus isLoading={isLoading} isSuccess={isSuccess} msg={errMsg} tid={""} />}
            {(!isLoading && !isSuccess && <Modal.Footer>
                <PayWithSwapButton onSuccess={function (txn: Transaction): void {

                    setLoading(false);
                    setIsSuccess(true);
                    setErrMsg("")
                }} onError={function (err: any): void {
                    setLoading(false)
                    setErrMsg(String(err));
                    setIsSuccess(false);

                }} onLoading={function (): void {
                    setIsFormComplete(true)
                    setErrMsg("")
                    setLoading(true)
                    setIsSuccess(false)
                }}></PayWithSwapButton>
                {!isSuccess && !isLoading && errMsg.length === 0 && <Button variant="danger" onClick={() => { setErrMsg(""); setIsFormComplete(false); closeSwap() }}>cancel Payment</Button>}
            </Modal.Footer>)
            }
        </Modal >




    );
}