import React, { Component } from 'react';
import Loader from './Loader/Loader';
import RenderList from './RenderList/RenderList';
import SearchBar from './SearchBar/SearchBar';
import './App.styles.css';

class Gallery extends Component {
  state = {
    images: [],
    inputSearch: '',
    limit: 12,
    page: 1,
    isLoading: false,
    isModalOpen: false,
    API_KEY: '36730001-9966eb2ff0700192767337e13',
  };

  async componentDidMount() {
    if (this.state.inputSearch.length === 0 && this.state.images.length > 0) {
      this.setState({ images: [] });
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.limit !== this.state.limit) {
      this.fetchFromApi();
    }
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  nextPage = () => {
    this.setState(
      prevState => ({ ...prevState, page: prevState.page + 1 }),
      () => {
        this.fetchFromApi();
      }
    );
  };
  fetchFromApi = async () => {
    try {
      const { inputSearch, limit, page, API_KEY } = this.state;
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${limit}`
      );
      const data = await response.json();

      this.setState(
        prevState => ({ ...prevState, images: data.hits }),
        () => {
          this.scrollDown();
        }
      );
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  scrollDown = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  changeLimit = () => {
    this.setState(prevState => ({ ...prevState, limit: prevState.limit + 10 }));
  };

  handleSubmit = e => {
    this.setState({ isLoading: true });
    e.preventDefault();
    if (this.state.inputSearch.length === 0) {
      this.setState({ images: [], page: 1 });
      alert('Search input cannot be empty');
    } else {
      this.setState({ images: [], page: 1 }, () => {
        this.fetchFromApi();
      });
    }
  };

  render() {
    return (
      <div className="app">
        <SearchBar
          inputSearch={this.state.inputSearch}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        ></SearchBar>

        {this.state.isLoading ? (
          <Loader />
        ) : (
          <RenderList images={this.state.images} />
        )}
        <button
          type="button"
          name="showMore"
          onClick={this.changeLimit}
          className="more_button"
        >
          Show More
        </button>
      </div>
    );
  }
}
export default Gallery;
