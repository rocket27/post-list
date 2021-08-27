import React from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
    return (
        <div className={'post-list'}>
            <h1>Post list</h1>
            <Link to={'/new'}>New</Link>
        </div>
    );
};

export default PostList;
