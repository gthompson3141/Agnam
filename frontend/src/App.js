import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ComicList from './components/ComicList';
import ComicListHeading from './components/ComicListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import ModalUrl from './components/ModalUrl';
import axios from 'axios';
import Login from './components/Login';

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <App />;
};

const App = () => {
  const [comics, setComics] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [openModalUrl, setOpenModalUrl] = useState(false);

  useEffect(() => {
    if (searchValue !== '') {
      // Send request to database to return comics where title matches search value
      const searchComic = async () => {
        let dataList = [];
        const { data } = await axios.get('/comics/' + searchValue);
        dataList.push(data);
        console.log(dataList);
        setComics(dataList);
      };

      searchComic();
    } else {
      // Send request to database to return all comics
      const fetchData = async () => {
        const { data } = await axios.get('/comics');
        setComics(data);
      };

      fetchData();
    }

    // If there are comics saved in local storage as favourites then load them to the favourites section
    const comicFavourites = JSON.parse(localStorage.getItem('react-comic-app-favourites'));
    if (comicFavourites) {
      setFavourites(comicFavourites);
    }
  }, [searchValue]);

  // Save favourited comics to the local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-comic-app-favourites', JSON.stringify(items));
  };

  // Append the list with a new favourite comic then save
  const addFavouriteComic = (comic) => {
    const newFavouriteList = [...favourites, comic];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  // Create a new favourite list without the selected comic then save
  const removeFavouriteComic = (comic) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.Title !== comic.Title
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className='app'>
      {openModalUrl && <ModalUrl setOpenModalUrl={setOpenModalUrl} />}
      <div className='container-fluid comic-app'>
        <div className='row d-flex align-items-center mt-5 mb-2'>
          <ComicListHeading heading='Home' />
          <SearchBox setSearchValue={setSearchValue} />
        </div>
        <div className='row ms-0 me-0'>
          {/* Button for adding a new comic */}
          <button
            id='addComicBtn'
            className='btn btn-dark mt-4 mb-4 me-4'
            onClick={() => {
              setOpenModalUrl(true);
            }}
          >
            +
          </button>
          {/* Display all comics in the database and provide favourite functionality */}
          <ComicList
            comics={comics}
            handleFavouritesClick={addFavouriteComic}
            favouriteComponent={AddFavourites}
          />
        </div>
        <div className='row d-flex align-items-center mt-5 mb-4'>
          <ComicListHeading heading='Favourites' />
        </div>
        <div className='row me-1'>
          {/* Display favourite list with favourite functionality */}
          <ComicList
            comics={favourites}
            handleFavouritesClick={removeFavouriteComic}
            favouriteComponent={RemoveFavourites}
          />
        </div>
      </div>
    </div>
  );
};

export default AppWrapper;


{/* <div className='row d-flex align-items-center mt-5 mb-4'>
  <ComicListHeading heading='Recommendations' />
</div>
<div className='row me-1'>
  <ComicList
    comics={favourites}
    handleFavouritesClick={removeFavouriteComic}
    favouriteComponent={RemoveFavourites}
  />
</div> */}