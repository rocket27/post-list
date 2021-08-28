import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { POST_LIST_LOCAL_STORAGE_VALUE } from '../../config/constants';
import { getLocalStorageItem } from '../../helpers/utils';

const PostList = () => {
    const [postList, setPostList] = useState(getLocalStorageItem(POST_LIST_LOCAL_STORAGE_VALUE) ?? []);

    /**
     * Получаем список объявлений из LocalStorage
     */
    const getPostList = () => {
        setPostList(getLocalStorageItem(POST_LIST_LOCAL_STORAGE_VALUE));
    };

    useEffect(getPostList, []);

    return (
        <div className={'post-list'}>
            <h1>Post list</h1>
            {
                (!postList || !postList.length) && <p className={'empty'}>Список объявлений пуст</p>
            }
            {
                postList && !!postList.length &&
                <ul className={'post-list__view'}>
                    {
                        postList.map((post) => {
                            return (
                                <li
                                    key={post.id}
                                    className={'post-list__view-item'}
                                >
                                    {post.title}
                                </li>
                            );
                        })
                    }
                </ul>
            }
            <Link to={'/new'}>New</Link>
        </div>
    );
};

export default PostList;
