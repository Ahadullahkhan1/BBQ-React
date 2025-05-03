import logo from './images/logo.png';
import blaze from './images/blaze.avif';
import banner1 from './images/banner1.webp';
import banner2 from './images/banner2.avif';
import banner3 from './images/banner3.avif';
import section2image1 from './images/section2-image1.avif';
import section2image2 from './images/section2-image2.avif';
import section2image3 from './images/section2-image3.avif';
import section2image4 from './images/section2-image4.avif';
import section2image5 from './images/section2-image5.webp';
import section2image6 from './images/section2-image6.avif';
import brand1 from './images/brand1.jpg'
import brand2 from './images/brand2.jpg'
import brand3 from './images/brand3.jpg'
import brand4 from './images/brand4.jpg'
import brand5 from './images/brand5.jpg'
import services from './images/services.avif'
import services2 from './images/services2.avif'
import { IoIosChatboxes } from 'react-icons/io';
import { FaHandHoldingUsd, FaHome, FaThumbsUp } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { FaHelmetSafety } from 'react-icons/fa6';
import contactBanner from './images/contact-us-Banner.webp'
let images = {
    logo,
    blaze,
    banner1,
    banner2,
    banner3,
    section2image1,
    section2image2,
    section2image3,
    section2image4,
    section2image5,
    section2image6,
    brand1,
    brand2,
    brand3,
    brand4,
    brand5,
    services,
    services2,
    contactBanner
}
let getmore = [
    {
        icon: IoIosChatboxes,
        title: "Ask an Expert",
        para: "Shop with our experts and buy with confidence"
    },
    {
        icon: FaHome,
        title: "Free Design Services",
        para: "Envision your outdoor space through free expert renderings"
    },
    {
        icon: FaHandHoldingUsd,
        title: "Financing Available",
        para: "Pay over time with financing as low as 0% APR available"
    },
    {
        icon: FaThumbsUp,
        title: "Honest Expert Reviews",
        para: "Shop smarter with objective, in-depth product assessments"
    },
    {
        icon: MdLocalShipping,
        title: "Fast, Free Shipping",
        para: "Receive orders in no time - at no additional cost over $49"
    },
    {
        icon: FaHelmetSafety,
        title: "Pro Benefits & Services",
        para: "Pros enjoy exclusive savings, personalized assistance, & more"
    }
]


export { images, getmore }