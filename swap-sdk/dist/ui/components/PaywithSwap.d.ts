/// <reference types="react" />
import { Transaction } from "../../models";
type PayWithSwapProps = {
    onLoading: () => void;
    onSuccess: (txn: Transaction) => void;
    onError: (err: any) => void;
};
export default function PayWithSwapButton({ onLoading, onSuccess, onError }: PayWithSwapProps): JSX.Element;
export {};
