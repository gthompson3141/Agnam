import React from 'react';

const SearchBox = (props) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const input = (e.target.value);
            props.setSearchValue(input);
        }
    };

    return (
        <div className='col'>
            <input
                id='searchBar'
                className='form-control'
                value={props.value}
                onKeyDown={handleKeyDown}
                placeholder='Search'
            ></input>
        </div>
    )
}

export default SearchBox;