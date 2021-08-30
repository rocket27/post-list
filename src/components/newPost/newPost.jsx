import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { POST_CREATE_FORM_CONFIG } from '../../config/postCreateFormConfig';
import { CITIES } from '../../enums/cities';
import postStore from '../../store/postStore';
import FormControlFileInput from '../formControlFileInput/formControlFileInput';
import FormControlInput from '../formControlInput/formControlInput';
import { v4 as uuidv4 } from 'uuid';
import FormControlPhone from '../formControlPhone/formControlPhone';
import FormControlSelect from '../formControlSelect/formControlSelect';
import FormControlTextarea from '../formControlTextarea/formControlTextarea';
import './newPost.scss';

const NewPost = () => {
    const history = useHistory();
    const [selectedImage, setSelectedImage] = useState(null);

    /**
     * Схема валидации формы создания объявления
     */
    const formSchema = yup.object()
        .shape({
            title: yup.string()
                .required(POST_CREATE_FORM_CONFIG.title.validation.required.message)
                .max(
                    POST_CREATE_FORM_CONFIG.title.validation.maxlength.value,
                    POST_CREATE_FORM_CONFIG.title.validation.maxlength.message(POST_CREATE_FORM_CONFIG.title.validation.maxlength.value),
                ),
            description: yup.string()
                .required(POST_CREATE_FORM_CONFIG.description.validation.required.message)
                .max(
                    POST_CREATE_FORM_CONFIG.description.validation.maxlength.value,
                    POST_CREATE_FORM_CONFIG.description.validation.maxlength.message(POST_CREATE_FORM_CONFIG.description.validation.maxlength.value),
                ),
            phoneNumber: yup.string()
                .required(POST_CREATE_FORM_CONFIG.phone.validation.required.message)
                .matches(
                    POST_CREATE_FORM_CONFIG.phone.validation.matches.value,
                    POST_CREATE_FORM_CONFIG.phone.validation.matches.message,
                ),
            city: yup.string()
                .required(POST_CREATE_FORM_CONFIG.city.validation.required.message),
        });

    /**
     * Конфигурация для работы с формой
     */
    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(formSchema),
    });

    /**
     * Обрабатываем изменение выбранного изображения
     * @param file
     */
    const onImageSelect = (file) => {
        if (!file) setSelectedImage(null);
        setSelectedImage(file);
    };

    /**
     * Создаем новое объявление, добавляем уникальный идентификатор
     * для управления записью и преходим в список объявлений
     * @param data
     */
    const CreatePost = (data) => {
        const newPost = {
            id: uuidv4(),
            image: selectedImage,
            ...data,
            city: Object.values(CITIES)
                .find((city) => city.id === data.city),
        };
        const postList = postStore?.getPostList();
        if (!postList) postStore?.setPostList([newPost]);
        else {
            postList.unshift(newPost);
            postStore?.setPostList(postList);
        }
        history.push('/');
    };

    return (
        <div className={'new-post'}>
            <div className={'container'}>
                <h1 className={'title'}>Подать объявление</h1>
                <form onSubmit={handleSubmit(CreatePost)}>
                    <FormControlInput
                        currentValue={watch(POST_CREATE_FORM_CONFIG.title.name)}
                        errors={errors[POST_CREATE_FORM_CONFIG.title.name]}
                        name={POST_CREATE_FORM_CONFIG.title.name}
                        id={POST_CREATE_FORM_CONFIG.title.name}
                        label={POST_CREATE_FORM_CONFIG.title.label}
                        maxLength={POST_CREATE_FORM_CONFIG.title.validation.maxlength.value}
                        required
                        register={register}
                    />
                    <FormControlTextarea
                        currentValue={watch(POST_CREATE_FORM_CONFIG.description.name)}
                        errors={errors[POST_CREATE_FORM_CONFIG.description.name]}
                        name={POST_CREATE_FORM_CONFIG.description.name}
                        id={POST_CREATE_FORM_CONFIG.description.name}
                        label={POST_CREATE_FORM_CONFIG.description.label}
                        maxLength={POST_CREATE_FORM_CONFIG.description.validation.maxlength.value}
                        required
                        register={register}
                    />
                    <FormControlPhone
                        currentValue={watch(POST_CREATE_FORM_CONFIG.phone.name)}
                        errors={errors[POST_CREATE_FORM_CONFIG.phone.name]}
                        name={POST_CREATE_FORM_CONFIG.phone.name}
                        id={POST_CREATE_FORM_CONFIG.phone.name}
                        label={POST_CREATE_FORM_CONFIG.phone.label}
                        placeholder={'+7 ___ ___ __ __'}
                        trigger={trigger}
                        register={register}
                    />
                    <FormControlSelect
                        currentValue={watch(POST_CREATE_FORM_CONFIG.city.name)}
                        errors={errors[POST_CREATE_FORM_CONFIG.city.name]}
                        name={POST_CREATE_FORM_CONFIG.city.name}
                        id={POST_CREATE_FORM_CONFIG.city.name}
                        label={POST_CREATE_FORM_CONFIG.city.label}
                        options={Object.values(CITIES)}
                        required
                        register={register}
                    />
                    <FormControlFileInput
                        onChangeImage={onImageSelect}
                    />
                    <input
                        className={'action-button'}
                        type={'submit'}
                        value={'Подать'}
                    />
                </form>
            </div>
        </div>
    );
};

export default observer(NewPost);
