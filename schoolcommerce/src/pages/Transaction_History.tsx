import React from "react"
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap"
import { Admin } from "../data/models/admin"
import { Student } from "../data/models/student"
import { formatCurrency } from "../utilities/formatCurrency"



type TransactionHistoryProps = {
    title: string,
    userIdFieldName: string
    isFeeTransaction: boolean
    refundBtton: boolean

}
export function TransactionHistory({ title, userIdFieldName, isFeeTransaction, refundBtton }: TransactionHistoryProps) {
    return (
        <Container>
            <Row className="mb-200">

                <Col id="image">
                    <Image src="" alt="photoUrl" />
                </Col>

                <Col id="info">
                    <h4>
                        <strong>Name :</strong><p>name</p><br />
                        <strong>{userIdFieldName} :</strong><p>id</p>
                    </h4>
                </Col>
                <Col>
                    <h4>
                        <strong>Amount Earned :</strong><strong className="text-success">{formatCurrency(2432)}</strong>

                        {(isFeeTransaction && <div>
                            <div> <strong>Status :</strong><strong className={true ? "text-danger" : "text-success"}>Paid</strong></div>
                            <Button variant="primary" disabled>Pay Fees</Button>
                        </div>)}
                    </h4>
                </Col>
            </Row>
            <div style={{ height: "100px" }}>
            </div>
            <Container id="transactions">
                <h4 className="text-dark">{title} History</h4>
                <Table striped bordered hover responsive="md">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Txn ID</th>
                            <th>Amount (GHS)</th>
                            <th>Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John</td>
                            <td>Doe</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jane</td>
                            <td>Smith</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Bob</td>
                            <td>Johnson</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>


        </Container>


    )
}



