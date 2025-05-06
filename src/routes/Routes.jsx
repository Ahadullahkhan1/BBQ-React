import React from 'react'
import { Route, Routes } from 'react-router-dom'  // Yeh line correct import hai
import Grills from '../pages/Grills'
import Accessories from '../pages/Accessories'
import Contact from '../pages/Contact'
import Fuel from '../pages/Fuel'
import OutdoorKitchens from '../pages/OutdoorKitchens'
import CharcoalGrills from '../pages/CharcoalGrills'
import BuiltInCharcoalGrills from '../pages/BuiltInCharcoalGrills'
import PortableCharcoalGrills from '../pages/PortableCharcoalGrills'
import KettleGrills from '../pages/KettleGrills'
import ElectricGrills from '../pages/ElectricGrills'
import FreestandingCharcoalGrills from '../pages/FreestandingCharcoalGrills' // Ye bhi zaroori hai agar use ho raha hai
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import EditProduct from '../pages/EditProduct'
import ProductList from '../pages/ProductList'
import AddProduct from '../pages/AddProduct'
import TermsOfUs from '../pages/TermsOfUs'
import ShippingDelivery from '../pages/ShippingDelivery'
import Returns from '../pages/Returns'
import Careers from '../pages/Careers'
import CustomerTestimonials from '../pages/CustomerTestimonials'
import DesignCenterLocations from '../pages/DesignCenterLocations'
import NotFound from '../pages/NotFound'
import AboutUs from '../pages/AboutUs.jsx'
import ViewCart from '../pages/ViewCart.jsx'
import Checkout from '../pages/Checkout.jsx'
import MaintainingYourOutdoorGrillTipsforLongevityandPerformance from '../pages/MaintainingYourOutdoorGrillTipsforLongevityandPerformance.jsx'
import UltimateGuide from '../pages/UltimateGuide.jsx'
import UltimateChecklist from '../pages/UltimateChecklist.jsx'
import GrillLike from '../pages/GrillLike.jsx'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/grills" element={<Grills />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/fuel" element={<Fuel />} />
            <Route path="/outdoorkitchen" element={<OutdoorKitchens />} />
            <Route path="/charcoalgrills" element={<CharcoalGrills />} />
            <Route path="/builtincharcoalgrills" element={<BuiltInCharcoalGrills />} />
            <Route path="/freestandingcharcoalgrills" element={<FreestandingCharcoalGrills />} />
            <Route path="/portablecharcoalgrills" element={<PortableCharcoalGrills />} />
            <Route path="/kettlegrills" element={<KettleGrills />} />
            <Route path="/electricgrills" element={<ElectricGrills />} />
            <Route path="/termsofuse" element={<TermsOfUs />} />
            <Route path="/shippingdelivery" element={<ShippingDelivery />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/customertestimonials" element={<CustomerTestimonials />} />
            <Route path="/designcenterlocations" element={<DesignCenterLocations />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/viewcart" element={<ViewCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/maintainingyouroutdoorgrilltipsforlongevityandperformance" element={<MaintainingYourOutdoorGrillTipsforLongevityandPerformance />} />
            <Route path="/ultimateguide" element={<UltimateGuide />} />
            <Route path="/ultimatechecklist" element={<UltimateChecklist />} />
            <Route path="/grilllike" element={<GrillLike />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
