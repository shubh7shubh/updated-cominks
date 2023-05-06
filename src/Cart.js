import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from "axios"
import Popup from './Popup';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaGifts } from 'react-icons/fa';
import { FaFacebook, FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { AiOutlineCopy } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";


const Cart = () => {
    const navigate = useNavigate();
    const [price, setPrice] = useState(0)
    const [quote, setQuote] = useState('');
    const [subscriptionPurchased, setSubscriptionPurchased] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const [showReferral, setShowReferral] = useState(false);
    const [showShareButton, setShowShareButton] = useState(true);
    const [userId, setUserId] = useState("");




    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 500,
          label: '500',
        },
        {
          value: 1000,
          label: '1000',
        },
        {
          value: 1500,
          label: '1500',
        },
        {
          value: 2000,
          label: '2000',
        },
        {
          value: 2500,
          label: '2500',
        },
        {
          value: 3000,
          label: '3000',
        },
      ];

    //   dsfdlsln
      
    function valuetext(value) {

     setPrice(value)
        return `${value}`;
      }


      function getRandomQuote() {
        const quotes = [
            "The best way to predict your future is to create it. - Abraham Lincoln",
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Believe you can and you're halfway there. - Theodore Roosevelt",
            "Strive not to be a success, but rather to be of value. - Albert Einstein",
            "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
            "The mind is everything. What you think you become. - Buddha",
            "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
            "Life is 10% what happens to you and 90% how you react to it. - Charles R. Swindoll",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
            "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson",
            "The best time to plant a tree was 20 years ago. The second-best time is now. - Chinese Proverb",
            "You can't go back and change the beginning, but you can start where you are and change the ending. - C.S. Lewis",
            "You don't have to be great to start, but you have to start to be great. - Zig Ziglar",
            "Be the change you wish to see in the world. - Mahatma Gandhi",
            "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
            "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
            "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
            "It does not matter how slowly you go as long as you do not stop. - Confucius",
            "Everything you’ve ever wanted is on the other side of fear. - George Addair",
            "Success is walking from failure to failure with no loss of enthusiasm. - Winston S. Churchill"
          ];
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
      }

      useEffect(() => {
        const randomQuote = getRandomQuote();
        setQuote(randomQuote);
      }, [])


      useEffect(() => {
         
         try {
          const getUser = async () => {

            const res = await axios.get("https://commention-backend.onrender.com/getCurrentUser",{
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            console.log(res.data.id,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
            setUserId(res.data.id)
          
         }
         getUser()
         } catch (error) {
          console.log(error)
          
         }


      
      }, [])
      

      const handleSubscription = async (price) => {
        // setSubscriptionPurchased(true);

        const {
          data: { order },
        } = await axios.post("https://commention-backend.onrender.com/checkout", { credit: price},
        {headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
    });

        const options = {
          key: "rzp_test_tQ9DXqWHYCmN9g",
          amount: order.amount,
          currency: "INR",
          name: "Ioninks",
          description: "Test Transaction",
          image: "http://example.com/your_logo",
          order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          // callback_url: "https://cominks.app/paymentverification",
          prefill: {
            name: "User Name",
            email: "gaurav.kumar@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          redirect:false,
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };



                // window.location.href = "https://www.google.com"
        // window.open(url,'_blank')

      const closePopup = () => {
        setSubscriptionPurchased(false);
      }

    const referralLink = `${userId}`;

    // const referralLinkInput = document.getElementById('referralLinkInput');
    // referralLinkInput.value = referralLink;
    
    const extensionLink = "https://cominks.app/";

    const referralMessage = `Use your friend’s referral link to get 25 more credits. Then, your friend will get 50 more credits in return. The link of the extension is ${extensionLink} so Sign up for the Commention/Paraphraser today and both you and your friend will get a free credits. Your referral code is ${referralLink}`;
  

    function handleCopyClick() {
        navigator.clipboard.writeText(referralMessage);
        setCopySuccess('Copied!');
      }

      function handleReferralClose() {
        setShowReferral(false);
        setShowShareButton(true);
      }
    
      function handleShareClick() {
        setShowReferral(true);
        setShowShareButton(false);
      }


  return <>
  <div className="cart_container">
  <button className='goBack' onClick={() => navigate("/")}><IoMdArrowRoundBack/></button> 

{showShareButton && <button className='share-button' onClick={handleShareClick}>
  <FiShare2 className='shareIcon'/> Share now
</button>}
      {showReferral && (
        <div className="referral-div">
          <button className="close-button navigate" onClick={handleReferralClose}>
            x
          </button>
          <FaGifts style={{color:"#544fb2"}} className="referral_image" />
          <h2 className='referral_heading'>Refer your friends, get 50 credits!</h2>
          <div className="referralLink">
          {/* <p className='referral_link'><a target="_blank"  href={referralLink}>{referralLink}</a></p> */}
          {/* <input type="text" id="referralLinkInput" value="referralLink"></input> */}
          <p className='referral-name'>Your Referral code is</p>
          <div className="referral-code-container">
          <input className='code-input'  value={referralLink} />
          <AiOutlineCopy  onClick={handleCopyClick} className="icon code" />
          </div>
    
          </div>

          {/* <button  onClick={handleCopyClick}>Copy Message</button> */}
          {copySuccess && <span>{copySuccess}</span>}
          <div class="or-container">
  <div class="or-border"></div>
  <div class="or-text">or</div>
  <div class="or-border"></div>
</div>

<div className="social-media-container">

  <p className='shareVia'>Share via</p>

          <div class="social-media-icons">
  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" class="social-media-icon facebook">
    <FaFacebook/>
  </a>
  <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" class="social-media-icon whatsapp">
    <FaWhatsapp />
  </a>
  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="social-media-icon instagram">
    <FaInstagram />
  </a>
  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" class="social-media-icon linkedin">
    <FaLinkedin />
  </a>
  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" class="social-media-icon twitter">
    <FaTwitter />
  </a>
</div>
</div>



        </div>
      )}
    <div className="credit_slider">
        {/* <button className='navigate coupon'>Coupons</button> */}
        <p className='total_price' >₹{price + price*0.25}</p>
    <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Custom marks"
            defaultValue={200}
            getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
            max={3000}
            sx={{
              "& .MuiSlider-thumb": {
                color: "#726eb6;", 
              },
              "& .MuiSlider-track": {
                color: "#544fb2", 
              },
            }}
          />
        </Box>
    </div>
    <div className="random_quotes">
        <p >{quote}</p>
    </div>
    <div className="subscription_button">
        <button onClick={() => handleSubscription(price)} className='buyCreditBtn'>Buy Credits</button>
        {/* <Popup subscriptionPurchased={subscriptionPurchased} closePopup={closePopup} /> */}
    </div>
  </div>

  </>
}

export default Cart
