import React, { useEffect, useState } from 'react';

const FormControlFileInput = ({ onChangeImage }) => {
    const [image, setImage] = useState(null);
    const [imageBase64string, setImageBase64string] = useState(null);
    useEffect(() => getBase64imageString(image), [image]);
    useEffect(() => onChangeImage(image), [image, imageBase64string]);

    /**
     * Сохраняем выбранное изображение в переменной состояния
     * @param e
     */
    const bindPostImage = (e) => {
        const images = e.target.files || e.dataTransfer.files;
        if (!images.length) return;
        setImage(images[0]);
    };

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

    /**
     * Удалить выбранное изображение
     */
    const clearImage = () => {
        setImageBase64string(null);
        setImage(null);
    };

    return (
        <section className={'form-control'}>
            {
                !imageBase64string && !image &&
                <>
                    <input
                        className={'form-control__file'}
                        type={'file'}
                        name={'post-image'}
                        id={'post-image'}
                        accept={'image/x-png,image/jpeg'}
                        onChange={(event) => bindPostImage(event)}
                    />
                    <label
                        className={'form-control__static-label'}
                        htmlFor={'post-image'}
                    >
                        <span>Прикрепить фото</span>
                    </label>
                </>
            }
            {
                imageBase64string && image &&
                    <div className={'form-control__file-data'}>
                        <figure className={'form-control__file-image-wrapper'}>
                            <img
                                src={imageBase64string}
                                className={'form-control__file-image'}
                                alt={'Изображение прикрепленное к объявлению'}
                            />
                        </figure>
                        {
                            image &&
                            <div className={'form-control__file-info'}>
                                <span className={'form-control__file-name'}>
                                    {image.name}
                                </span>
                                <button
                                    className={'form-control__file-remove'}
                                    onClick={clearImage}
                                >
                                    Удалить
                                </button>
                            </div>
                        }
                    </div>
            }
        </section>
    );
};

export default FormControlFileInput;
