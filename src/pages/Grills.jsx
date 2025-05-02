import React, { useState, useEffect } from 'react';
import './Grills.css';
import FilterSidebar from '../Components/FilterSidebar';
import { images } from '../assets';
import { Link } from 'react-router-dom';
import { db } from '../assets/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Grills = () => {
  const [filters, setFilters] = useState({
    brands: [],
    burners: [],
    fuelTypes: [],
    rotisserie: [],
    madeInUSA: [],
    priceRanges: [],
  });

  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      }
    };

    getProducts();
  }, []);
  console.log(products, "products");
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filterGrills = (grill) => {
    const {
      priceRanges,
    } = filters;


    if (priceRanges.length > 0) {
      const matched = priceRanges.some((range) => {
        const [min, max] = range.split("-");
        const grillPrice = parseInt(grill.price);

        if (isNaN(grillPrice)) return false;

        if (max === "+") return grillPrice >= parseInt(min);
        return grillPrice >= parseInt(min) && grillPrice <= parseInt(max);
      });

      if (!matched) return false;
    }

    return true;
  };
 
  const visibleProducts = products.filter(filterGrills);
  console.log(visibleProducts, "visibleProducts");


  const isAnyFilterApplied = Object.values(filters).some(filter => filter.length > 0);

  const filteredProducts = isAnyFilterApplied
    ? products.filter(product => {
      const matchBrand = filters.brands.includes(product.brand);
      const matchBurners = filters.burners.includes(product.burners);
      const matchFuelType = product.fuelType?.some(ft => filters.fuelTypes.includes(ft));
      const matchRotisserie = filters.rotisserie.includes(product.rotisserie);
      const matchMadeInUSA = filters.madeInUSA.includes(product.madeInUSA);
      const matchPriceRange = filters.priceRanges.some(range => {
        const [min, max] = range.split("-");
        const price = parseFloat(product.price.replace(/,/g, ""));
        if (max === "+") return price >= parseInt(min);
        return price >= parseInt(min) && price <= parseInt(max);
      });

      return (
        (filters.brands.length === 0 || matchBrand) &&
        (filters.burners.length === 0 || matchBurners) &&
        (filters.fuelTypes.length === 0 || matchFuelType) &&
        (filters.rotisserie.length === 0 || matchRotisserie) &&
        (filters.madeInUSA.length === 0 || matchMadeInUSA) &&
        (filters.priceRanges.length === 0 || matchPriceRange)
      );
    })
    : products;


  return (
    <div>
      <h1 className='grill-title'>
        Grills <span>({filteredProducts.length} Product Found)</span>
      </h1>


      <div className='grill-Container'>
        <div className='grill-Sub-Container1'>
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        <div className='grill-Sub-Container2'>
          <img src={images.blaze} className='grill-Image' alt="" />

          <div className="view-dropdown">
            <select value={view} onChange={(e) => setView(e.target.value)}>
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </select>
          </div>

          <div className={`product-display ${view}`}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <Link to={`/product/${item.id}`} className="product-card" key={item.id}>
                  <img src={item.imageUrl[0]} alt={item.name} />
                  <div className='product-info'>
                    <div className='product-info-1'>
                      <h3 className='product-title'>{item.name}</h3>
                      <div className='product-features'>
                        <ul>
                          {item.features?.slice(0, 3).map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className='product-info-2'>
                      <p className='product-price'>Price: ${item.price}</p>
                      <p className='product-shipping'>
                        <span>Free Shipping</span> when you order 5 bags or more, within a 50-mile range!
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No products match the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grills;
