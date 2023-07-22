import './Modal.styles.css';
import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };
  render() {
    const { isOpen, imageUrl, onClose } = this.props;
    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content">
          <img src={imageUrl} alt="Large" />
        </div>
      </div>
    );
  }
}

export default Modal;
