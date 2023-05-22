import React, { useState } from 'react';
import './Modal.css';
import axios from 'axios';


const ModalUrl = (props) => {

    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [post, setPost] = useState('');

    const handleClick = () => {
        props.setOpenModalUrl(false);
        postData();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setUrl(e.target.value);
        setTitle("title");
        setPoster("poster");
    };

    const postData = () => {
        const data = { URL: url };
        axios.post('http://localhost:8000/comics/create/', data)
            .then((response) => {
                setPost(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className='modalBackgroundUrl'>
            <div className='modalContainerUrl'>
                <div className='modalItemsUrl'>
                    <div className='row d-flex align-items-center ms-0'>
                        <div className='col'>
                            <label>URL
                                <input
                                    type='text'
                                    id='url'
                                    name='url'
                                    className='addUrl'
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </label>
                            <input type='submit' className='addButton' onClick={handleClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalUrl;