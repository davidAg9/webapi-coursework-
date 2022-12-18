import { ReactNode } from "react";
import { SwapProvider } from "./context/swapcontext";
import "bootstrap/dist/css/bootstrap.css"
import SwapPay from "./apis/swappay";
import { Routes, Route } from "react-router-dom";
import { SwapPaymentPortal } from "./ui/pages/portal";




type SwapAppProps = {
  swapInstance: SwapPay;
  children: ReactNode
}

export default function SwapApp({ swapInstance, children }: SwapAppProps) {

  return (

    <SwapProvider instance={swapInstance} >
      <Routes>
        <Route path='swappay' element={<SwapPaymentPortal isOpen={true} />} />
      </Routes>
      {children}
    </SwapProvider>

  );
}






