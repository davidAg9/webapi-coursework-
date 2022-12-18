import { jsx as _jsx } from "react/jsx-runtime";
import { Spinner } from "react-bootstrap";
import { useSwap } from "../../context/swapcontext";
import { SwapErrorPayment } from "./paymenterror";
import { SwapSuccessPayment } from "./paymentsuccess";
export function SwapStatus({ tid, isLoading, isSuccess, msg = "" }) {
    const { transaction } = useSwap();
    if (isLoading) {
        return (_jsx("div", { className: "d-flex align-items-center justify-content-center", style: { height: "200px" }, children: _jsx(Spinner, { animation: "border", variant: "danger", className: "mx-auto", children: " " }) }));
    }
    else if (isSuccess) {
        return (_jsx(SwapSuccessPayment, { id: tid, amount: transaction.txn.amount }));
    }
    else if (!isSuccess) {
        return (_jsx(SwapErrorPayment, { msg: msg, amount: transaction.txn.amount }));
    }
    else {
        return (_jsx("div", { children: "Something went horribly wrong" }));
    }
}
//# sourceMappingURL=status.js.map