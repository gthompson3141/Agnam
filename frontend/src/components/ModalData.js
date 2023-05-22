import React, { useState } from 'react';
import { ReactDOM } from 'react-dom/client';
import './Modal.css';

const ModalData = (props) => {

    const handleClick = () => {
        props.setOpenModalData(false);
    };

    return(
        <div className='modalBackgroundData'>
            <div className='modalContainerData'>
                <div className='modalItemsData'>
                    <div className='row d-flex justify-content-center mb-3 mt-3'>
                        <h2 className='d-flex justify-content-center'>[title]{props.title}</h2>
                        <h2 className='d-flex justify-content-center'>[posterrrrr]{props.poster}</h2>
                        <input type='submit' className='dataSubmit' onClick={handleClick}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalData;