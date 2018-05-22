import React, { Component } from 'react';
import Fuse from 'fuse.js';
import './App.css';

const languages = ['English', 'French', 'Spanish', 'Chinese', 'Japanese'];
const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['title', 'author'],
};

const apiUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

class App extends Component {

  constructor() {
    super();

    this.frameRef = React.createRef();

    this.state = {
      searchString: '',
      selectedLanguages: [],
    };
  }

  componentWillMount() {
    fetch(apiUrl + '/books', { method: 'GET' })
    .then(response => response.json())
    .then(books => this.setState({ books }));
  }

  handleInputChange = e => {
    this.setState({ searchString: e.target.value });
  }

  handleDownloadClick = fileName => {
    this.frameRef.current.src = apiUrl + `/download/${fileName}`;
  }

  handleLanguageChange = language => {
    const { selectedLanguages } = this.state;

    const nextSelectedLanguages = selectedLanguages.slice();

    if (selectedLanguages.includes(language)) {
      nextSelectedLanguages.splice(selectedLanguages.indexOf(language), 1);
    }
    else {
      nextSelectedLanguages.push(language);
    }

    this.setState({
      selectedLanguages: nextSelectedLanguages,
    });
  }

  render() {
    const { books, searchString, selectedLanguages } = this.state;

    if (!books) return null;

    let filteredBooks = books.slice();

    if (searchString) {
      filteredBooks = new Fuse(books, options).search(searchString);
    }

    if (selectedLanguages.length) {
      filteredBooks = filteredBooks.filter(b => selectedLanguages.includes(b.language));
    }

    return (
      <div className="App">
        <input
          autoFocus
          className="search_input"
          value={searchString}
          onChange={this.handleInputChange}
          placeholder="🔍 Search"
        />
        <div className="language_checkboxes">
          {languages.map(language => {
            let className = 'language';

            if (selectedLanguages.includes(language)) {
              className += ' active';
            }

            return (
              <div
                key={language}
                className={className}
                onClick={() => this.handleLanguageChange(language)}
              >
                {language}
              </div>
            );
          })}
        </div>
        <div className="books">
          {filteredBooks.map(book => (
            <div className="book" key={book.id} onClick={() => this.handleDownloadClick(book.fileName)}>
              <div className="title">{book.title}</div>
              <div className="book-meta">
                <span className="author">{book.author}</span>
                <span className="book-language">{book.language}</span>
              </div>
            </div>
          ))}
        </div>
        <iframe ref={this.frameRef} style={{ display: 'none' }} />
      </div>
    );
  }
}

export default App;
