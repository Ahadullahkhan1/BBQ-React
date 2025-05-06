import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../assets/firebase';
import './Checkout.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    try {
      const orderData = {
        userId: user.id,
        ...formData,
        products: cart,
        total: calculateTotal(),
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "orders"), orderData); // save order
      await setDoc(doc(db, "carts", user.id), { products: [] }); // clear cart

      setCart([]);
      toast.success("Order placed successfully!");
      navigate('/order-success');
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
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
