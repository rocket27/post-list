import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import Select from 'react-select/src/Select';
import * as yup from "yup";
import { POST_LIST_LOCAL_STORAGE_VALUE } from '../../config/constants';
import { POST_CREATE_FORM_CONFIG } from '../../config/postCreateFormConfig';
import { getLocalStorageItem, setLocalStorageItem } from '../../helpers/utils';
import FormControlInput from '../formControlInput/formControlInput';
import { v4 as uuidv4 } from 'uuid';

const NewPost = () => {
    const history = useHistory();

    /**
     * Схема валидации формы создания объявления
     */
    const formSchema = yup.object().shape({
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
    });

    /**
     * Конфигурация для работы с формой
     */
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(formSchema),
    });

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    /**
     * Создаем новое объявление, добавляем уникальный идентификатор
     * для управления записью и преходим в список объявлений
     * @param data
     */
    const CreatePost = (data) => {
        const newPost = {
            id: uuidv4(),
            ...data,
        };
        const postList = getLocalStorageItem(POST_LIST_LOCAL_STORAGE_VALUE);
        if (!postList) {
            setLocalStorageItem(POST_LIST_LOCAL_STORAGE_VALUE, [newPost]);
        } else {
            postList.push(newPost);
            setLocalStorageItem(POST_LIST_LOCAL_STORAGE_VALUE, postList);
        }
        history.push('/');
    }

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
                        register={register}
                        required
                        type={'text'}
                    />
                    <FormControlInput
                        currentValue={watch(POST_CREATE_FORM_CONFIG.description.name)}
                        errors={errors[POST_CREATE_FORM_CONFIG.description.name]}
                        name={POST_CREATE_FORM_CONFIG.description.name}
                        id={POST_CREATE_FORM_CONFIG.description.name}
                        label={POST_CREATE_FORM_CONFIG.description.label}
                        maxLength={POST_CREATE_FORM_CONFIG.description.validation.maxlength.value}
                        register={register}
                        required
                        textarea
                    />
                    <FormControlInput
                        currentValue={watch(POST_CREATE_FORM_CONFIG.phone.name)}
                        errors={errors[POST_CREATE_FORM_CONFIG.phone.name]}
                        name={POST_CREATE_FORM_CONFIG.phone.name}
                        id={POST_CREATE_FORM_CONFIG.phone.name}
                        label={POST_CREATE_FORM_CONFIG.phone.label}
                        placeholder={'+7 ___ ___ __ __'}
                        register={register}
                        required
                        type={'tel'}
                    />
                    <Select options={options}/>
                    <input type="submit" value={'send'}/>
                </form>
            </div>
        </div>
    );
};

export default NewPost;
