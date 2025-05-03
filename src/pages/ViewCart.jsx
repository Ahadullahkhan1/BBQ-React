import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../assets/firebase'; // ✅ Make sure your db is exported properly
import './ViewCart.css'
import { Link } from 'react-router-dom';
const ViewCart = () => {
    const { user } = useUser();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;

            try {
                const cartRef = doc(db, "carts", user.id);
                const cartSnap = await getDoc(cartRef);

                if (cartSnap.exists()) {
                    const cartData = cartSnap.data().products || [];
                    setCart(cartData);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, [user]);

    const updateQuantity = async (itemId, newQty) => {
        if (!user) return;

        const updatedCart = cart.map(item =>
            item.id === itemId ? { ...item, qty: newQty } : item
        );

        try {
            const cartRef = doc(db, "carts", user.id);
            await updateDoc(cartRef, { products: updatedCart });
            setCart(updatedCart);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeItem = async (itemId) => {
        if (!user) return;

        const updatedCart = cart.filter(item => item.id !== itemId);

        try {
            const cartRef = doc(db, "carts", user.id);
            await updateDoc(cartRef, { products: updatedCart });
            setCart(updatedCart);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = isNaN(item.price) ? parseFloat(item.price.toString().replace(/,/g, '')) : item.price;
            const qty = isNaN(item.qty) ? 0 : item.qty;
            return total + price * qty;
        }, 0).toFixed(2);
    };

    return (
        <div className='Viewcart'>
            <h2>Your Cart</h2>
            <div className="cart-body">
                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.imageUrl[0]} alt="" />
                            <h4>{item.name}</h4>
                            <p>Price: ${item.price}</p>
                            <div className="cart-item-qty">
                                <p>Qty:
                                    <button onClick={() => updateQuantity(item.id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                                </p>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="remove-item">
                                Remove
                            </button>
                        </div>

                    ))
                )}
            </div>
            <div className='cart-footer'>
                {cart.length > 0 && (
                    <div className="cart-total">
                        <h3>Total: ${calculateTotal()}</h3>
                    </div>
                )}
                {
                    <Link to={'/checkout'} className='checkout-button'>Checkout</Link>
                }
            </div>
        </div>
    );
};

export default ViewCart;
