import React, { Component } from 'react';
import Fuse from 'fuse.js';
import './App.css';

const languages = ['English', 'French', 'Spanish', 'Chinese', 'Hindi'];
const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['title', 'author'],
};

class App extends Component {

  constructor() {
    super();

    this.frameRef = React.createRef();
    this.state = {
      searchString: '',
      selectedLanguages: [],
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/books', { method: 'GET' })
    .then(response => response.json())
    .then(books => this.setState({ books }));
  }

  handleInputChange = e => {
    this.setState({ searchString: e.target.value });
  }

  handleDownloadClick = fileName => {
    this.frameRef.current.src = `http://localhost:3001/download/${fileName}`;
    // fetch(`http://localhost:3001/download/${fileName}`, { method: 'GET' });
  }

  handleLanguageChange = language => {
    const { selectedLanguages } = this.state;

    // if (selectedLanguages.length === languages.length) {
    //   return this.setState({
    //     selectedLanguages: [language],
    //   });
    // }

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
            <div className="book" key={book.id}>
              <div>
                <div className="title">{book.title}</div>
                <div className="author">{book.author}</div>
              </div>
              <div className="book-right">
                <div className="language">{book.language}</div>
                <div className="download" onClick={() => this.handleDownloadClick(book.fileName)}>
                  <svg viewBox="0 0 512 512" width="20px">
                    <path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z" />
                    <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
          <iframe ref={this.frameRef} style={{ display: 'none' }} />
        </div>
      </div>
    );
  }
}

export default App;
