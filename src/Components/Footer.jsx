import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import { BiPhoneCall } from 'react-icons/bi'
import { RiMvAiLine } from 'react-icons/ri'
import { FaRegEnvelope } from 'react-icons/fa'
const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='footer-links'>
                    <div className='footer-contact'>
                        <h1>Customer Support</h1>
                        <Link to="/contact">Contact Us</Link>
                        <Link to="/termsofuse">Terms of Use</Link>
                        <Link to="/returns">Returns</Link>
                        <Link to="/shippingdelivery">Shipping & Delivery</Link>
                    </div>
                </div>
                <div className='footer-links'>
                    <div className='footer-contact'>
                        <h1>Company Info</h1>
                        <Link to="/aboutus">About Us</Link>
                        <Link to="/designcenterlocations">Design Center Locations</Link>
                        <Link to="/careers">Careers</Link>
                        <Link to="/customertestimonials">Customer Testimonials</Link>
                    </div>
                </div>
                <div className='footer-links'>
                    <div className='footer-contact'>
                        <h1>Services</h1>
                        <a href="#">Financing</a>
                        <a href="#">Price Match</a>
                        <a href="#">3D Design Services</a>
                        <a href="#">Protection Plans</a>
                    </div>
                </div>
                <div className='footer-links'>
                    <div className='footer-contact'>
                        <h1>Learn More</h1>
                        <Link to="/maintainingyouroutdoorgrilltipsforlongevityandperformance">Maintaining Your Outdoor Grill Tips for Longevity and Performance</Link>
                        <Link to="/ultimateguide">Ultimate Guide to Planning a Functional Outdoor Kitchen</Link>
                        <Link to="/ultimatechecklist">Ultimate Checklist for Planning a Functional Outdoor Kitchen</Link>
                        <Link to="/grilllike">Grill Like a Pro: Essential Holiday Grilling Tips to Impress Your Guests</Link>
                    </div>
                </div>
                <div className='footer-links'>
                    <div className='footer-contact'>
                        <h1>Follow Us</h1>
                        <a target='_blank' href="https://www.facebook.com/BBQGrillPeople">Facebook</a>
                        <a target='_blank' href="https://www.instagram.com/bbqgrillpeople_/">Instagram</a>
                        <a target='_blank' href="https://www.youtube.com/channel/UC40qNOEy0HeP2XmOZ5Vniow">Youtube</a>
                    </div>
                </div>
            </div>
            <div className='footer-contact-2'>
                <h1>Talk to an expert now</h1>
                <a href="tel:(832) 510-1966"><BiPhoneCall /><p> (832) 510-1966</p></a>
                <a href="mailto:sales@bbqgrillpeople.com"><FaRegEnvelope /><p> sales@bbqgrillpeople.com</p></a>
                <p>Sales:
                    Mon-Fri: 9am - 6pm CST
                    Sat: 9am - 5pm CST
                    Sun: Closed CST</p>
            </div>
            <div className='footer-copyright'>
                <p>Copyright © 2025. Created by DevXtech,<br />
                    All Rights Reserved BBQ People.</p>
            </div>
        </>
    )
}

export default Footer