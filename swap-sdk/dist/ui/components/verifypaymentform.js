import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Form } from "react-bootstrap";
import { useSwap } from "../../context/swapcontext";
export function PaymentVerificationForm() {
    const { updateDebitAccount, updatePin, updateReference } = useSwap();
    return (_jsx(Col, { xs: 12, children: _jsx(Form, { className: "d-flex align-items-center w-200", children: _jsxs(Form.Group, { controlId: "formAccount", children: [_jsx(Form.Label, { children: "Account No" }), _jsx(Form.Control, { type: "number", id: "accno", maxLength: 16, placeholder: "Enter account number", onChange: (e) => updateDebitAccount(Number(e.target.value)) }), _jsx(Form.Label, { children: "Pin" }), _jsx(Form.Control, { maxLength: 6, id: "pin", type: "password", placeholder: "Enter your pin", onChange: (e) => updatePin(e.target.value) }), _jsx(Form.Label, { children: "Reference" }), _jsx(Form.Control, { type: "text", id: "ref", maxLength: 250, placeholder: "eg.payment for book", onChange: (e) => updateReference(e.target.value) })] }) }) }));
}
//# sourceMappingURL=verifypaymentform.js.map