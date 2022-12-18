import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useSwap } from "../../context/swapcontext";
import { formatCurrency } from "../../utilites/formatCurrency";
import SwapLogo from "../components/swaplogo";
import { SwapStatus } from "../components/status";
import { PaymentVerificationForm } from "../components/verifypaymentform";
import PayWithSwapButton from "../components/PaywithSwap";
export function SwapPaymentPortal({ isOpen }) {
    const { transaction, closeSwap } = useSwap();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    return (_jsxs(Modal, { show: isOpen, onHide: () => { setErrMsg(""); setIsFormComplete(false); closeSwap(); }, children: [_jsxs(Modal.Header, { closeButton: true, children: [_jsx(SwapLogo, {}), _jsxs(Modal.Title, { className: "mx-auto", children: [_jsx("br", {}), _jsx("div", { children: _jsxs("h3", { className: "text-success", children: ["  ", "Pay  ", formatCurrency(transaction.txn.amount), " "] }) })] })] }), (!isLoading && !isFormComplete && _jsx(Modal.Body, { children: _jsx(PaymentVerificationForm, {}) })), isFormComplete && _jsx(SwapStatus, { isLoading: isLoading, isSuccess: isSuccess, msg: errMsg, tid: "" }), (!isLoading && !isSuccess && _jsxs(Modal.Footer, { children: [_jsx(PayWithSwapButton, { onSuccess: function (txn) {
                            setLoading(false);
                            setIsSuccess(true);
                            setErrMsg("");
                        }, onError: function (err) {
                            setLoading(false);
                            setErrMsg(String(err));
                            setIsSuccess(false);
                        }, onLoading: function () {
                            setIsFormComplete(true);
                            setErrMsg("");
                            setLoading(true);
                            setIsSuccess(false);
                        } }), !isSuccess && !isLoading && errMsg.length === 0 && _jsx(Button, { variant: "danger", onClick: () => { setErrMsg(""); setIsFormComplete(false); closeSwap(); }, children: "cancel Payment" })] }))] }));
}
//# sourceMappingURL=portal.js.map