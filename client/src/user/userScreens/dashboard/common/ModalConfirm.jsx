import React from 'react';
import './main.scss';

const ModalConfirm = ({ onClose, content,handleConfirmTest, heading, totalscore, exit }) => {
  return (
    <div className='modal-backdrop'>
      <div className='modal-content'>
        <h2 className='modal-heading'>{heading}</h2>
        <p className='modal-sub-heading' >{content}</p>
        {!totalscore && (
          <div className='button-container'>
            <button className='yes-button' onClick={handleConfirmTest}>Yes</button>
            <button className='cancel-button' onClick={onClose}>Cancel</button>
          </div>
        )}
        {totalscore && (
          <div>
            <p>Total Score: {totalscore}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalConfirm;
