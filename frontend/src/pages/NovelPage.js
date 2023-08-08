import React, { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';
import ComicListHeading from '../components/ComicListHeading';
import ComicList from '../components/ComicList';
import ModalUrl from '../components/ModalUrl';
import SearchBox from '../components/SearchBox';
import axios from 'axios';
import AddFavourites from '../components/AddFavourites';
import RemoveFavourites from '../components/RemoveFavourites';
import { useAuth } from '../api/AuthContext';
import pageTitle from '../components/AppHeader';


const NovelPage = () => {

    const [comics, setComics] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [openModalUrl, setOpenModalUrl] = useState(false);
    const { isLoggedIn } = useAuth();
    const pageTitle = 'Novels'

    useEffect(() => {
      if (searchValue !== '') {
        // Send request to database to return comics where title matches search value
        const searchComic = async () => {
        try{
          let dataList = [];
          const { data } = await axios.get('/comics/' + searchValue);
          dataList.push(data);
          console.log(dataList);
          setComics(dataList);
        }catch{
          console.log('No Match');
        }
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
      <div className='mangaPage'>
        <div className='app-header'>
          {openModalUrl && <ModalUrl setOpenModalUrl={setOpenModalUrl} />}
          <AppHeader isLoggedIn={isLoggedIn} pageTitle={pageTitle}/>
        </div>
      <div className='app-body'>
          <div className='container-fluid comic-app'>
            <div className='row ms-0 me-0 mt-2'>
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
            <div className='row d-flex align-items-center mt-3 mb-4'>
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
      </div>
    );
};

export default NovelPage;


// <div className='col-auto'> {/* Use col-auto class to adjust width automatically */}
//                             <Logout handleLogout={handleLogout} />
//                             </div>

// {/* <div className='app-header'>
//               <div className='container-fluid'>
//                 <div className='row d-flex align-items-center justify-content-between'>
//                   <div className='col mt-5 mb-2'>
//                     <ComicListHeading heading='Home' />
//                   </div>
//                 	<div className='col-auto mt-5 mb-2'> {/* Use col-auto class to adjust width automatically */}
//                 		<div className='row align-items-center'>
//                     	<div className='col-auto'> {/* Use col-auto class to adjust width automatically */}
//                       	<SearchBox setSearchValue={setSearchValue} />
//                     	</div>                          
//                   	</div>
//                 	</div>
//               	</div>
//             	</div>
//           	</div> */}