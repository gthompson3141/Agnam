import React from 'react';
import '../App.css';

const ComicList = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    return (
        <>
            {props.comics.map((comic, index) => (
                <div className='image-container d-flex justify-content-start mt-4 mb-4 me-4'>
                    <div>
                        <a href={comic.URL}>
                            <img className='comic-img' src={comic.Poster} alt='comic' />
                        </a>
                    </div>
                    <div className='overlay2 d-flex align-items-center justify-content-center'>
                        <h4>{comic.Title}</h4>
                    </div>
                    <div
                        onClick={() => props.handleFavouritesClick(comic)}
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ComicList;