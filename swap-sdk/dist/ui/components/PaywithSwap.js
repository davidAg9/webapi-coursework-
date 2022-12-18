import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "react-bootstrap";
import { useSwap } from "../../context/swapcontext";
export default function PayWithSwapButton({ onLoading, onSuccess, onError }) {
    const { pay } = useSwap();
    return (_jsx(Button, { variant: "outline-dark", onClick: () => { onLoading(); pay().then(val => onSuccess(val)).catch(msg => onError(msg)); }, size: "lg", children: "Pay with Swap" }));
}
//# sourceMappingURL=PaywithSwap.js.map