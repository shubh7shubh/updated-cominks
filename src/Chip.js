// const countUsed = async () => {
//     try {
//       const res = await axios.get(`/countUsed`);
//       setCount(res.data.count);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const checkoutHandler = async () => {
//     const {
//       data: { order },
//     } = await axios.post("/checkout", { credit: 300 });
//     console.log(data);

//     const options = {
//       key: "rzp_test_tQ9DXqWHYCmN9g",
//       amount: order.amount,
//       currency: "INR",
//       name: "Ioninks",
//       description: "Test Transaction",
//       image: "https://example.com/your_logo",
//       order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       callback_url: "http://localhost:8000/paymentverification",
//       prefill: {
//         name: "User Name",
//         email: "gaurav.kumar@example.com",
//         contact: "9000090000",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
//     const razor = new window.Razorpay(options);
//     razor.open();
//   };


//   html-
//   <div class="dialog-container">
//   <div class="dialog">
//     <p class="message"></p>
//     <button class="close-btn">OK</button>
//   </div>
// </div>



// css-
// .dialog-container {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 9999;
//     visibility: hidden;
//     opacity: 0;
//     transition: all 0.3s ease;
//   }
  
//   .dialog {
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
//     text-align: center;
//     transform: translateX(100%);
//     transition: all 0.3s ease;
//   }
  
//   .close-btn {
//     padding: 10px 20px;
//     border-radius: 5px;
//     border: none;
//     background-color: #007bff;
//     color: #fff;
//     cursor: pointer;
//   }

  
//   javascript-
//   const dialogContainer = document.querySelector('.dialog-container');
//   const dialog = document.querySelector('.dialog');
//   const messageEl = document.querySelector('.message');
//   const closeBtn = document.querySelector('.close-btn');
  
//   function showDialog(message) {
//     messageEl.textContent = message;
//     dialogContainer.style.visibility = 'visible';
//     dialogContainer.style.opacity = 1;
//     dialog.style.transform = 'translateX(0)';
//   }
  
//   function hideDialog() {
//     dialogContainer.style.visibility = 'hidden';
//     dialogContainer.style.opacity = 0;
//     dialog.style.transform = 'translateX(100%)';
//   }
  
//   closeBtn.addEventListener('click', hideDialog);
  