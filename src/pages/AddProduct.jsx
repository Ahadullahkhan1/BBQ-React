import { useState } from "react";
import { db } from "../assets/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./EditProduct.css";

const AddProduct = () => {
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: [],
        category: "",
        subcategory: "",
        brand: "",
        features: [],
        fuelType: [],
        burners: "",
        rotisserie: "No",
        madeInUSA: "No",
    });

    const [imageInput, setImageInput] = useState("");
    const [featuresInput, setFeaturesInput] = useState("");
    const [fuelTypeInput, setFuelTypeInput] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const input = e.target.value;
        const urls = input.split(",").map((url) => url.trim());
        setImageInput(input);
        setProductData({ ...productData, imageUrl: urls });
    };

    const handleFeaturesChange = (e) => {
        const input = e.target.value;
        const feats = input.split(",").map((f) => f.trim());
        setFeaturesInput(input);
        setProductData({ ...productData, features: feats });
    };

    const handleFuelTypeChange = (e) => {
        const input = e.target.value;
        const fuels = input.split(",").map((f) => f.trim());
        setFuelTypeInput(input);
        setProductData({ ...productData, fuelType: fuels });
    };

    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, "products"), productData);
            alert("Product added successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error adding product: ", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="edit-product-container">
            <div className="edit-form">
                <h1>Add Product</h1>

                <label className="label">Product Name</label>
                <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Name" />

                <label className="label">Price</label>
                <input type="text" name="price" value={productData.price} onChange={handleChange} placeholder="Price" />

                <label className="label">Category</label>
                <input type="text" name="category" value={productData.category} onChange={handleChange} placeholder="Category" />

                <label className="label">Sub Category</label>
                <input type="text" name="subcategory" value={productData.subcategory} onChange={handleChange} placeholder="Sub Category" />

                <label className="label">Brand</label>
                <input type="text" name="brand" value={productData.brand} onChange={handleChange} placeholder="Brand" />

                <label className="label">Fuel Type (comma separated)</label>
                <input
                    type="text"
                    name="fuelType"
                    value={fuelTypeInput}
                    onChange={handleFuelTypeChange}
                    placeholder="Fuel Type"
                />

                <label className="label">Burners</label>
                <input type="text" name="burners" value={productData.burners} onChange={handleChange} placeholder="Burners" />

                <label className="label">Rotisserie</label>
                <div className="radio">
                    <div className="radio-select">
                        <input
                            type="radio"
                            name="rotisserie"
                            value="Yes"
                            checked={productData.rotisserie === "Yes"}
                            onChange={handleChange}
                        />
                        <label>Yes</label>
                    </div>
                    <div className="radio-select">
                        <input
                            type="radio"
                            name="rotisserie"
                            value="No"
                            checked={productData.rotisserie === "No"}
                            onChange={handleChange}
                        />
                        <label>No</label>
                    </div>
                    <div className="radio-select">
                        <input
                            type="radio"
                            name="rotisserie"
                            value="None"
                            checked={productData.rotisserie === "None"}
                            onChange={handleChange}
                        />
                        <label>None</label>
                    </div>
                </div>

                <label className="label">Made In USA</label>
                <div className="radio">
                    <div className="radio-select">
                        <input
                            type="radio"
                            name="madeInUSA"
                            value="Yes"
                            checked={productData.madeInUSA === "Yes"}
                            onChange={handleChange}
                        />
                        <label>Yes</label>
                    </div>
                    <div className="radio-select">
                        <input
                            type="radio"
                            name="madeInUSA"
                            value="No"
                            checked={productData.madeInUSA === "No"}
                            onChange={handleChange}
                        />
                        <label>No</label>
                    </div>
                    <div className="radio-select">
                        <input
                            type="radio"
                            name="madeInUSA"
                            value="None"
                            checked={productData.madeInUSA === "None"}
                            onChange={handleChange}
                        />
                        <label>None</label>
                    </div>
                </div>

                <label className="label">Features (comma separated)</label>
                <textarea
                    className="features"
                    name="features"
                    value={featuresInput}
                    onChange={handleFeaturesChange}
                    placeholder="Feature1, Feature2, ..."
                />

                <label className="label">Description</label>
                <textarea
                    className="features"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    placeholder="Product description..."
                />

                <label className="label">Image URLs (comma separated)</label>
                <input
                    type="text"
                    value={imageInput}
                    onChange={handleImageChange}
                    placeholder="http://img1.jpg, http://img2.jpg"
                />

                <button className="save-button" onClick={handleSubmit}>Add Product</button>
            </div>

            {/* Live Preview */}
            <div className="live-preview">
                <h2>Live Preview</h2>
                <div className="preview-card">
                    {productData.imageUrl.length > 0 ? (
                        productData.imageUrl.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Preview ${index}`}
                                style={{ width: '50%', marginBottom: '10px' }}
                            />
                        ))
                    ) : (
                        <p>No Images</p>
                    )}

                    <h3>{productData.name || "Product Name"}</h3>
                    <p><strong>Description:</strong> {productData.description || "Product Description"}</p>
                    <p><strong>Category:</strong> {productData.category || "Category"}</p>
                    <p><strong>Sub Category:</strong> {productData.subcategory || "Sub Category"}</p>
                    <p><strong>Brand:</strong> {productData.brand || "Brand"}</p>
                    <p><strong>Price:</strong> {productData.price ? `$${productData.price}` : "$0.00"}</p>
                    <p><strong>Fuel Type:</strong> {productData.fuelType.join(", ")}</p>
                    <p><strong>Burners:</strong> {productData.burners}</p>
                    <p><strong>Rotisserie:</strong> {productData.rotisserie}</p>
                    <p><strong>Made in USA:</strong> {productData.madeInUSA}</p>

                    <div className="features">
                        <p><strong>Features:</strong></p>
                        <ul>
                            {productData.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
