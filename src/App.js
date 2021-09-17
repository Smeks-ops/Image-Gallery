import React, { useState, useEffect } from 'react';
import { getImages } from './api.js';
import './App.css';

const App = () => {
const [ imageList, setImageList ] = useState([])

  // call api immediately
    useEffect(() => {
        const fetchData = async() => {
          const responseJSON = await getImages();
          setImageList(responseJSON.resources)
        };

        fetchData();
    }, []);

    return (
        <div className="image_grid">
          {imageList.map((image) => (
            <img src={image.url} alt={image.public_id}></img>
          ))}
        </div>
    )
}

export default App
