import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../assets/firebase';
import './Checkout.css';

const Checkout = () => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
  });

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

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = isNaN(item.price) ? parseFloat(item.price.toString().replace(/,/g, '')) : item.price;
      const qty = isNaN(item.qty) ? 0 : item.qty;
      return total + price * qty;
    }, 0).toFixed(2);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", formData, cart);
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button type="submit">Place Order</button>
        </form>
      </div>

      <div className="checkout-right">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="checkout-item">
              <img src={item.imageUrl[0]} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>Qty: {item.qty}</p>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))
        )}
        <h3>Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
};

export default Checkout;
