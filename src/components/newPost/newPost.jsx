import React from 'react';
import { useForm } from 'react-hook-form';
import FormControlInput from '../formControlInput/formControlInput';

const NewPost = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onBlur',
    });
    const onSubmit = (data) => console.log(data);

    return (
        <div className={'new-post'}>
            <div className={'container'}>
                <h1 className={'title'}>Подать объявление</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControlInput
                        currentValue={watch('title')}
                        errors={errors.title}
                        name={'title'}
                        id={'title'}
                        label={'Заголовок'}
                        register={register}
                        maxlength={4}
                        required
                        type={'text'}
                    />
                    <input type="submit" value={'send'}/>
                </form>
            </div>
        </div>
    );
};

export default NewPost;
