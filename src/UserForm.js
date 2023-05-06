import React, {useState, useEffect} from 'react'
import axios from "axios"
import "./App.css"
import { useDispatch} from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Select from 'react-select';
import DialogBox from './DialogBox'


const UserForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);

 

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        found: '',
        hope: '',
        referral: '',
      });


      useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/userForm")
        }else{
          navigate("/")
        }
      }, [])



    
      const handleInputChange = (event) => {
        console.log(event,"Eeeeeeeeeeeeeeeeeeeeeeeee")
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };


      const handleSelect = (event) => {
// console.log(event,"ddddddddddd")
        const {label,value} = event;
        setFormData({ ...formData,found:value});


      }
      // router.get("/getUser/:id", getUserCtrl);

      // https://commention-backend.onrender.com/user-details/getUser/6415789655586416d24b045e


    const handleSubmit = async (event) => {
        event.preventDefault();
        // https://cominks.app
        const res = await axios.post("https://commention-backend.onrender.com/user-details", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          occupation: formData.occupation,
          found: formData.found,
          hope: formData.hope,
          referral: formData.referral,
        });
        // alert(res.data.message)
        toast.success(res.data.message)
   
        // console.log(res,"eeeeeeeeeeeeeeeeeeeeeeeeeee")
        dispatch({ type: "SETUSERDETAILS", payload: res.data.data })
        if(res.status === 201){    
            localStorage.setItem("token",res.data.token);  
            navigate("/") 
          }else{
          console.error("invalid")
           }   
        // setDetailsForm(true)
        setFormData({
          firstName: '',
          lastName: '',
            email: '',
            occupation: '',
            found: '',
            hope: '',
            referral:'',
        })
        // setSpin(false);
        // setOutput(res.data.message);
         
      };


      const values = [
        { value: "twitter", label: "Twitter" },
        { value: "instagram", label: "Instagram" },
        { value: "facebook", label: "Facebook" },
        { value: "other", label: "Others" },
      ]


      
  // moves the menu below the select input
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      // height:"30px",
      // border: '1px solid red',
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 0 1px #544fb2' : null,
      width:'100%',
      '&:hover': {
        borderColor: '#544fb2'
      },
      input: {
        //  border:"2px solid red",
        height:"35px"
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(84, 79, 178, 0.9)' : 'white',
      color: state.isSelected ? 'white' : 'black',
      textAlign:'center',
      width:'100%',
      '&:hover': {
        backgroundColor: state.isSelected ? 'rgba(84, 79, 178, 1)' : '#cccbe0',
        color: state.isSelected ? 'white' : 'black'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '4px',
      marginTop: '2px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      width:'100%',


    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
      overflow: 'auto',
      "&::-webkit-scrollbar": { 
        width: "10px",
        height:"5px"
      },
      "&::-webkit-scrollbar-thumb": {
        background: '#cccbe0',
        borderRadius: "6px",
      },
    })
  };


  const handleAlert = () => {
    setShowDialog(true);
  };



    return <>
   <div className="formTitle">
      <h4 className='user_title'>Join Our Platform</h4>
      </div>
    <form className='userFormContainer' onSubmit={handleSubmit}>
 
            <label className='firstName' htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
            />

            <label className='lastName' htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="occupation">Occupation:</label>
            <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
            
            />

            <label htmlFor="found">How did you find us?</label>
                    <Select
                      className="findUs"
                      onChange={handleSelect}
                      options={values}
                      menuPortalTarget={document.body}
                      isSearchable
                      // value={dataa.emotion}
                      // defaultValue={dataa.emotion}
                      placeholder="Found us how??"
                      styles={customStyles}
                    />

<label htmlFor="referral">Referral Code:</label>
<input
                type="text"
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleInputChange}
            
            />


            <label htmlFor="hope">Why do you want to use our platform?</label>
            <div className="textareaDivision">
            <textarea
                id="hope"
                name="hope"
                value={formData.hope}
                onChange={handleInputChange}
                // rows="10"
            />
            </div>

            <div className='formSubmit'>
              <p className='cancel'>Cancel</p>
  <button className='formSubmitBtn' type="submit">Submit</button>
</div>

        </form>

    </>


}

export default UserForm;
