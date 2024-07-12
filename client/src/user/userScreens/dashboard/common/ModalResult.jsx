import'./main.scss';

const ModalResult = (props) => {
    const {onClose, totalscore} = props
  return (
    <div className='modal-backdrop'>
      <div className='modal-content'>
        <h2 className='modal-heading'>Result</h2>
        <p className='modal-sub-heading'>{totalscore}</p>
        <button className='yes-result-button' onClick={onClose}>Go Back</button>
      </div>
    </div>
  );
};

export default ModalResult;
