import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingcartlogic";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./cartitem";
import storeitems from "../data/json/items.json"
import { useSwap } from "swap-sdk/dist/context/swapcontext"




interface ShoppingCartProps {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {

    const { closeCart, cartItems, cartQuantity } = useShoppingCart()
    const { updateAmount, transaction, openSwap, updateDetails } = useSwap()
    function setCheckOutDetails() {
        var totalAmount = cartItems.reduce((total, cartitem) => {
            const item = storeitems.find((i) => i.id === cartitem.id)
            return total + (item?.price || 0) * cartitem.quantity
        }, 0)

        updateAmount(totalAmount)
        updateDetails({ products: cartItems });
        closeCart()
        openSwap()
        // console.log("amount to pay is", transaction.txn.amount)
    }
    return (<Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (<CartItem key={item.id} {...item}></CartItem>))}
                <div className="ms-auto fw-bold fs-5">Total{" "} {formatCurrency(
                    cartItems.reduce((total, cartitem) => {
                        const item = storeitems.find((i) => i.id === cartitem.id)
                        return total + (item?.price || 0) * cartitem.quantity
                    }, 0)
                )}</div>

                <Button variant="outline-primary" onClick={() => {
                    setCheckOutDetails();
                }} size="lg">
                    Go to checkout
                </Button>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    );
}

export default ShoppingCart;