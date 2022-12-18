import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FontAwesome from "react-fontawesome";
export function SwapErrorPayment({ msg, amount }) {
    return (_jsxs("div", { children: [_jsxs("div", { className: "text-danger d-flex align-items-center justify-content-center", children: [" ", _jsx("strong", { children: "Error" }), _jsx(FontAwesome, { name: "exclamation" }), _jsx("br", {})] }), _jsx("div", { className: "container ", children: _jsxs("p", { className: "text-danger", children: [_jsx("br", {}), msg ?? "Something went wrong", "Payment of GHS ", amount, " could not be completed."] }) })] }));
}
//# sourceMappingURL=paymenterror.js.map