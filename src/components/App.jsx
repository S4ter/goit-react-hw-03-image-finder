import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    const { inputSearch, handleSubmit } = this.props;

    return (
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={inputSearch}
            onChange={() => {}}
            placeholder="Search images and photos"
          />
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}

class Gallery extends Component {
  state = {
    images: [],
    inputSearch: '',
    limit: '12',
    page: '1',
    API_KEY: '36730001-9966eb2ff0700192767337e13',
  };

  async componentDidMount() {
    this.fetchFromApi();
  }
  async componentDidUpdate() {}

  fetchFromApi = async () => {
    console.log('test');
    try {
      const { inputSearch, limit, page, API_KEY } = this.state;
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${limit}`
      );
      const data = await response.json();

      this.setState(prevState => ({ ...prevState, images: data.hits }));
    } catch (error) {
      console.log('error', error);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
    this.fetchFromApi();
  };
  render() {
    console.log(this.state.images);
    return (
      <div>
        <SearchBar
          inputSearch={this.state.inputSearch}
          handleSubmit={this.handleSubmit}
        ></SearchBar>
        <ul className="Gallery"> GALERIA</ul>
      </div>
    );
  }
}
export default Gallery;
