import { ReactNode } from "react";
import SwapPay from "../apis/swappay";
import { Transaction, TransactionRequest } from "../models";
type SwapProviderProps = {
    instance: SwapPay;
    children: ReactNode;
};
type SwapContextInterface = {
    transaction: TransactionRequest;
    isCompleted: (func: VoidFunction) => void;
    openSwap: () => void;
    closeSwap: () => void;
    pay: () => Promise<Transaction>;
    updateDetails: (dits: Object) => void;
    updateAmount: (amount: number) => void;
    updatePin: (pin: string) => void;
    updateDebitAccount: (no: number) => void;
    updateReference: (msg: string) => void;
};
export declare function useSwap(): SwapContextInterface;
export declare function SwapProvider({ instance, children }: SwapProviderProps): JSX.Element;
export {};
