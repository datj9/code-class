import React from "react";
import ContentLoader from "react-content-loader";

const CardLoader = (props) => {
    const isLargeScreen = window.innerWidth > 768;
    const listCard = [];

    for (let i = 0; i < props.numberOfCards; i++) {
        listCard.push(
            <ContentLoader
                key={i}
                className='card-item'
                viewBox={isLargeScreen ? "0 0 300 45" : "0 0 300 55"}
                backgroundColor='#bdbdbd'
                foregroundColor='#ccc'
            >
                <rect x='0' y='0' rx='5' ry='5' width={isLargeScreen ? 45 : 55} height={isLargeScreen ? 45 : 55} />
                <rect
                    x={isLargeScreen ? 50 : 60}
                    y='0'
                    rx='4'
                    ry='4'
                    width={isLargeScreen ? 180 : 240}
                    height={isLargeScreen ? 10 : 12}
                />
                <rect
                    x={isLargeScreen ? 50 : 60}
                    y={isLargeScreen ? 15 : 17}
                    rx='3'
                    ry='3'
                    width={isLargeScreen ? 150 : 200}
                    height={isLargeScreen ? 8 : 10}
                />
                <rect
                    x={isLargeScreen ? 50 : 60}
                    y={isLargeScreen ? 28 : 34}
                    rx='3'
                    ry='3'
                    width={isLargeScreen ? 50 : 80}
                    height={isLargeScreen ? 6 : 8}
                />
                <rect
                    x={isLargeScreen ? 50 : 60}
                    y={isLargeScreen ? 39 : 47}
                    rx='3'
                    ry='3'
                    width={isLargeScreen ? 50 : 80}
                    height={isLargeScreen ? 6 : 8}
                />
            </ContentLoader>
        );
    }
    return listCard;
};

export default CardLoader;
