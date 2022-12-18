import { jsx as _jsx } from "react/jsx-runtime";
import { Image } from "react-bootstrap";
const logo = require('../../images/logo.jpg');
export default function SwapLogo() {
    return (_jsx("div", { children: _jsx(Image, { width: 150, height: 80, src: logo, alt: "Logo" }) }));
}
//# sourceMappingURL=swaplogo.js.map