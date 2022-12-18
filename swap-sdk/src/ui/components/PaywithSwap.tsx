import { Button } from "react-bootstrap";
import { useSwap } from "../../context/swapcontext";
import { Transaction } from "../../models";

type PayWithSwapProps = {
    onLoading: () => void
    onSuccess: (txn: Transaction) => void
    onError: (err: any) => void
}

export default function PayWithSwapButton({ onLoading, onSuccess, onError }: PayWithSwapProps) {
    const { pay } = useSwap()
    return (
        <Button variant="outline-dark" onClick={() => { onLoading(); pay().then(val => onSuccess(val)).catch(msg => onError(msg)) }} size="lg">
            Pay with Swap
        </Button>
    )
}