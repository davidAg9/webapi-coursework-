import { Image } from "react-bootstrap";

const logo = require('../../images/logo.jpg');





export default function SwapLogo() {
    return (
        <div >
            < Image width={150} height={80} src={logo} alt="Logo" />
        </div >
    )
}