import React from 'react'
import { getmore, images } from '../assets'
import './Home.css'

const Home = () => {
  return (
    <div>
      <div className='banner-container'>
        <div className='banner-1'>
          <img src={images['banner1']} alt="" />
        </div>
        <div className='banner-2'>
          <div>
            <img src={images['banner2']} alt="" />
          </div>
          <div>
            <img src={images['banner3']} alt="" />
          </div>
        </div>
      </div>
      <div className='promotion'>
        <h1>Promotions & Special Offers</h1>
        <div className='promotion-images'>
          <img src={images['section2image1']} alt="" />
          <img src={images['section2image2']} alt="" />
          <img src={images['section2image3']} alt="" />
          <img src={images['section2image4']} alt="" />
          <img src={images['section2image5']} alt="" />
          <img src={images['section2image6']} alt="" />
        </div>
      </div>
      <div className='Departments'>
        <img src="https://cdn.shocho.co/sc-site/campaigns/2025-BestOf2025/Homepage/03.05.2025-Homepage-2Up-BestOf-Desktop.jpg" alt="" />
        <img src="https://cdn.shocho.co/sc-site/campaigns/2025-BestOf2025/Homepage/03.05.2025-Homepage-2Up-BuyingGuides-Desktop.jpg" alt="" />
      </div>
      <div className='Brands'>
        <h1>Popular Brands</h1>
        <div className='brand-images'>
          <img src={images['brand1']} alt="" />
          <img src={images['brand2']} alt="" />
          <img src={images['brand3']} alt="" />
          <img src={images['brand4']} alt="" />
          <img src={images['brand5']} alt="" />
        </div>
      </div>
      <div className='services'>
        <img src={images['services']} alt="" />
      </div>
      <div className='services'>
        <img src={images['services2']} alt="" />
      </div>
      <div className='getmore'>
        <h1>Get More at BBQ Guys</h1>
        <div className='getmore-card'>
          {
            getmore.map((item, index) => (
              <div key={index} className='getmore-card-icon'>
                <item.icon className='icon' />
                <div className='getmore-card-title'>
                  <h5>{item.title}</h5>
                  <p>{item.para}</p>
                </div>
              </div>
            ))
          }

        </div>
      </div>

    </div>
  )
}

export default Home