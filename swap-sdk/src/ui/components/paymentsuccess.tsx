import { Card, Row } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
interface SwapSuccessPaymentProps {
    id: string
    amount: number
}


export function SwapSuccessPayment({ id, amount }: SwapSuccessPaymentProps) {
    return (

        <Card className="d-flex align-items-center justify-content-center">
            <Card.Title>
                <Row className="d-flex justify-content-center">
                    <strong className=" text-success"><h3><FontAwesome name="check" className="text-success" />Success !</h3></strong>
                </Row>
            </Card.Title>
            <Card.Body>
                <div className="text-dark">
                    Your transaction  id is {id}
                    Payment of GHS {amount} completed
                </div>
            </Card.Body>

        </Card>
        // <div>
        //     <div> Success</div>
        //     <div>CheckMark</div>
        //     Your transaction  id is {id}
        //     Payment of GHS {amount} completed
        // </div>
    );
}