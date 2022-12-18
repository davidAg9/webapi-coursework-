import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingcartlogic";
import { formatCurrency } from "../utilities/formatCurrency";


type StoreItemProps = {
    id: number
    productName: string
    price: number
    photoUrl: string
}


export function StoreItem({ id, productName, price, photoUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    var quantity = getItemQuantity(id);
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={photoUrl} height="200px" style={{ objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between  align-items-baseline mb-4">

                    <span className="fs-2">{productName}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>

                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
                    ) : (<div className="d-flex align-items-center flex-row" style={{ gap: ".5rem" }}>
                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div>
                            <span className="fs-3"> {quantity} </span>
                            in Cart
                        </div>
                        <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>remove</Button>
                        </div>
                    </div>)}

                </div>

            </Card.Body>
        </Card >
    );
}