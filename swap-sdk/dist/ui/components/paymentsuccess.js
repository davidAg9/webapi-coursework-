import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
export function SwapSuccessPayment({ id, amount }) {
    return (_jsxs(Card, { className: "d-flex align-items-center justify-content-center", children: [_jsx(Card.Title, { children: _jsx(Row, { className: "d-flex justify-content-center", children: _jsx("strong", { className: " text-success", children: _jsxs("h3", { children: [_jsx(FontAwesome, { name: "check", className: "text-success" }), "Success !"] }) }) }) }), _jsx(Card.Body, { children: _jsxs("div", { className: "text-dark", children: ["Your transaction  id is ", id, "Payment of GHS ", amount, " completed"] }) })] })
    // <div>
    //     <div> Success</div>
    //     <div>CheckMark</div>
    //     Your transaction  id is {id}
    //     Payment of GHS {amount} completed
    // </div>
    );
}
//# sourceMappingURL=paymentsuccess.js.map