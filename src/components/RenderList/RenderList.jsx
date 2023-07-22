import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import './RenderList.styles.css';
class RenderList extends Component {
  state = {
    selectedImage: null,
  };

  openModal = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };
  render() {
    const { images } = this.props;

    if (images.length > 0) {
      return (
        <ul className="gallery">
          {images.map(el => (
            <li key={el.id}>
              <img
                className="previewImg"
                alt={el.tags}
                src={el.webformatURL}
                onClick={() => this.openModal(el.largeImageURL)}
              />
            </li>
          ))}
          <Modal
            isOpen={this.state.selectedImage !== null}
            imageUrl={this.state.selectedImage}
            onClose={this.closeModal}
          />
        </ul>
      );
    } else {
      return <div className="empty_info">Brak dostępnych zdjęć</div>;
    }
  }
}

export default RenderList;
