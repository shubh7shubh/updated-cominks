import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineLoading } from 'react-icons/ai';
import { MdContentPasteGo } from 'react-icons/md';
import aa from "./aa.png";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserForm from "./UserForm";
import { toast } from 'react-toastify';
import Select from 'react-select';
import { switchOff, turnOff } from "./config";
import {Select as Demo, Chip} from "@material-ui/core";
import Avatar from '@mui/material/Avatar';






const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  // const [detailsForm, setDetailsForm] = useState(false);
  const [spin, setSpin] = useState(false);
  const [dataa, setDataa] = useState({
    message: "",
    emotion: "funny",
    length: 20
  });

  const { activeUser } = useSelector((state) => state.User_Register);



  const [showContent, setShowContent] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [output, setOutput] = useState([]);
  const [buttonClassName, setButtonClassName] = useState('open-btn');
  const [count, setCount] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef(null);

  const options = [
    // { value: "select", label: "Emotion" },
    { value: "funny", label: "Funny" },
    { value: "disagree", label: "Disagree" },
    { value: "friendly", label: "Friendly" },
    { value: "congratulation", label: "Congratulation" },
    { value: "appriciating", label: "Appriciating" },
    { value: "serious", label: "Serious" },
    { value: "lovely", label: "Lovely" },
    { value: "shocking", label: "Shocking" },
  ]
{/* <option value="30">30</option> */}
  const lengths = [
    {value:"Length", label:"Length"},
    {value:"10", label:"10"},
    {value:"20", label:"20"},
    {value:"30", label:"30"},
  ]



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/userForm")
    } else {
      navigate("/")
    }
  }, [])








  const logoutUser = () => {
    localStorage.clear();
    navigate("/login")
  }



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { message } = dataa


  const triggerParaphrasing = async () => {
    // console.log(message, "messagesssssssssssss")
    setSpin(true);
    const res = await axios.post("https://commention-backend.onrender.com/paraphrasing", {
      message: message,
      userId: activeUser._id
    },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    console.log(res, "response");
    const payload = {
      userId: activeUser._id,
      message: res.data.message
    }
    dispatch({ type: "SETPARAPHRASE", payload })
    setSpin(false);
    setAnswer(res.data.message.trim(":\n\nI"));
  };




  const paraphraseSubmit = () => {
    if (!dataa.message.trim()) {
      toast.warning("Please write something", {});
      return;
    }
    setAnswer([])
    setSpin(true)
    triggerParaphrasing();
  };


  // const copyToClipboard = async (text) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     console.log('Text copied to clipboard');
  //   } catch (err) {
  //     console.error('Error copying text: ', err);
  //   }
  // };




  const copyToClipboard = (text) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    console.log('Text copied to clipboard');
  };
  
  const handleCopyToClipboard = () => {
    toast('Text copied!');
    console.log(answer,"aaaaaaaaaaaaaaaaaaaaaaa")
    copyToClipboard(answer);
  };
  


  // const copyToClipboard = async (text) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     console.log('Text copied to clipboard');
  //   } catch (err) {
  //     console.error('Error copying text: ', err);
  //   }
  // };

  // const handleCopyToClipboard = async () => {
  //   console.log(answer,"aaaaaaaaaaaaaaaaaaaaaaa")
  //   copyToClipboard(answer);
  // };

  const copyTo = () => {
    toast('Text copied!');
    // navigator.clipboard.writeText(output);
    console.log(output,"oooooooooooooooooooo")
    copyToClipboard(output);
  };

  const deleteParagraph = () => {
    setDataa({
      message: "",
      emotion: "",
      length: ""
    })
  }





  const triggerCommention = async () => {
    try {

      console.log(localStorage.getItem("token"))
      setSpin(true);

      const res = await axios.post("https://commention-backend.onrender.com/comment", {
        data: dataa.message,
        drop: dataa.emotion,
        length: dataa.length,
      },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res, "responseeeeeeeeeeeeee");
      setSpin(false);
      setOutput(res.data.message.trim(":\n\nI"));

    } catch (error) {
      console.log(error)
    }
  };


  const commentionSubmit = () => {
    if (!dataa.message.trim()) {
      toast.warning("Please write something", { autoClose: 1000 });
      return;
    }
    triggerCommention();
    setIsEditable(false);
  };

  const handleLogout = () => {
    // localStorage.clear();
    navigate("/login")

  }

  console.log(dataa,"dddddddddddd")



  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://commention-backend.onrender.com/countUsed', {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCount(response.data.count)
      console.log(response.data.count, "responseh")
    }
    fetchData();
  }, [triggerParaphrasing, triggerCommention]);

  useEffect(() => {
    if (count === 0) {
      toast.warning("Sorry, you have used up all your credit. To keep using our service, you need to buy a subscription.", { autoClose: 5000 });
    }
  }, [count]);

  const getEditable = () => {
    setIsEditable(true);

  }


  // moves the menu below the select input
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 0 1px #544fb2' : null,
      '&:hover': {
        borderColor: '#544fb2'
      },
      input: {
        //  border:"2px solid red",
        height:"35px",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(84, 79, 178, 0.9)' : 'white',
      color: state.isSelected ? 'white' : 'black',
      textAlign:'center',
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
      width:'150px',

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
  

  useEffect(() => {
    function handleCopy() {
      const selectedText = window.getSelection().toString();
      if (selectedText.length > 0) {
        navigator.clipboard.writeText(selectedText)
        .then(() => {
          toast('Text copied!');
        })
        .catch(() => {
          console.log('Failed to copy text');
        });
      }
    }
    
    document.addEventListener('mouseup', handleCopy);
    
    return () => {
      document.removeEventListener('mouseup', handleCopy);
    };
  }, []);
    
  function handleInputClick() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(text => {
        inputRef.current.value = text;
        setDataa((prev) => ({ ...prev, message: text }))
      });
    } else {
      inputRef.current.value = '';
      inputRef.current.focus();
      document.execCommand('paste');  
    }
  }
  


const regenerateParaphased = async () => {
  setSpin(true);
  // console.log(answer,"aaaaaaaaaaaaaaaaaaaa")
  const res = await axios.post("https://commention-backend.onrender.com/regeneratePara", {
    message: message,
  },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // console.log(res.data.message, "rrrrrrrrrrrrr");
    setSpin(false);
    setAnswer(res.data.message.trim(":\n\nI"));
}


const regenerateCommention = async () => {
  setSpin(true);
  // console.log(output,"aaaaaaaaaaaaaaaaaaaa")
  const res = await axios.post("https://commention-backend.onrender.com/regenerateComment", {
        data: dataa.message,
        drop: dataa.emotion,
        length: dataa.length,
  },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // console.log(res.data.message, "rrrrrrrrrrrrr");
    setSpin(false);
    setOutput(res.data.message.trim(":\n\nI"));
}



 



  return (
    <>
      <div className="sidebar-container">
        {/* <p style={{width:"400px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. ipsum dolor sit amet consectetur adipisicing elit. Ipsum eveniet labore beatae, deleniti doloremque sapiente vero voluptatum officiis quisquam atque enim repudiandae debitis, voluptas iusto tenetur libero obcaecati explicabo repellat deserunt dolores. Tenetur, sequi quod voluptates debitis, est veniam repudiandae adipisci labore nostrum aliquid, provident d Ipsum eveniet labore beatae, deleniti doloremque sapiente vero voluptatum officiis quisquam atque enim repudiandae debitis, voluptas iusto tenetur libero obcaecati explicabo repellat deserunt dolores. Tenetur, sequi quod voluptates debitis, est veniam repudiandae adipisci labore nostrum aliquid, provident dolorum reprehenderit maxime nulla. Neque velit, quia aut sed provident dolor eos, laborum tempore fuga facilis eum. Delectus itaque numquam perferendis minima porro libero nemo!</p> */}
        <button className={buttonClassName} onClick={toggleSidebar}>
          Open Sidebar
        </button>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={toggleSidebar}>
            X
          </button>
          <div className="sidebar-header">
            <img
              src={aa}
              alt="icon"
              className="sidebar-header-icon"
              style={{ color: "#0A66C2" }}
              width={40}
              height={40}
            />
            <span className="sidebar-header-title">COMINKS</span>
          </div>

          <div className="buttons-container">

            <button
              className={`commention-button ${!showContent ? "active" : ""}`}
              onClick={() => setShowContent(false)}
            >
              Cominks
            </button>
            <button
              className={`paraphrasing-button ${showContent ? "active" : ""}`}
              onClick={() => setShowContent(true)}
            >
              Paraphrasing
            </button>
          </div>
          {/* <button onClick={handleLogout} className="navigate logout">Logout</button> */}

          {/* <p>{count}</p> */}


          <div className="sidebar-content">

            <div className="credit-count">
              <span className="count"> Count - {count}</span>
              <button onClick={() => navigate('/userData')} className="chart-info">Info</button>
              <Chip avatar={<Avatar>₹</Avatar>}
               label="Buy Credits" 
               onClick={() => navigate("/cart") }
              />
            </div>
            <img onClick={handleLogout} className="switchOff" src={switchOff} alt="" />

            {showContent ? (
              <>
                <h2 className="sidebar-content-title">Write Your Paragraph</h2>
                <div className="sidebar-textarea-div">
                  <textarea
                    ref={inputRef}
                    // onClick={handleInputClick}
                    onChange={(e) =>
                      setDataa((prev) => ({ ...prev, message: e.target.value }))
                    }
                    value={dataa.message}
                    rows={5}
                    className="sidebar-textarea"
                    placeholder="Enter your message"

                  ></textarea>
                  <div className="sidebar-icons">
                  <span className="copy-icon">
                  <MdContentPasteGo onClick={handleInputClick}  />
                    </span>
                    {/* <span className="edit-icon">
                      <MdOutlineModeEditOutline onClick={getEditable} />
                    </span> */}
                    <span onClick={deleteParagraph} className="delete-icon">
                      <HiOutlineTrash />
                    </span>
                  </div>
                </div>

                <button onClick={paraphraseSubmit} className="sidebar-button">
                  Submit
                </button>

                <div className="output_box">
                  <div className="outputTitleContainer">
                  <h2 className="paraphrased-title">Paraphrased Paragraph</h2>
                  <button onClick={regenerateParaphased} className="regenerate">Regenerate</button>

                  </div>
                  
                  <div className="answer-container">
                    {spin ? <>
                      <div className="loading-spinner">
                        <AiOutlineLoading />
                      </div>
                    </> : <>

                      <textarea
                        readOnly={!isEditable} value={answer} className="answer" onChange={(e) => setAnswer(e.target.value)} />
                      <div className="output-box-icons">
                        <MdOutlineModeEditOutline onClick={getEditable} className="icon" />
                        <AiOutlineCopy onClick={handleCopyToClipboard} className="icon" />
                      </div>
                    </>}
                  </div>

                </div>
              </>
            ) : (
              <>
                <h2 className="sidebar-content-title">Drop Message</h2>
                <div className="sidebar-textarea-div">
                  <textarea
                  ref={inputRef}
                  // onClick={handleInputClick}
                    onChange={(e) =>
                      setDataa((prev) => ({ ...prev, message: e.target.value }))
                    }
                    value={dataa.message}
                    rows={5}
                    className="sidebar-textarea"
                    placeholder="Enter your message"
                  ></textarea>
                  <div className="sidebar-icons">
                  <span className="copy-icon">
                  <MdContentPasteGo onClick={handleInputClick}  />
                    </span>
                    {/* <span className="edit-icon">
                      <MdOutlineModeEditOutline onClick={getEditable} />
                    </span> */}
                    <span onClick={deleteParagraph} className="delete-icon">
                      <HiOutlineTrash />
                    </span>
                  </div>
                </div>

                  <div className="dropdown-box">

                    <div className="emotion-dropdown">
                    <Select
                      className="select"
                      onChange={(options) =>
                        setDataa((datas) => ({
                          ...datas,
                          emotion: options.value
                        }))
                      }
                      options={options}
                      menuPortalTarget={document.body}
                      isSearchable
                      // value={dataa.emotion}
                      // defaultValue={dataa.emotion}
                      placeholder="Funny"
                      styles={customStyles}
                    />

                    </div>

                    <div className="chip-container">
  <Chip
    label="10"
    onClick={() => setDataa((prev) => ({...prev,length:10}))}
    color={dataa.length === 10 ? 'primary' : 'default'}
    className={dataa.length === 10 ? 'selected-chip' : 'unselected-chip'}
  />
  <Chip
    label="20"
    onClick={() => setDataa((prev) => ({...prev,length:20}))}
    color={dataa.length === 20 ? 'primary' : 'default'}
    className={dataa.length === 20 ? 'selected-chip' : 'unselected-chip'}
  />
  <Chip
    label="30"
    onClick={() => setDataa((prev) => ({...prev,length:30}))}
    color={dataa.length === 30 ? 'primary' : 'default'}
    className={dataa.length === 30 ? 'selected-chip' : 'unselected-chip'}
  />
</div>

                </div>

                <button onClick={commentionSubmit} className="sidebar-button">
                  Submit
                </button>

                <div className="output_box">
                <div className="outputTitleContainer">
                <h2 className="paraphrased-title">Output</h2>
                  <button onClick={regenerateCommention} className="regenerate">Regenerate</button>

                  </div>
              
                  <div className="answer-container">
                    {spin ? <>
                      <div className="loading-spinner">
                        <AiOutlineLoading />
                      </div>
                    </> : <>
                      <textarea readOnly={!isEditable} value={output} onChange={(e) => setOutput(e.target.value)} className="answer" />
                      <div className="output-box-icons">
                        <MdOutlineModeEditOutline onClick={getEditable} className="icon" />
                        <AiOutlineCopy onClick={copyTo} className="icon" />
                      </div>
                    </>}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
