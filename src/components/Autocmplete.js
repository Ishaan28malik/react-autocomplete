import React, { useState } from 'react';
import { products } from '../assets/data';
import './style.css';

export default function Autocomplete() {
  const [searchedItem, setSearchedItem] = useState('');
  const [searchHistory, setSearchHistory] = useState(products);
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.value.toLowerCase();
    if (searchText === '') {
      setSearchResult([]);
    } else {
      setSearchResult(
        searchHistory.filter((item) => item.toLowerCase().includes(searchText))
      );
    }
    setSearchedItem(searchText);
    setShowResults(false);
  };

  const handleClear = () => {
    setSearchedItem('');
    setShowResults(true);
  };

  const handleSearchMaintain = () => {
    searchHistory.includes(searchedItem) === false &&
      setSearchHistory([searchedItem, ...searchHistory]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
    setSearchResult(
      searchHistory.filter((item) =>
        item.toLowerCase().includes(searchedItem.toLowerCase())
      )
    );
  };

  const highlightMatch = (text, searchText) => {
    const regex = new RegExp(searchText, 'gi');
    return text.replace(regex, '<mark>$&</mark>');
  };

  return (
    <div className='main-container'>
      <div className='search-container'>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <input
              type='text'
              value={searchedItem}
              placeholder='Search'
              onChange={handleSearch}
              list='search-options'
              className='search-input'
            />
            {searchedItem && (
              <button onClick={handleClear} class='clear-button'>
                X
              </button>
            )}
          </div>
          {showResults === false && searchResult.length > 0 && (
            <div className='results-container'>
              {searchResult.slice(0, 5).map((result, index) => (
                <div
                  key={index}
                  className='result-item'
                  onClick={() => {
                    setSearchedItem(result);
                    setSearchResult([]);
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(result, searchedItem)
                  }}
                />
              ))}
            </div>
          )}
          <div className='button-container'>
            <button onClick={handleSearchMaintain} className='button-after'>
              {'Search'}
            </button>
            <button type='submit' className='button-after'>
              Submit
            </button>
          </div>
        </form>
      </div>
      {searchedItem && showResults && (
        <div className='search-history-container'>
          <h2 className='result-header'>Search Results</h2>
          <hr className='divider'></hr>
          {searchResult?.map((item) => (
            <div className='search-history-item'>{item}</div>
          ))}
        </div>
      )}
      <div className='search-history-container'>
        <h2 className='result-header'>Search Histroy (5)</h2>
        <hr className='divider'></hr>
        {searchHistory?.slice(0, 5).map((item) => (
          <div className='search-history-item'>{item}</div>
        ))}
      </div>
    </div>
  );
}
