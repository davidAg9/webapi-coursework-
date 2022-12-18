import { Col, Form } from "react-bootstrap";
import { useSwap } from "../../context/swapcontext";




export function PaymentVerificationForm() {


    const { updateDebitAccount, updatePin, updateReference } = useSwap()

    return (<Col xs={12}>
        <Form className="d-flex align-items-center w-200" >

            <Form.Group controlId="formAccount">
                <Form.Label>Account No</Form.Label>
                <Form.Control type="number" id="accno" maxLength={16} placeholder="Enter account number" onChange={(e) => updateDebitAccount(Number(e.target.value))} />


                <Form.Label>Pin</Form.Label>
                <Form.Control maxLength={6} id="pin" type="password" placeholder="Enter your pin" onChange={(e) => updatePin(e.target.value)} />

                <Form.Label>Reference</Form.Label>
                <Form.Control type="text" id="ref" maxLength={250} placeholder="eg.payment for book" onChange={(e) => updateReference(e.target.value)} />
            </Form.Group>
        </Form>
    </Col>
    );
}