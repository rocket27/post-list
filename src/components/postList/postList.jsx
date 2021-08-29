import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { POST_LIST_LOCAL_STORAGE_VALUE } from '../../config/constants';
// import { getLocalStorageItem, setLocalStorageItem } from '../../helpers/utils';
import ListedPost from '../listedPost/listedPost';
import './postList.scss';

const PostList = ({ postStore }) => {
    const [postList, setPostList] = useState(postStore?.postList ?? []);

    /**
     * Получаем список объявлений из LocalStorage
     */
    const getPostList = () => {
        setPostList(postStore?.postList ?? []);
    };

    /**
     * Удаляем выбранный
     * @param postId
     */
    const removePostFromList = (postId) => {
        if (!postId) return;
        if (!postList) getPostList();
        // setLocalStorageItem(POST_LIST_LOCAL_STORAGE_VALUE, postList.filter((post) => post.id !== postId));
        postStore.setPostList(postList.filter((post) => post.id !== postId));
        getPostList();
    };

    useEffect(getPostList, []);

    return (
        <div className={'post-list'}>
            <header className={'post-list__header'}>
                <h1 className={'title'}>Объявление</h1>
                <Link
                    to={'/new'}
                    className={'primary-button'}
                >
                    Добавить объявление
                </Link>
            </header>
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
                                    <ListedPost
                                        { ...post }
                                        onRemove={removePostFromList}
                                    />
                                </li>
                            );
                        })
                    }
                </ul>
            }
        </div>
    );
};

export default inject('postStore')(observer(PostList));
