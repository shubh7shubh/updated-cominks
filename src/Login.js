import React  from 'react'
import { FaLinkedin, FaTwitter } from 'react-icons/fa';




const Login = () => {


  



  return <>



    <div className="login_container">
      <div className="logo-container">
        <img style={{width:"60px",height:"60px"}} src="./aa.png" alt="" />
        <p className='logo-title'>COMINKS</p>
      </div>
      <div className="linkIn">
        <a target='_blank' href="https://www.linkedin.com/oauth/v2/authorization?respo
nse_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=77i0i6u2hd04ke&redirect_uri=https://www.linkedin.com/
">
          <button className="linkedin-button">
          <FaLinkedin className="button-icon-linkedIn" /> Sign in with LinkedIn
          </button>
        </a>
      </div>
      <div className="Twitter">
        <a target='_blank' href="https://twitter.com/login">
          <button className="twitter-button">

          <FaTwitter className="button-icon-twitter" /> Sign in with Twitter
          </button>
        </a>
      </div>


    </div>





  </>
}

export default Login;