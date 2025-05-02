import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../assets/firebase";
import { useUser } from "@clerk/clerk-react"; // 👈 Clerk import
import "./ProductDetail.css";
import useRefreshStore from "../store/RefreshStore";

const ProductDetail = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [loading, setLoading] = useState(true);
    const { user } = useUser(); // 👈 Get Clerk user
    const [refresh,setRefresh] = useState(false)
    const toggleRefresh = useRefreshStore((state) => state.toggleRefresh);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProductData({ ...data, id }); // 👈 include product ID
                    setMainImage(data.imageUrl?.[0] || "");
                } else {
                    setProductData(null); // Product not found
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setProductData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id,refresh]);

    const truncateDescription = (description, wordLimit = 40) => {
        const words = description.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return description;
    };

    const handleThumbnailClick = (img) => {
        setMainImage(img);
    };

    const addToCart = async () => {
        if (!user) return alert("Please log in first!");

        const cartRef = doc(db, "carts", user.id);
        const cartSnap = await getDoc(cartRef);

        let cartItems = [];
        if (cartSnap.exists()) {
            cartItems = cartSnap.data().products || [];
        }

        const index = cartItems.findIndex(item => item.id === productData.id);
        if (index !== -1) {
            cartItems[index].qty += 1;
        } else {
            cartItems.push({ ...productData, qty: 1 });
        }

        await setDoc(cartRef, { products: cartItems });
        alert("Added to cart");
        toggleRefresh()
        

    };

    if (loading) return <h2>Loading...</h2>;
    if (!productData) return <h2>Product not found</h2>;

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <div className="product-detail-left">
                    <div className="product-thumbnails">
                        {productData.imageUrl?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                onClick={() => handleThumbnailClick(img)}
                                className={mainImage === img ? "active-thumbnail" : ""}
                            />
                        ))}
                    </div>
                    <div className="product-main-image">
                        <img src={mainImage} alt={productData.name} />
                    </div>
                </div>

                <div className="product-detail-right">
                    <p className="product-brand">Brand: {productData.brand}</p>
                    <h1 className="product-name">{productData.name}</h1>
                    <p className="product-price">${productData.price}</p>
                    <p className="product-description">{truncateDescription(productData.description)}</p>
                    <div className="product-options">
                        {productData.burners !== "none" && (
                            <p><strong>Burners:</strong> {productData.burners}</p>
                        )}
                        <p><strong>Rotisserie:</strong> {productData.rotisserie === "Yes" ? "Yes" : "No"}</p>
                        <p><strong>Made in USA:</strong> {productData.madeInUSA === "Yes" ? "Yes" : "No"}</p>
                        <select name="fuelType" id="fueltype" className="fueltype-dropdown">
                            {productData.fuelType.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>

            <div className="product-detail-bottom">
                <div className="product-detail-bottom-left">
                    <h1 className="product-description-title">Description:</h1>
                    <p className="product-description">{productData.description}</p>
                </div>
                <div className="product-detail-bottom-right">
                    <h1 className="product-description-title">Feature:</h1>
                    {productData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
