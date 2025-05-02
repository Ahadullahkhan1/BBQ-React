import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../assets/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
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
    fuelType: "",
    burners: "",
    rotisserie: "No",
    madeInUSA: "No",
  });
  const [imageInput, setImageInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const data = productSnap.data();

        const imagesArray = Array.isArray(data.imageUrl)
          ? data.imageUrl
          : typeof data.imageUrl === "string"
            ? data.imageUrl.split(",").map((url) => url.trim())
            : [];

        const featuresArray = Array.isArray(data.features)
          ? data.features
          : typeof data.features === "string"
            ? data.features.split(",").map((f) => f.trim())
            : [];

        setProductData({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          imageUrl: imagesArray,
          category: data.category || "",
          brand: data.brand || "",
          features: featuresArray,
          fuelType: data.fuelType || "",
          burners: data.burners || "",
          rotisserie: data.rotisserie || "No",
          madeInUSA: data.madeInUSA || "No",
          subcategory: data.subcategory || "",
        });

        setImageInput(imagesArray.join(", "));
        setFeaturesInput(featuresArray.join(", "));
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const urls = e.target.value.split(",").map(url => url.trim());
    setImageInput(e.target.value);
    setProductData({ ...productData, imageUrl: urls });
  };

  const handleFeaturesChange = (e) => {
    const feats = e.target.value.split(",").map(f => f.trim());
    setFeaturesInput(e.target.value);
    setProductData({ ...productData, features: feats });
  };

  const handleUpdate = async () => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, productData);
    alert("Product updated successfully!");
    navigate("/admin/products");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted successfully!");
      navigate("/admin/products");
    }
  };

  return (
    <div className="edit-product-container">
      <div className="edit-form">
        <h1>Edit Product</h1>

        <label className="label">Product Name</label>
        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Name" />

        <label className="label">Product Price</label>
        <input type="text" name="price" value={productData.price} onChange={handleChange} placeholder="Price" />

        <label className="label">Product Category</label>
        <input type="text" name="category" value={productData.category} onChange={handleChange} placeholder="Category" />

        <label className="label">Product Sub Category</label>
        <input type="text" name="subcategory" value={productData.subcategory} onChange={handleChange} placeholder="Sub Category" />

        <label className="label">Product Brand</label>
        <input type="text" name="brand" value={productData.brand} onChange={handleChange} placeholder="Brand" />

        <label className="label">Product Features (separated by commas)</label>
        <textarea
          className="features"
          name="features"
          value={featuresInput}
          onChange={handleFeaturesChange}
          placeholder="Feature1, Feature2, ..."
        />

        <label className="label">Product Fuel Type</label>
        <input type="text" name="fuelType" value={productData.fuelType} onChange={handleChange} placeholder="Fuel Type" />

        <label className="label">Product Burners</label>
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

        <label className="label">Product Description</label>
        <textarea className="features" name="description" value={productData.description} onChange={handleChange} placeholder="Description"></textarea>

        <label className="label">Product Images (separated by commas)</label>
        <input type="text" value={imageInput} onChange={handleImageChange} placeholder="http://img1.jpg, http://img2.jpg" />

        <button className="save-button" onClick={handleUpdate}>Save Changes</button>
        <button className="delete-button" onClick={handleDelete}>Delete Product</button>
      </div>

      <div className="live-preview">
        <h2>Live Preview</h2>
        <div className="preview-card">
          {productData.imageUrl.length > 0 ? (
            productData.imageUrl.map((url, index) => (
              <img key={index} src={url} alt={`Preview ${index}`} style={{ width: '50%', marginBottom: '10px' }} />
            ))
          ) : (
            <p>No Images</p>
          )}

          <h3>{productData.name || "Product Name"}</h3>
          <p>{productData.description || "Product Description"}</p>

          <p><strong>Category:</strong> {productData.category || "Category"}</p>
          <p><strong>Sub Category:</strong> {productData.subcategory || "Sub Category"}</p>
          <p><strong>Brand:</strong> {productData.brand || "Brand"}</p>
          <p><strong>Price:</strong> {productData.price ? `$${productData.price}` : "$0.00"}</p>

          <p><strong>Fuel Type:</strong> {productData.fuelType}</p>
          <p><strong>Burners:</strong> {productData.burners}</p>
          <p><strong>Rotisserie:</strong> {productData.rotisserie}</p>
          <p><strong>Made in USA:</strong> {productData.madeInUSA}</p>

          <div className="features">
            <p> <strong>Features:</strong> {productData.features.map((f, i) => <li key={i}>{f}</li>)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
