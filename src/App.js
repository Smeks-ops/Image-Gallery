import React, { useState, useEffect } from 'react';
import { getImages } from './api.js';
import './App.css';

const App = () => {
  //api
const [ imageList, setImageList ] = useState([]);
//Load more button
const [ nextCursor, setNextCursor ] = useState(null);

  // call api immediately
    useEffect(() => {
        const fetchData = async() => {
          const responseJSON = await getImages();
          setImageList(responseJSON.resources)
          setNextCursor(responseJSON.next_cursor)
        };

        fetchData();
    }, []);

    const handleLoadMoreButtonClick = async() => {
      const responseJSON = await getImages(nextCursor)
      setImageList((currentImageList) => [
        ...currentImageList,
        ...responseJSON.resources])
        setNextCursor(responseJSON.next_cursor)
    }

    return (
      <>
        <div className="image_grid">
          {imageList.map((image) => (
            <img src={image.url} alt={image.public_id}></img>
          ))}
        </div>

        <div className='footer'>
          {nextCursor && <button onClick={handleLoadMoreButtonClick}>Load More</button>}
        </div>
      </>
    )
}

export default App
