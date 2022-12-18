import { Container, Navbar, Nav, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/shoppingcartlogic";
import Logo from "./logo";


export function NavBar() {

    const { openCart, cartQuantity } = useShoppingCart();

    return (
        <Navbar className="bg-white shadow-sm mb-3" sticky="top">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}>{<Logo />}</Nav.Link>
                    <Nav.Link to="/admin" as={NavLink}>Admin</Nav.Link>
                    <Nav.Link to="/student" as={NavLink}>Student</Nav.Link>

                </Nav>
                {cartQuantity > 0 && (
                    <Button onClick={openCart} style={{ height: "3rem", width: "4rem", position: "relative" }} variant="outline-primary" className="rounded-rectangle ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{ color: "white", height: "1.5rem", width: "1.5rem", position: "absolute", bottom: 0, right: 0, transform: "translate(25%,25%)" }}>
                            {cartQuantity}
                        </div>
                    </Button>
                )}

            </Container>
        </Navbar>
    );
}