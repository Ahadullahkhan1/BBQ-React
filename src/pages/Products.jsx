// src/pages/Products.jsx

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../assets/firebase";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
        };

        getProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id}>
                        <img src={product.image[0]} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
