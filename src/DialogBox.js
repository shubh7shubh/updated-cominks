import React, { useState } from 'react';
// import './DialogBox.css';

function DialogBox(props) {
  const [visible, setVisible] = useState(false);
  const { message } = props;

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  return <>
    <div>
      <button onClick={showDialog}>Show Dialog</button>
      {visible && (
        <div className="dialog-containers">
          <div className="dialogs">
            <p className="message">{message}</p>
            <button className="close-btns" onClick={hideDialog}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
    </>
}

export default DialogBox;
