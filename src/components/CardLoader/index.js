import React from "react";
import ContentLoader from "react-content-loader";

const CardLoader = (props) => {
    const listCard = [];
    for (let i = 0; i < props.numberOfCards; i++) {
        listCard.push(
            <ContentLoader key={i} className='card-item' viewBox='0 0 300 45'>
                <rect x='0' y='0' rx='5' ry='5' width='45' height='45' />
                <rect x='50' y='0' rx='4' ry='4' width='180' height='10' />
                <rect x='50' y='15' rx='3' ry='3' width='150' height='8' />
                <rect x='50' y='28' rx='3' ry='3' width='50' height='6' />
                <rect x='50' y='39' rx='3' ry='3' width='50' height='6' />
            </ContentLoader>
        );
    }
    return listCard;
};

export default CardLoader;
