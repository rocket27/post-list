import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './listedPost.scss';
import { ReactSVG } from 'react-svg';
import phoneIcon from '../../assets/images/svg/phone.svg';
import mapMarker from '../../assets/images/svg/map-marker.svg';
import { parsePhoneNumber } from '../../helpers/utils';

const ListedPost = ({ city, description, id, image, onRemove, phoneNumber, title }) => {
    const history = useHistory();
    const [imageBase64string, setImageBase64string] = useState(null);
    useEffect(() => {
        if (image && image.name) {
            getBase64imageString(image);
        }
    }, [image]);

    /**
     * Переход в карточку объявления для редактирования
     */
    const editPost = () => history.push(`post/${id}`);

    /**
     * Получаем base64 строку для вывода в src изображения
     * @param file
     */
    const getBase64imageString = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => setImageBase64string(e.target.result);
        reader.readAsDataURL(file);
    };

    return (
        <article className={'listed-post'}>
            <div className={'listed-post__main-info'}>
                <h2 className={'listed-post__title'}>{title}</h2>
                <p className={'listed-post__description'}>{description}</p>
                {
                    imageBase64string &&
                    <figure className={'listed-post__image-wrapper'}>
                        <img
                            src={imageBase64string}
                            className={'listed-post__image'}
                            alt={'Изображение прикрепленное к объявлению'}
                        />
                    </figure>
                }
            </div>
            <div className={'listed-post__additional-info'}>
                <div className={'listed-post__contacts'}>
                    <a
                        className={'listed-post__contacts-phone'}
                        href={`tel:${phoneNumber}`}
                    >
                        <ReactSVG
                            src={phoneIcon}
                        />
                        <span>{parsePhoneNumber(phoneNumber)}</span>
                    </a>
                    <div className={'listed-post__contacts-city'}>
                        <ReactSVG
                            src={mapMarker}
                        />
                        <span>{city.name}</span>
                    </div>
                </div>
                <div className={'listed-post__management'}>
                    <button
                        className={'primary-button'}
                        onClick={editPost}
                    >
                        Редактировать
                    </button>
                    <button
                        className={'warning-button'}
                        onClick={() => onRemove(id)}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ListedPost;
