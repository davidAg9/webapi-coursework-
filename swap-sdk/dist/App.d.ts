import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SwapPay from "./apis/swappay";
type SwapAppProps = {
    swapInstance: SwapPay;
    children: ReactNode;
};
export default function SwapApp({ swapInstance, children }: SwapAppProps): JSX.Element;
export {};
