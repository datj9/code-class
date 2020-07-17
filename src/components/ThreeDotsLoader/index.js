import React from "react";
import "./style.css";

const ThreeDotsLoader = () => {
    return (
        <div className='spinner'>
            <div className='bounce1'></div>
            <div className='bounce2'></div>
            <div className='bounce3'></div>
        </div>
    );
};

export default ThreeDotsLoader;
