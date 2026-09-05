import React, { useState, useEffect, useRef, useCallback } from 'react';
// THREE.js related imports and the ThreeJsCanvas component are removed as requested.

// --- DATA DEFINITIONS ---

// Product data derived from the uploaded PDFs
const ALL_PRODUCTS = [
  // SPIRITUAL
  { id: 1, name: 'LAKSHMI PAULE', price: 200, category: 'Spiritual', img: 'LP.png' },
  { id: 2, name: 'UDBATTI STAND', price: 50, category: 'Spiritual', img: 'UB.png' },
  { id: 3, name: 'TULSI VRINDAVAN', price: 200, category: 'Spiritual', img: 'TW.png' },
  { id: 4, name: 'MANGALAM SET', price: 125, category: 'Spiritual', img: 'MG.png' },
  { id: 5, name: 'HAVAN KUND', price: 50, category: 'Spiritual', img: 'HK.png' },
  { id: 6, name: 'PADMA KUND', price: 75, category: 'Spiritual', img: 'PK.png' },
  { id: 7, name: 'SHRI YANTRA', price: 150, category: 'Spiritual', img: 'SY.png' },
  // NEW SPIRITUAL ITEMS (from Wall Hanging/Keychains)
  
  // CORPORATE
  { id: 15, name: 'PEN STAND', price: 200, category: 'Corporate', img: 'PH.png' },
  { id: 16, name: 'CARD HOLDER', price: 100, category: 'Corporate', img: 'CH.png' },
  { id: 17, name: 'MOBILE STAND', price: 175, category: 'Corporate', img: 'MS.png' },
  { id: 18, name: 'TEA COASTER', price: 175, category: 'Corporate', img: 'TC.png' },

  // HEALTH CARE
  { id: 19, name: 'DANTAMANJAN (RED) 50g', price: 150, category: 'Health Care', img: 'DANT.jpeg' },
  { id: 20, name: 'HRIDAYAMRUT 60gm', price: 90, category: 'Health Care', img: 'HRI.jpeg' },
  { id: 21, name: 'PIDANTAK OIL (8 ml)', price: 125, category: 'Health Care', img: 'OIL.jpeg' },
  { id: 23, name: 'SHUBHA AROGYAM', price: 210, category: 'Health Care', img: 'SARO.jpeg' },
  { id: 24, name: 'GOMUTRA UBATAN', price: 70, category: 'Health Care', img: 'GOM.jpeg' },
  { id: 25, name: 'GOMUTRA ARK (1 Litre)', price: 250, category: 'Health Care', img: 'ARK.jpeg' },

  // PUJA SAMAGRI
  { id: 26, name: 'GOMAY DHOOP (4 in 1)', price: 225, category: 'Puja Samagri', img: 'page_3_img_1.jpeg' },
  { id: 27, name: 'CUP DHOOP', price: 110, category: 'Puja Samagri', img: 'page_3_img_16.jpeg' },
  { id: 28, name: 'GHEE DIYA (50pc)', price: 175, category: 'Puja Samagri', img: 'page_3_img_2.jpeg' },
  { id: 29, name: 'BHIMSENI CAMPHOR', price: 80, category: 'Puja Samagri', img: 'page_3_img_3.jpeg' },
  { id: 30, name: 'SHUBHA (BIG) COW DUNG CAKE', price: 80, category: 'Puja Samagri', img: 'page_3_img_4.jpeg' },
  { id: 31, name: 'SHUBHA (SMALL) COW DUNG CAKE', price: 50, category: 'Puja Samagri', img: 'page_3_img_5.jpeg' },
  { id: 71, name: 'GOMUTRA (500ml)', price: 50, category: 'Puja Samagri', img: 'page_3_img_17.jpeg' },
  { id: 72, name: 'SANSKARIT BHASM (20gm)', price: 50, category: 'Puja Samagri', img: 'page_3_img_7.jpeg' },


  // HOUSEHOLD
    { id: 33, name: 'GONYLE LEMON (FLOOR CLEANER) 1 Litre', price: 90, category: 'Household', img: 'page_4_img_11.jpeg' },
  { id: 34, name: 'GONYLE ROSE (FLOOR CLEANER) 1 Litre', price: 90, category: 'Household', img: 'page_4_img_9.jpeg' },
  { id: 35, name: 'BARTAN POWDER 125gm', price: 75, category: 'Household', img: 'page_4_img_10.jpeg' },

  // AGRICULTURE/GARDENING
  { id: 36, name: 'VERMI COMPOST (1Kg)', price: 75, category: 'Agriculture/Gardening', img: 'page_4_img_7.jpeg' },
  { id: 37, name: 'ORGANIC COMPOST', price: 45, category: 'Agriculture/Gardening', img: 'page_4_img_6.jpeg' },
  { id: 38, name: 'VERMI WASH (1 Litre)', price: 125, category: 'Agriculture/Gardening', img: 'page_4_img_8.jpeg' },

  // FESTIVAL SPECIAL
  { id: 39, name: 'HOLI COLORS (ECO-FRIENDLY)', price: 90, category: 'Festival Special', img: 'page_4_img_1.jpeg' },
  { id: 40, name: 'GOMAY RAKHI', price: 25, category: 'Festival Special', img: 'page_4_img_2.jpeg' },
  { id: 41, name: 'GANESHJI (5 inch)', price: 200, category: 'Festival Special', img: 'page_4_img_3.jpeg' },
  { id: 42, name: 'GOMAY PANTI (DIYA)', price: 20, category: 'Festival Special', img: 'page_4_img_5.jpeg' },

  // HOME DECOR (Includes Magnets/Hangings)
  { id: 43, name: 'BALAJI MAGNET', price: 75, category: 'Home Decor', img: 'BALAJIKEY.png' },
  { id: 44, name: 'ADISHAKTI (BIG) MAGNET', price: 175, category: 'Home Decor', img: 'ADI.png' },
  { id: 45, name: 'ADISHAKTI (SMALL) MAGNET', price: 125, category: 'Home Decor', img: 'ADIs.jpeg' },
  { id: 46, name: 'CHILDREN\'S SPECIAL MAGNET', price: 150, category: 'Home Decor', img: 'CHI.jpeg' },
  { id: 47, name: 'TIRANGA MAGNET', price: 175, category: 'Home Decor', img: 'TRI.jpeg' },
  { id: 48, name: 'VITHU MAULI (BIG) MAGNET', price: 175, category: 'Home Decor', img: 'VM.jpeg' },
  { id: 49, name: 'VITHU MAULI (SMALL) MAGNET', price: 125, category: 'Home Decor', img: 'VMs.jpeg' },
  { id: 50, name: 'EVIL EYE WALL HANGING', price: 175, category: 'Home Decor', img: 'EEW.jpeg' },
  { id: 51, name: 'KEYCHAINS', price: 75, category: 'Home Decor', img: 'KEY.jpeg' },
  { id: 52, name: 'OM WALL HANGING', price: 175, category: 'Home Decor', img: 'OM.jpeg' },
  { id: 53, name: 'SHREE WALL HANGING', price: 175, category: 'Home Decor', img: 'SHREE.jpeg' },
  { id: 54, name: 'SWASTIK WALL HANGING', price: 175, category: 'Home Decor', img: 'SWASTIK.jpeg' },
  { id: 55, name: 'SHUBH-LABH WALL HANGING', price: 175, category: 'Home Decor', img: 'SL.jpeg' },
  { id: 56, name: 'RAM WALL HANGING', price: 125, category: 'Home Decor', img: 'RAM.jpeg' },
  { id: 57, name: 'JAI SHRIRAM WALL HANGING', price: 175, category: 'Home Decor', img: 'SHRIRAM.jpeg' },

];

const CATEGORIES = ['All', ...new Set(ALL_PRODUCTS.map(p => p.category))];

// --- IMAGE SLIDER HERO COMPONENT ---

const SLIDER_IMAGES = [
   'hea1.jpeg', 'hea2.jpeg', 'hea3.jpeg', 'hea4.jpeg'
];

const ImageSliderHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const targetRatio = (800 / 1920) * 100; // Aspect ratio for 1920x800

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDER_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="relative pt-16 w-full max-w-full overflow-hidden" 
    >
      {/* Container to enforce 1920x800 aspect ratio responsively */}
      <div 
        className="relative w-full" 
        style={{ paddingBottom: `${targetRatio}%` }} 
      >
        {SLIDER_IMAGES.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Organic Product Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            // Fallback placeholder
            onError={(e) => { e.target.onerror = null; e.target.src = 'placeholder/1920x800/FF5722/FFFFFF?text=Image+Missing'; }}
          />
        ))}
      </div>
    </section>
  );
};


// --- APP COMPONENTS ---

// Social Media Links Component
const SocialMediaLinks = ({ iconColorClass = "text-white", bgColorClass = "bg-gray-700" }) => (
    <div className="flex justify-center space-x-6 mt-6">
        <a 
            href="https://www.facebook.com/share/19uw6zRjkM/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit us on Facebook"
            className={`p-3 rounded-full flex items-center justify-center transition duration-200 transform hover:scale-110 ${bgColorClass} hover:bg-lime-600`}
        >
            <svg fill="currentColor" viewBox="0 0 24 24" className={`w-8 h-8 ${iconColorClass}`}><path d="M12.001 2.002c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.477-10-10-10zm2.083 4.288h-1.077c-.89 0-1.066.425-1.066 1.05v1.4h2.148l-.3 2.144h-1.848v5.52h-2.285v-5.52h-1.848v-2.144h1.848v-1.76c0-2.02.836-3.266 3.193-3.266h2.152v2.246z"/></svg>
        </a>
        <a 
            href="https://www.instagram.com/giridhan_go?igsh=Mzk4a2xobW4zMXN4" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit us on Instagram"
            className={`p-3 rounded-full flex items-center justify-center transition duration-200 transform hover:scale-110 ${bgColorClass} hover:bg-lime-600`}
        >
            <svg fill="currentColor" viewBox="0 0 24 24" className={`w-8 h-8 ${iconColorClass}`}><path d="M12 2.163c3.204 0 3.584.013 4.85.071 1.17.055 1.805.249 2.227.464.551.272.981.678 1.34 1.092.359.413.668.971.84 1.621.168.649.208 1.363.224 4.19.014 2.723-.002 3.093-.072 4.123-.058 1.085-.224 1.866-.465 2.502-.236.609-.59.997-1.002 1.411-.412.414-.852.76-1.464.996-.632.235-1.393.385-2.618.441-1.036.046-1.405.061-4.049.071-2.624-.009-2.992-.023-4.048-.071-1.226-.056-1.987-.206-2.618-.441-.612-.236-1.052-.582-1.464-.996-.412-.414-.766-.802-1.002-1.411-.236-.636-.391-1.417-.465-2.502-.07-1.03-.086-1.399-.072-4.123.016-2.827.056-3.541.224-4.191.172-.65.481-1.209.84-1.621.359-.414.789-.82 1.34-1.092.422-.215 1.058-.409 2.227-.464 1.266-.058 1.646-.071 4.85-.071zm0 2.885c-3.197 0-3.57.012-4.836.071-1.052.053-1.61.22-1.996.402-.423.2-.743.468-1.012.737-.269.269-.537.59-.737 1.012-.182.386-.349.944-.402 1.996-.059 1.266-.071 1.638-.071 4.836 0 3.197.012 3.57.071 4.836.053 1.052.22 1.61.402 1.996.2.423.468.743.737 1.012.269.269.59.537 1.012.737.386.182.944.349 1.996.402 1.266.059 1.638.071 4.836.071 3.197 0 3.57-.012 4.836-.071 1.052-.053 1.61-.22 1.996-.402.423-.2.743-.468 1.012-.737.269-.269.537-.59.737-1.012.182-.386.349-.944.402-1.996.059-1.266.071-1.638.071-4.836 0-3.197-.012-3.57-.071-4.836-.053-1.052-.22-1.61-.402-1.996-.2-.423-.468-.743-.737-1.012-.269-.269-.59-.537-1.012-.737-.386-.182-.944-.349-1.996-.402-1.266-.058-1.638-.07-4.836-.07zm-2.88 1.954c1.83 0 3.315 1.485 3.315 3.315s-1.485 3.315-3.315 3.315-3.315-1.485-3.315-3.315 1.485-3.315 3.315-3.315zm0 2.215c-0 0-0 0-0 0-0 0-0 0-0 0-1.166 0-2.115.949-2.115 2.115s.949 2.115 2.115 2.115c1.166 0 2.115-.949 2.115-2.115s-.949-2.115-2.115-2.115zm5.727-2.909c0-.44-.36-.8-.8-.8s-.8.36-.8.8.36.8.8.8.8-.36.8-.8z"/></svg>
        </a>
    </div>
);


// Navbar Component
const Navbar = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false); // Close menu after selection
  };
  
  const handleOpenModal = () => {
    openModal();
    setIsMenuOpen(false); // Close menu
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="Giridhan Organics Logo" 
            className="h-9 w-auto" 
            onError={(e) => { e.target.onerror = null; e.target.src = 'placeholder/32x32/1B5E20/FFFFFF?text=G'; }}
          />
          <div className="text-xl font-extrabold text-green-800">
            Giridhan <span className="text-lime-600">Organics</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
            <a
              key={item}
              onClick={() => scrollToSection(item.replace(/\s+/g, '').toLowerCase())}
              className="text-gray-700 hover:text-green-700 font-medium cursor-pointer transition duration-150"
            >
              {item}
            </a>
          ))}
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 text-sm font-semibold text-white bg-lime-600 rounded-full shadow-lg hover:bg-lime-700 transition duration-200 transform hover:scale-105"
          >
            Enquire Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-700 focus:outline-none"
            >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>
      </div>

    {/* Mobile Menu Content (Transitioning Overlay) */}
    <div className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col space-y-2 px-4 pt-2 pb-4">
          {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
            <a
              key={item}
              onClick={() => scrollToSection(item.replace(/\s+/g, '').toLowerCase())}
              className="py-2 text-gray-700 hover:text-green-700 font-medium cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              {item}
            </a>
          ))}
          <button
            onClick={handleOpenModal}
            className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-lime-600 rounded-full shadow-lg hover:bg-lime-700 transition duration-200"
          >
            Enquire Now
          </button>
        </div>
    </div>
    </nav>
  );
};


// Inquiry Modal Component (Completed)
const InquiryModal = ({ isVisible, onClose, initialProduct = 'General Inquiry' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    alternatePhone: '',
    product: initialProduct,
    quantity: 1, // Quantity field
  });

  // Update initial product when modal is opened from a specific product card
  useEffect(() => {
    setFormData(prev => ({ ...prev, product: initialProduct }));
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure quantity is a number
    const finalValue = name === 'quantity' ? parseInt(value) || '' : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSendMail = () => {
    const body = `
      Name: ${formData.name}
      Phone: ${formData.phone}
      Address: ${formData.address}
      Alternate Phone: ${formData.alternatePhone}
      Product of Interest: ${formData.product}
      Quantity: ${formData.quantity}
    `;
    const mailtoLink = `mailto:giridhanorganics@gmail.com?subject=Product Inquiry for ${formData.product} (Qty: ${formData.quantity})&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    onClose();
  };

  const handleWhatsApp = () => {
    const message = `Hello Giridhan Organics, I am inquiring about ${formData.product}. I am interested in ${formData.quantity} unit(s). My name is ${formData.name}.`;
    const whatsappLink = `https://wa.me/917559228525?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-70 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-green-800 border-b pb-2">Product Inquiry</h2>
        <p className="text-sm text-gray-600 mb-6">Please fill out the form to help us serve you better.</p>

        <div className="space-y-4">
          {/* Product Selection Dropdown */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product of Interest</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500 transition duration-150"
            >
              <option value="General Inquiry">General Inquiry</option>
              {[...new Set(ALL_PRODUCTS.map(p => p.name))].map(productName => (
                <option key={productName} value={productName}>{productName}</option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (e.g., 1 or 10)"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Primary Phone (with code)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="tel"
              name="alternatePhone"
              placeholder="Alternate Phone"
              value={formData.alternatePhone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <textarea
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="mt-8 flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSendMail}
            className="flex-1 py-3 text-white bg-green-700 rounded-lg shadow-md hover:bg-green-800 transition duration-200 font-semibold"
          >
            Send Mail
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 py-3 text-white bg-lime-600 rounded-lg shadow-md hover:bg-lime-700 transition duration-200 font-semibold flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2c-5.522 0-10 4.478-10 10s4.478 10 10 10 10-4.478 10-10-4.478-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4.722-5.717c-.126-.063-.772-.38-1.5-.733-.5-.246-1.53-.755-1.782-.84-.251-.084-.43-.125-.61.125-.178.25-.69.84-.85.998-.16.16-.32.18-.59.062-.772-.468-1.68-1.04-2.37-1.745-.584-.6-1.01-1.28-1.258-1.706-.248-.426-.026-.645.188-.853.17-.17.388-.41.58-.614.192-.204.25-.37.335-.563.085-.192.043-.36-.021-.504-.063-.144-.555-1.335-.765-1.828-.209-.493-.42-.426-.61-.43-.188-.004-.41-.004-.63-.004-.22 0-.58.084-.89.41-.308.326-1.17 1.137-1.17 2.76s1.2 3.19 1.36 3.41c.158.217 2.36 3.637 5.7 5.06 3.25.7 3.86.58 4.67.54.81-.04 1.58-.64 1.8-.997.22-.357.22-.66.155-.776-.064-.117-.251-.18-.52-.32z"/></svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState('General Inquiry');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const openModal = (productName = 'General Inquiry') => {
    setInquiryProduct(productName);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setInquiryProduct('General Inquiry'); // Reset on close
  };

  const filteredProducts = selectedCategory === 'All'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === selectedCategory);

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {});
  

  // Floating WhatsApp Button Component
  const FloatingWhatsAppButton = () => {
    const whatsappUrl = "https://wa.me/917559228525";
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2c-5.522 0-10 4.478-10 10s4.478 10 10 10 10-4.478 10-10-4.478-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4.722-5.717c-.126-.063-.772-.38-1.5-.733-.5-.246-1.53-.755-1.782-.84-.251-.084-.43-.125-.61.125-.178.25-.69.84-.85.998-.16.16-.32.18-.59.062-.772-.468-1.68-1.04-2.37-1.745-.584-.6-1.01-1.28-1.258-1.706-.248-.426-.026-.645.188-.853.17-.17.388-.41.58-.614.192-.204.25-.37.335-.563.085-.192.043-.36-.021-.504-.063-.144-.555-1.335-.765-1.828-.209-.493-.42-.426-.61-.43-.188-.004-.41-.004-.63-.004-.22 0-.58.084-.89.41-.308.326-1.17 1.137-1.17 2.76s1.2 3.19 1.36 3.41c.158.217 2.36 3.637 5.7 5.06 3.25.7 3.86.58 4.67.54.81-.04 1.58-.64 1.8-.997.22-.357.22-.66.155-.776-.064-.117-.251-.18-.52-.32z" />
        </svg>
      </a>
    );
  };

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Aspect Ratio Box (1:1 Square) - Fixes mobile image fitting */}
        <div className="relative pt-[100%]">
          <img
            src={product.img}
            alt={product.name}
            // Use absolute positioning to fill the padding-defined container
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'placeholder/200x200/8BC34A/FFFFFF?text=Product'; }}
          />
        </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-green-700 font-semibold mb-3">₹ {product.price}</p>
        <button
          onClick={() => openModal(product.name)}
          className="w-full py-2 text-sm font-semibold text-white bg-lime-600 rounded-lg hover:bg-lime-700 transition duration-200"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Navbar openModal={openModal} /> {/* PASS openModal to Navbar */}

      {/* Inquiry Modal - Always rendered but conditionally visible */}
      <InquiryModal
        isVisible={isModalVisible}
        onClose={closeModal}
        initialProduct={inquiryProduct}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />

      <main>
        {/* 1. Home Section (Hero) */}
        <ImageSliderHero />

        {/* --- */}

        {/* 2. Products Section */}
        <section id="products" className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-center text-green-900 mb-12">
              Our Cow-Based Offerings
            </h2>

            {/* FIX: Wrap adjacent elements in a Fragment */}
            <> 
                {/* Category Filter Bar */}
                <div className="flex flex-wrap justify-center gap-2 mb-10 p-3 bg-gray-100 rounded-xl shadow-inner">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition duration-150 ${
                        selectedCategory === category
                          ? 'bg-green-700 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-green-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Grouped Product Display */}
                <div className="space-y-12">
                  {Object.keys(groupedProducts).map(category => (
                    <div key={category}>
                      <h3 className="text-2xl font-bold text-green-800 border-b-2 border-lime-500 pb-2 mb-6">
                        {category} Products
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {groupedProducts[category].map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-500 text-lg py-10">No products found in this category.</p>
                  )}
                </div>
            </>

          </div>
        </section>

        {/* --- */}

        {/* 3. About Us Section */}
        <section id="aboutus" className="py-16 sm:py-24 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-center text-green-900 mb-12">
              Our Vision and Mission
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="bg-white p-8 rounded-xl shadow-xl space-y-6">
                <h3 className="text-2xl font-bold text-lime-600">Goshala Service & Dedication</h3>
                <p className="text-gray-700">
                  Since 2021, we have been engaged in **Goseva** (service of cows) and currently care for around 75+ indigenous cows. We are striving to successfully run a goshala based on cow dung and cow urine. By conducting new experiments, we create cow dung-based products with the aim of bringing Goseva into every home.
                </p>
                <p className="text-gray-700">
                  The preservation and nurturing of indigenous cattle is the need of the hour, and we are committed to this cause. Our farming is now completely based on cow dung and cow urine, which has significantly enhanced the quality of our grains.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-xl space-y-6">
                <h3 className="text-2xl font-bold text-green-700">Vision & Mission</h3>
                <blockquote className="text-lg italic text-gray-800 border-l-4 border-lime-600 pl-4">
                  "To build a compassionate and eco-conscious world where spiritual values and sustainable practices go hand in hand, and to inspire society towards cow-based sustainable living, ensuring harmony between tradition, environment, and future generations."
                </blockquote>
                <p className="text-base font-medium text-gray-600 mt-4">
                  "Cows are nature's partners—turning grass into nourishment, enriching soil, and sustaining a greener, cleaner world."
                </p>
                <button
                  onClick={() => openModal()}
                  className="mt-4 px-6 py-3 text-sm font-bold text-white bg-green-700 rounded-lg shadow-md hover:bg-green-800 transition duration-200"
                >
                  Support Our Mission
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* 4. Contact Section */}
        <section id="contact" className="py-16 sm:py-24 bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-lime-400">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-gray-700 p-8 rounded-xl shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-lime-300">Location</h3>
                <p>Dhawda, Bhokardan Dist. Jalna (Maharashtra), INDIA</p>
              </div>
              <div className="bg-gray-700 p-8 rounded-xl shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-lime-300">Call Us</h3>
                <p className="text-2xl font-bold text-white">+91 755 922 8525</p>
              </div>
              <div id="inquirenow" className="bg-gray-700 p-8 rounded-xl shadow-2xl">
                <h3 className="text-xl font-semibold mb-3 text-lime-300">Email Us</h3>
                <p>giridhanorganics@gmail.com</p>
                <button
                  // FIX: Correctly call openModal
                  onClick={() => openModal()}
                  className="mt-4 px-6 py-2 text-sm font-bold text-green-900 bg-lime-400 rounded-full hover:bg-lime-300 transition duration-200"
                >
                  Open Inquiry Form
                </button>
              </div>
            </div>
            
            {/* Social Media Links in Contact Section */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-center text-lime-400 mb-6">Connect With Us</h3>
                {/* Custom styling for prominent icons in the dark contact section */}
                <SocialMediaLinks iconColorClass="text-white" bgColorClass="bg-gray-700 hover:bg-lime-600" />
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            {/* REMOVED: SocialMediaLinks component call removed here as requested */}
          &copy; {new Date().getFullYear()} Giridhan Organics. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;