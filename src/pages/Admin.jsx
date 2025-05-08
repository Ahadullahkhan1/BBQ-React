import React, { useEffect, useState } from 'react';
import { db } from '../assets/firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './Admin.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [statusFilter, setStatusFilter] = useState('pending');

    useEffect(() => {
        const fetchOrders = async () => {
            const snapshot = await getDocs(collection(db, 'orders'));
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const updatedList = list.map(order => ({
                ...order,
                status: order.status || 'pending' // agar status nahi mila to pending assume karo
            }));

            setOrders(updatedList);
            setFilteredOrders(updatedList.filter(order => order.status === 'pending'));
            generateChartData(updatedList);
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }, [statusFilter, orders]);

    const generateChartData = (orders) => {
        const monthlyCounts = {};

        orders.forEach(order => {
            if (!order.createdAt?.seconds) return;
            const date = new Date(order.createdAt.seconds * 1000);
            const month = date.toLocaleString('default', { month: 'short' });
            monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        });

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const data = months.map(month => ({
            month,
            orders: monthlyCounts[month] || 0,
        }));

        setChartData(data);
    };

    const handleUpdate = async (orderId, newStatus) => {
        await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
        setOrders(prev => {
            const updated = prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            );
            generateChartData(updated);
            return updated;
        });
    };

    const handleDelete = async (orderId) => {
        await deleteDoc(doc(db, 'orders', orderId));
        setOrders(prev => prev.filter(order => order.id !== orderId));
    };
    return (
        <div className="admin-orders">
            <h2>Admin Order Panel</h2>

            {/* Chart */}
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Filters */}
            <div className="filter-options">
                <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                </select>

                <select onChange={(e) => setViewMode(e.target.value)} value={viewMode}>
                    <option value="grid">Grid View</option>
                    <option value="list">List View</option>
                </select>
            </div>

            {filteredOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className={`order-${viewMode}`}>
                    {filteredOrders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-card-header">
                                <div className='product-image-container'>
                                    {
                                        order.products?.map((item, index) => {
                                            return (
                                                <img src={item.imageUrl[0]} className='product-image' key={index} alt="" />
                                            );
                                        })
                                    }

                                </div>
                                <div className="order-info">
                                    <p><strong>Name:</strong> {order.fullName}</p>
                                    <p><strong>Email:</strong> {order.email}</p>
                                    <p><strong>Phone:</strong> {order.phone}</p>
                                    <p><strong>Address:</strong> {order.address}</p>
                                    <p><strong>Status:</strong> {order.status || 'Pending'}</p>
                                </div>
                            </div>

                            <h4 className='order-product-title'>Products:</h4>
                            <ul className='order-product-name'>
                                {order.products?.map((item, idx) => (
                                    <li key={idx}>
                                        <strong>{item.name}</strong> — {item.qty} × ${item.price}
                                    </li>
                                ))}
                            </ul>
                            <p className="total-price">
                                <strong>Total:</strong> $
                                {Array.isArray(order.products)
                                    ? order.products.reduce((acc, p) => {
                                        let price = parseFloat(p.price.toString().replace(/,/g, '')) || 0;
                                        let qty = parseInt(p.qty, 10) || 0;
                                        return acc + (price * qty);
                                    }, 0).toLocaleString()
                                    : '0'}
                            </p>






                            <div className="admin-buttons">
                                <button className='approve-btn' onClick={() => handleUpdate(order.id, 'completed')}>Complete</button>
                                <button className='pending-btn' onClick={() => handleUpdate(order.id, 'rejected')}>Reject</button>
                                <button onClick={() => handleDelete(order.id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
};

export default AdminOrders;