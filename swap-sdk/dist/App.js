import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SwapProvider } from "./context/swapcontext";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import { SwapPaymentPortal } from "./ui/pages/portal";
export default function SwapApp({ swapInstance, children }) {
    return (_jsxs(SwapProvider, { instance: swapInstance, children: [_jsx(Routes, { children: _jsx(Route, { path: 'swappay', element: _jsx(SwapPaymentPortal, { isOpen: true }) }) }), children] }));
}
//# sourceMappingURL=App.js.map