import React, { useState, useEffect } from 'react';
import { getImages, searchImages } from './api.js';
import './App.css';

const App = () => {
  //api
  const [imageList, setImageList] = useState([]);
  //Load more button
  const [nextCursor, setNextCursor] = useState(null);
  //Search more button
  const [searchValue, setSearchValue] = useState('')

  // call api immediately
  useEffect(() => {
    const fetchData = async () => {
      const responseJSON = await getImages();
      setImageList(responseJSON.resources)
      setNextCursor(responseJSON.next_cursor)
    };

    fetchData();
  }, []);

  //Load more button
  const handleLoadMoreButtonClick = async () => {
    const responseJSON = await getImages(nextCursor)
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJSON.resources])
    setNextCursor(responseJSON.next_cursor)
  }

  //search button
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const responseJSON = await searchImages(searchValue, nextCursor);
    setImageList(responseJSON.resources);
    setNextCursor(responseJSON.next_cursor);
  };

  // clear button
  const resetForm = async () => {
    const responseJSON = await getImages();
    setImageList(responseJSON.resources);
    setNextCursor(responseJSON.next_cursor);

    setSearchValue('');
  }



  return (
    <>
      <div className="App">
        <h1>Welcome To Cloudinary Image Gallery</h1>
        <div className="wrap">
          <div className="search">
            <form onSubmit={handleFormSubmit}>
              <input value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                required="required"
                className="searchTerm"
                placeholder="Enter a search value..."></input>
              <button type="submit" className="searchButton">Search</button>
              <button type="button" onClick={resetForm} className="searchButton">Clear</button>
            </form>
          </div>
        </div>
        <div className="container">
          <div className="image_grid">
            {imageList.map((image) => (
              <img src={image.url} alt={image.public_id} className="img" />
            ))}
          </div>
        </div>


        <div className='footer'>
          {nextCursor && <button onClick={handleLoadMoreButtonClick}>Load More</button>}
        </div>
      </div>
    </>
  )
}

export default App
