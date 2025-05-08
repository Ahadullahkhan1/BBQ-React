import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../assets/firebase";
import "./FilterSidebar.css";
import { FaBars, FaFilter } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const FilterSidebar = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);
  const [burnerOptions, setBurnerOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [rotisserieOptions] = useState(["Yes", "No"]);
  const [madeInUSAOptions] = useState(["Yes", "No"]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [burners, setBurners] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [rotisserie, setRotisserie] = useState([]);
  const [madeInUSA, setMadeInUSA] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);

  const priceOptions = [
    { label: "$0 - $3000", value: "0-3000" },
    { label: "$3001 - $6000", value: "3001-6000" },
    { label: "$6001 - $9000", value: "6001-9000" },
    { label: "$9001+", value: "9001-+" },
  ];

  useEffect(() => {
    const fetchUniqueOptions = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(doc => doc.data());

      const uniqueBrands = [...new Set(data.map(item => item.brand))];

      const uniqueBurners = [...new Set(data.map(item => item.burners))];
      const uniqueFuel = [
        ...new Set(
          data.flatMap(item =>
            Array.isArray(item.fuelType)
              ? item.fuelType
              : [item.fuelType]
          )
        ),
      ];

      setBrands(uniqueBrands.filter(Boolean));
      setBurnerOptions(uniqueBurners.filter(Boolean).map(String));
      setFuelOptions(uniqueFuel.filter(Boolean));
    };

    fetchUniqueOptions();
  }, []);

  useEffect(() => {
    onFilterChange({
      brands: selectedBrands,
      burners,
      fuelTypes,
      rotisserie,
      madeInUSA,
      priceRanges,
    });
  }, [selectedBrands, burners, fuelTypes, rotisserie, madeInUSA, priceRanges]);

  const handleCheckboxChange = (e, state, setState) => {
    const value = e.target.value;
    if (e.target.checked) {
      setState([...state, value]);
    } else {
      setState(state.filter((v) => v !== value));
    }
    console.log(state, "filter state")
  };


  const handleBrandChange = (brand) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
  };


  return (
    <>
      <div className="mobile-filter-toggle">
        <button onClick={toggleMobileFilter}><FaFilter /> Filter</button>
      </div>

      <div className={`filter-sidebar ${isMobileFilterOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMobileFilter}><FaXmark /></button>
        {/* Brand */}
        <div>
          <h3 className="filter-title"><span>-</span> Brand</h3>
          {brands.map((brand) => (
            <div key={brand} className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="checkbox"
                />
                {brand}
              </label>
            </div>
          ))}
        </div>

        {/* Burners */}
        <div>
          <h3 className="filter-title"><span>-</span> Number of Burners</h3>
          {burnerOptions.map((num) => (
            <div key={num} className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  value={num}
                  checked={burners.includes(num)}
                  onChange={(e) => handleCheckboxChange(e, burners, setBurners)}
                  className="checkbox"
                />
                {num} Burners
              </label>
            </div>
          ))}
        </div>

        {/* Fuel Type */}
        <div>
          <h3 className="filter-title"><span>-</span> Fuel Type</h3>
          {fuelOptions.map((type) => (
            <div key={type} className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  value={type}
                  checked={fuelTypes.includes(type)}
                  onChange={(e) => handleCheckboxChange(e, fuelTypes, setFuelTypes)}
                  className="checkbox"
                />
                {type}
              </label>
            </div>
          ))}
        </div>

        {/* Rotisserie */}
        <div>
          <h3 className="filter-title"><span>-</span> Rotisserie Burner</h3>
          {rotisserieOptions.map((opt) => (
            <div key={opt} className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  value={opt}
                  checked={rotisserie.includes(opt)}
                  onChange={(e) => handleCheckboxChange(e, rotisserie, setRotisserie)}
                  className="checkbox"
                />
                {opt}
              </label>
            </div>
          ))}
        </div>

        {/* Made in USA */}
        <div>
          <h3 className="filter-title"><span>-</span> Made In USA</h3>
          {madeInUSAOptions.map((opt) => (
            <div key={opt + "usa"} className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  value={opt}
                  checked={madeInUSA.includes(opt)}
                  onChange={(e) => handleCheckboxChange(e, madeInUSA, setMadeInUSA)}
                  className="checkbox"
                />
                {opt}
              </label>
            </div>
          ))}
        </div>

        {/* Price */}
        <div>
          <h3 className="filter-title"><span>-</span> Price</h3>
          {priceOptions.map((price) => (
            <div key={price.value} className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  value={price.value}
                  checked={priceRanges.includes(price.value)}
                  onChange={(e) => handleCheckboxChange(e, priceRanges, setPriceRanges)}
                  className="checkbox"
                />
                {price.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );

};

export default FilterSidebar;
