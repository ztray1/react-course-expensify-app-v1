import React from "react";

import Modal from "react-modal";

const ConfirmModal =(props)=>(
    <Modal
      isOpen={!!props.selectedOption}
      onRequestClose={props.handleCancelOption}
      contentLabel="selected Option"
      className="modal"
      appElement={document.getElementById('app')}>
        <h3>Are you sure to remove?</h3>
        <button className="button button--modal" onClick={props.handleConfirmRemoveOption}>Confirm</button>
        <button className="button button--modal" onClick={props.handleCancelOption}>cancel</button>
    </Modal>
)

export default ConfirmModal;