import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../assets/firebase";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import './Cart.css';
import useRefreshStore from "../store/RefreshStore";

const CartSidebar = ({ isOpen, onClose }) => {
    const { user } = useUser();
    const [cart, setCart] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const refresh = useRefreshStore((state) => state.refresh);
    console.log(refresh, "refresh")
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       const local = JSON.parse(localStorage.getItem("refreshCart"));
    //       setRefreshTrigger(local);
    //     //   console.log("hello")
    //     }, 1000); // Check every second (or adjust)

    //     return () => clearInterval(interval);
    //   }, []);


    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;
            const cartRef = doc(db, "carts", user.id);
            const cartSnap = await getDoc(cartRef);
            if (cartSnap.exists()) {
                const cartData = cartSnap.data().products.map(item => {
                    console.log(typeof item.price, "itemitem");
                    return {
                        ...item,
                        // price: parseFloat(item.price) || 0, // convert string to number safely
                        // qty: item.qty || 1                 // default to 1 if missing
                    };
                });

                setCart(cartData);
            }
        };
        fetchCart();
    }, [user, refresh]);


    console.log(cart, "cart acrt")
    // Function to update the quantity in Firestore and state
    const updateQuantity = async (itemId, newQty) => {
        if (!user) return;

        const updatedCart = cart.map(item =>
            item.id === itemId ? { ...item, qty: newQty } : item
        );

        // Update cart in Firestore
        const cartRef = doc(db, "carts", user.id);
        await updateDoc(cartRef, { products: updatedCart });

        // Update local state
        setCart(updatedCart);
    };

    // Function to remove an item from the cart
    const removeItem = async (itemId) => {
        if (!user) return;

        const updatedCart = cart.filter(item => item.id !== itemId);

        // Update cart in Firestore
        const cartRef = doc(db, "carts", user.id);
        await updateDoc(cartRef, { products: updatedCart });

        // Update local state
        setCart(updatedCart);
    };

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = isNaN(item.price) ? parseFloat(item.price.replace(/,/g, '')) : item.price; // Fallback to 0 if price is invalid
            const qty = isNaN(item.qty) ? 0 : item.qty; // Fallback to 0 if qty is invalid
            return total + (price * qty);
        }, 0).toFixed(2);
    };


    console.log(cart, "")
    return (
        <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
            <div className="cart-header">
                <h2>Your Cart</h2>
                <button onClick={onClose}>✖</button>
            </div>
            <div className="cart-body">
                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    cart.map((item) => (

                        <div key={item.id} className="cart-item">
                            <h4>{item.name}</h4>
                            <p>Price: ${item.price}</p>
                            <div className="cart-item-qty">
                                <p>Qty:
                                    <button
                                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                                        disabled={item.qty <= 1}>
                                        -
                                    </button>
                                    <h5>{item.qty}</h5>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.qty + 1)}>
                                        +
                                    </button>
                                </p>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="remove-item">
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="cart-footer">
                    <div>
                    <p>Total: ${calculateTotal()}</p>
                    </div>
                    <div className="cart-footer-2">
                        <button className="view-cart" onClick={() => console.log('Viewing cart')}>
                            View Cart
                        </button>
                        <button className="checkout" onClick={() => console.log('Proceeding to checkout')}>
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;
