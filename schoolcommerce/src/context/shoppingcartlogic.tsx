import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/shoppingcart";
import { useLocalStorage } from "../hooks/uselocalstorage";

type ShoppingCartProviderProps = {
    children: ReactNode,
}


type ShoppingCartContext = {
    cartQuantity: number
    cartItems: CartItem[]
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void

}


type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);



export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

    const cartQuantity = cartItems.reduce((quantity, item) => {
        return item.quantity + quantity;
    }, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: number): number {
        return cartItems.find((item) => {
            return item.id === id
        })?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        return setCartItems(function (currentItems) {
            if (currentItems.find((item) => {
                return item.id === id;
            }) == null) {
                return [...currentItems, { id, quantity: 1 }];
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        })
    }
    function decreaseCartQuantity(id: number) {
        return setCartItems(currentItems => {
            if (currentItems.find((item) => item.id === id)?.quantity === 1) {
                return currentItems.filter((filtitem) => filtitem.id !== id)
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number) {
        return setCartItems(currentItems => {
            return currentItems.filter((filtitem) => filtitem.id !== id)
        })

    }


    return (
        <ShoppingCartContext.Provider value={{ cartQuantity, cartItems, openCart, closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}