import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { Badge } from "shards-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default React.memo(function TutorialItem({ tutorial }) {
    return (
        <Link to={`/tutorials/${tutorial.id}`} className='card-item text-decoration-none text-dark' key={tutorial.id}>
            <img className='mr-3' src={tutorial.thumbnailUrl} alt='' />
            <div className='d-flex flex-column'>
                <span className='tutorial-title'>{tutorial.title}</span>
                <span className='tutorial-description'>
                    {tutorial.description.length <= 23 || window.innerWidth > 576
                        ? tutorial.description
                        : tutorial.description}
                </span>
                <span className='mt-2 created-at'>
                    {Date.now() - new Date(tutorial.createdAt) <= 3 * 24 * 60 * 60 * 1000
                        ? dayjs(tutorial.createdAt).fromNow()
                        : dayjs(tutorial.createdAt).format("MMMM DD")}
                </span>
                <div>
                    {tutorial.tags.map((tag) => (
                        <Badge key={tag} className='mr-2' pill theme='secondary'>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </Link>
    );
});
