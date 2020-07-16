import React from "react";
import ContentLoader from "react-content-loader";

const CardLoader = (props) => {
    const listCard = [];
    for (let i = 0; i < props.numberOfCards; i++) {
        listCard.push(
            <ContentLoader key={i} className='card-item' viewBox='0 0 300 55'>
                <rect x='0' y='0' rx='5' ry='5' width='40' height='40' />
                <rect x='45' y='0' rx='4' ry='4' width='180' height='10' />
                <rect x='45' y='15' rx='3' ry='3' width='150' height='8' />
                <rect x='45' y='28' rx='3' ry='3' width='50' height='5' />
                <rect x='45' y='36' rx='3' ry='3' width='50' height='5' />
            </ContentLoader>
        );
    }
    return listCard;
};

export default CardLoader;
