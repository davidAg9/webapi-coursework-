import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, } from "react";
import { SwapPaymentPortal } from "../ui/pages/portal";
const SwapContext = createContext({});
export function useSwap() {
    return useContext(SwapContext);
}
export function SwapProvider({ instance, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [transaction, setTransaction] = useState({ pn: "", txn: { amount: 0, debit_acct: 0, reference: "", details: {} } });
    const openSwap = () => setIsOpen(true);
    const closeSwap = () => setIsOpen(false);
    function isCompleted(func) { func(); }
    ;
    function updateDetails(dits) {
        setTransaction((currTxn) => ({ ...currTxn, txn: { ...currTxn.txn, details: dits } }));
    }
    async function pay() {
        return instance.AcceptPayments({ txnPayload: transaction });
    }
    function updateAmount(amount) {
        setTransaction((currTxn) => ({ ...currTxn, txn: { ...currTxn.txn, amount: amount } }));
    }
    function updatePin(pin) {
        setTransaction((currTxn) => ({ ...currTxn, pn: pin }));
    }
    function updateDebitAccount(no) {
        setTransaction((currTxn) => ({ ...currTxn, txn: { ...currTxn.txn, debit_acct: no } }));
    }
    function updateReference(msg) {
        setTransaction((currTxn) => ({ ...currTxn, txn: { ...currTxn.txn, reference: msg } }));
    }
    return (_jsxs(SwapContext.Provider, { value: { transaction, openSwap, closeSwap, pay, updateDetails, updateAmount, updateDebitAccount, updatePin, updateReference, isCompleted }, children: [children, _jsx(SwapPaymentPortal, { isOpen: isOpen })] }));
}
//# sourceMappingURL=swapcontext.js.map