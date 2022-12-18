import { ReactNode, createContext, useContext, useState, } from "react"
import SwapPay from "../apis/swappay"
import { Transaction, TransactionRequest } from "../models"
import { SwapPaymentPortal } from "../ui/pages/portal"





type SwapProviderProps = {
    instance: SwapPay
    children: ReactNode

}

type SwapContextInterface = {
    transaction: TransactionRequest
    isCompleted: (func: VoidFunction) => void;
    openSwap: () => void
    closeSwap: () => void
    pay: () => Promise<Transaction>
    updateDetails: (dits: Object) => void
    updateAmount: (amount: number) => void
    updatePin: (pin: string) => void
    updateDebitAccount: (no: number) => void
    updateReference: (msg: string) => void



}

const SwapContext = createContext({} as SwapContextInterface)

export function useSwap() {
    return useContext(SwapContext);
}

export function SwapProvider({ instance, children }: SwapProviderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [transaction, setTransaction] = useState<TransactionRequest>({ pn: "", txn: { amount: 0, debit_acct: 0, reference: "", details: {} } })

    const openSwap = () => setIsOpen(true);
    const closeSwap = () => setIsOpen(false);

    function isCompleted(func: VoidFunction) { func() };

    function updateDetails(dits: Object) {
        setTransaction((currTxn) => ({ ...currTxn, txn: { ...currTxn.txn, details: dits } }))
    }

    async function pay() {
        return instance.AcceptPayments({ txnPayload: transaction })
    }

    function updateAmount(amount: number) {
        setTransaction((currTxn) => ({ ...currTxn, txn: { ...currTxn.txn, amount: amount } }));
    }

    function updatePin(pin: string) {
        setTransaction((currTxn) => ({ ...currTxn, pn: pin }));
    }

    function updateDebitAccount(no: number) {
        setTransaction((currTxn) => ({ ...currTxn, txn: { ...currTxn.txn, debit_acct: no } }))
    }

    function updateReference(msg: string) {
        setTransaction((currTxn) => ({ ...currTxn, txn: { ...currTxn.txn, reference: msg } }));
    }




    return (
        <SwapContext.Provider value={{ transaction, openSwap, closeSwap, pay, updateDetails, updateAmount, updateDebitAccount, updatePin, updateReference, isCompleted }}>
            {children}
            <SwapPaymentPortal isOpen={isOpen}  ></SwapPaymentPortal>
        </SwapContext.Provider>
    );
}