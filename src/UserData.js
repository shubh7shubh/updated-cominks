import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { BiArrowBack } from 'react-icons/bi';
import Chart from 'react-apexcharts'


const UserData = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { name } = params;
    const [showCominks, setShowCominks] = useState(true);
    const [showParaphrase, setShowParaphrase] = useState(true);
    const [sum, setSum] = useState(0)

    const { activeUser } = useSelector((state) => state.User_Register);

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 2;
    // For paraphraisng
    const [currentParaItems, setCurrentParaItems] = useState([]);
    const [paraPageCount, setParaPageCount] = useState(0);
    const [paraItemOffset, setParaItemOffset] = useState(0);
    const paraItemsPerPage = 2;
    
    const [lengthCount, setLengthCount] = useState({ length10: 0, length20: 0, length30: 0 });
    // const [emotionUsed, setEmotionUsed] = useState({ lovely: 0, funny: 0, angry: 0,disagree:0,friendly:0,congragulatingg:0,appriciating:0,serious:0,shocking:0 });
    const [state, setState] = useState({});
    const [emotionState, setEmotionState] = useState({});
    const [emotionUsed, setEmotionUsed] = useState({
        lovely: 0,
        funny: 0,
        angry: 0,
        disagree: 0,
        friendly: 0,
        congragulating: 0,
        appriciating: 0,
        serious: 0,
        shocking: 0
      });

const handleLengthCount = () => {
  let count = { length10: 0, length20: 0, length30: 0 };
  activeUser.results.forEach((curElem) => {
    switch (curElem.length) {
      case "10":
        count.length10 += 1;
        break;
      case "20":
        count.length20 += 1;
        break;
      case "30":
        count.length30 += 1;
        break;
      default:
        break;
    }
  });
  setLengthCount(count);
};

useEffect(() => {
  handleLengthCount();
}, [activeUser]);



useEffect(() => {
  setState({
    options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: ['10', '20', '30'],
        title:{
          text:'Length Available'
        }
      },
      yaxis: {
        title:{
          text:'Length Used'
        }
      },
    },
    series: [{
      name: 'series-1',
      data: [lengthCount.length10, lengthCount.length20, lengthCount.length30]
    }]
  });
}, [lengthCount]);


  const handleEmotionCount = () => {
    let count = {
      lovely: 0,
      funny: 0,
      angry: 0,
      disagree: 0,
      friendly: 0,
      congragulating: 0,
      appriciating: 0,
      serious: 0,
      shocking: 0
    };
    activeUser.results.forEach((curElem) => {
      switch (curElem.emotion) {
        case "lovely":
          count.lovely += 1;
          break;
        case "funny":
          count.funny += 1;
          break;
        case "angry":
          count.angry += 1;
          break;
        case "disagree":
          count.disagree += 1;
          break;
        case "friendly":
          count.friendly += 1;
          break;
        case "congragulating":
          count.congragulating += 1;
          break;
        case "appriciating":
          count.appriciating += 1;
          break;
        case "serious":
          count.serious += 1;
          break;
        case "shocking":
          count.shocking += 1;
          break;
        default:
          break;
      }
    });
    setEmotionUsed(count);
  };
  
  useEffect(() => {
    handleEmotionCount();
  }, [activeUser]);

  
useEffect(() => {
    setEmotionState({
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [
            'lovely',
            'funny',
            'angry',
            'disagree',
            'friendly',
            'congragulating',
            'appriciating',
            'serious',
            'shocking'
          ],
          title:{
            text:'Emotions'
          },
        },
        yaxis: {
          title:{
            text:'Emotion Used'
          },
        },
      },
      series: [
        {
          name: 'series-2',
          data: [
            emotionUsed.lovely,
            emotionUsed.funny,
            emotionUsed.angry,
            emotionUsed.disagree,
            emotionUsed.friendly,
            emotionUsed.congragulating,
            emotionUsed.appriciating,
            emotionUsed.serious,
            emotionUsed.shocking
          ]
        }
      ]
    });
  }, [emotionUsed]);


  useEffect(() => {

   const commentsLength = activeUser.results.length;
   const paraphraseLength = activeUser.paraphrase.length;
   const sum = commentsLength + paraphraseLength;
   console.log(sum,'summmmmmmm')
   setSum(sum)
  }, [activeUser])
  
  
    const handleCominks = () => {
        setShowParaphrase(true)
        setShowCominks(false)
        console.log(activeUser,'aaaaaaaaaaaaaaaaaaa')
  
   
    }
    const handleParaphrase = () => {
        setShowCominks(true)
        setShowParaphrase(false)
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % activeUser.results.length;
        setItemOffset(newOffset);
    };


    useEffect(() => {
        if (!activeUser) {
            console.log("activeUser is empty");
            return;
        }

        const endOffset = itemOffset + itemsPerPage;
        if (!activeUser.results || endOffset > activeUser.results.length) {
            console.log("invalid itemOffset or itemsPerPage");
            return;
        }

        const newCurrentItems = activeUser.results.slice(itemOffset, endOffset);
        console.log(newCurrentItems, "newCurrentItems");

        setCurrentItems(newCurrentItems);
        setPageCount(Math.ceil(activeUser.results.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, activeUser]);



    // for paraphring pagination 

    const handleParaPageClick = (event) => {
        const newOffset = (event.selected * paraItemsPerPage) % activeUser.paraphrase.length;
        setParaItemOffset(newOffset);
    };

    useEffect(() => {
        if (!activeUser) {
            console.log("activeUser is empty");
            return;
        }

        const endOffset = paraItemOffset + paraItemsPerPage;
        if (!activeUser.paraphrase || endOffset > activeUser.paraphrase.length) {
            console.log("invalid paraItemOffset or paraItemsPerPage");
            return;
        }

        const newCurrentParaItems = activeUser.paraphrase.slice(paraItemOffset, endOffset);
        console.log(newCurrentParaItems, "newCurrentParaItems");

        setCurrentParaItems(newCurrentParaItems);
        setParaPageCount(Math.ceil(activeUser.paraphrase.length / paraItemsPerPage));
    }, [paraItemOffset, paraItemsPerPage, activeUser]);


    return <>
        {/* <Sidebar /> */}
        <div className="userDetails-container">
            <div >
                <button onClick={() => navigate("/")} className="top-back-button" ><BiArrowBack /></button>
            </div>
            <div className="user-details-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Found</th>
                            <th>Hope</th>
                            <th>Occupation</th>
                            <th>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{activeUser.name}</td>
                            <td>{activeUser.email}</td>
                            <td>{activeUser.found}</td>
                            <td>{activeUser.hope}</td>
                            <td>{activeUser.occupation}</td>
                            <td>{activeUser.countUsed}</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="user-data-container">
                <div className="button-container">
                    <button onClick={handleCominks} className='data-btn'>Cominks</button>
                    <button onClick={handleParaphrase} className='data-btn'>Paraphrase</button>
                </div>
                <div className="results-container">
                    {!showCominks ? (
                        <div className='cominks-container'>
                            <h2>The generated comments are listed below:</h2>

                            {currentItems ? <>
                                <div className="cominks-body">

                                    <div  className="cominks-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Input</th>
                                                    <th>Output</th>
                                                    <th>Emotion</th>
                                                    <th>Length</th>
                                                    <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((curElem) => {
                                                    return (
                                                        <tr>
                                                            <td>{curElem.textbox}</td>
                                                            <td>{curElem.output}</td>
                                                            <td>{curElem.emotion}</td>
                                                            <td>{curElem.length}</td>
                                                            <td>{curElem.time.slice(0, 25)}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="charts-container">
                                      <div className="credit_container">
                                        <div className="credit-box">
                                          <p>Credit used</p>
                                          <p style={{color:'#1E98F4'}}>{sum}</p>
                                        </div>
                                        <div className="credit-box">
                                          <p>Credit Available</p>
                                          <p style={{color:'#1E98F4'}}>{activeUser?.countUsed}</p>
                                        </div>
                                      </div>
                                        <Chart style={{  boxShadow:"0px 0px 20px rgba(0, 0, 0, 0.1)"}} options={state.options} series={state.series} type="line" width={450} height={320} />
                                        <Chart style={{  boxShadow:"0px 0px 20px rgba(0, 0, 0, 0.1)"}} options={emotionState.options} series={emotionState.series} type="bar" width={450} height={320} />
                                    </div>
                                </div>
                                <div style={{ marginRight: "12rem" }} className="users-paginate">
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        pageCount={pageCount}
                                        previousLabel="< previous"
                                        renderOnZeroPageCount={null}
                                        containerClassName="pagination"
                                        pageLinkClassName="page-num"
                                        previousLinkClassName="page-num"
                                        nextLinkClassName="page-num"
                                        activeLinkClassName="active"
                                    />

                                </div>
                            </> : null}

                        </div>
                    ) : ""}

                    {!showParaphrase ? (
                        <div className='paraphrase-container'>
                            <h1>The generated paraphrases are listed below:</h1>

                            {currentParaItems ? (
                                <div className="paraphrase-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Input</th>
                                                <th>Output</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentParaItems.map((curElem) => {
                                                return (
                                                    <tr>
                                                        <td>{curElem.textbox}</td>
                                                        <td>{curElem.output}</td>
                                                        <td>{curElem.time.slice(0, 25)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <div style={{ marginRight: "12rem" }} className="users-paginate">
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="next >"
                                            onPageChange={handleParaPageClick}
                                            pageRangeDisplayed={3}
                                            pageCount={paraPageCount}
                                            previousLabel="< previous"
                                            renderOnZeroPageCount={null}
                                            containerClassName="pagination"
                                            pageLinkClassName="page-num"
                                            previousLinkClassName="page-num"
                                            nextLinkClassName="page-num"
                                            activeLinkClassName="active"
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : null}

                </div>
            </div>

        </div>
    </>
}

export default UserData
