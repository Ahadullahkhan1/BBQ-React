import React, { useRef } from 'react'
import { images } from '../assets'
import emailjs from '@emailjs/browser';
import './Contact.css'
import { CiLocationOn } from 'react-icons/ci';
import { MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md';
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_fofu3np', 'template_1k9mccr', form.current, {
        publicKey: 'jJTTMho2kQswhgd8C',
      })
      .then(
        () => {
          alert("Message sent successfully!")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div className="contact">
      <div className='contact-top'>
        <h1>Contact Us</h1>
        <img src={images['contactBanner']} alt="" />
        <h2>Outdoor Living Experts On-Standby</h2>
        <p>We're here to help provide an easy, enjoyable online shopping experience, so you can get back to the backyard. For any assistance, please call, chat, or message us and one of our outdoor living experts will be with you shortly.</p>
      </div>
      <div className="contact-bottom">
        <div className="contact-bottom-right">
          <h1>How We Can Help</h1>
          <li>Answer any product questions.</li>
          <li>Offer design expertise and services.</li>
          <li>Modify or cancel orders.</li>
          <li>Handle returns and exchanges.</li>
          <li>Provide the status of your order.</li>
          <h1>Get In Touch</h1>
          <p>Reach out and let’s fire up the grill magic!</p>
          <a href="https://www.google.com/maps?ll=30.224655,-95.556351&z=18&t=m&hl=en-US&gl=US&mapclient=embed&cid=3699009673286914460"><span><CiLocationOn /></span> 5814 FM 1488, Magnolia Texas 77354</a>
          <a href="tel:8325101966"><span><MdOutlineLocalPhone /></span> (832)5101966</a>
          <a href="mailto:sales@bbqgrillpeople.com"><span><MdOutlineMail /></span> sales@bbqgrillpeople.com</a>
        </div>
        <div className="contact-bottom-left">
          <h1><MdOutlineMail /> Message Us</h1>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Phone Number</label>
            <input type="text" name="user_phone" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" className='button' value="Send" />
          </form>

        </div>
      </div>

    </div>
  )
}

export default Contact