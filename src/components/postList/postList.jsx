import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postStore from '../../store/postStore';
import ListedPost from '../listedPost/listedPost';
import './postList.scss';

const PostList = () => {
    const [postList, setPostList] = useState(postStore?.postList ?? []);
    useEffect(() => getPostList());

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
        postStore.setPostList(postList.filter((post) => post.id !== postId));
        getPostList();
    };

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

export default observer(PostList);
