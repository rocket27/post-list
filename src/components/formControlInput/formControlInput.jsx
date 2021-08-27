import React from 'react';
import { ReactSVG } from 'react-svg';
import { FORM_ERRORS } from '../../enums/formErrorTypes';
import { MARK_TYPES } from '../../enums/markTypes';
import InfoMark from '../infoMark/infoMark';
import helpIcon from '../../assets/images/svg/help.svg'
import successIcon from '../../assets/images/svg/success.svg'
import errorIcon from '../../assets/images/svg/error.svg'

const FormControlInput = ({ currentValue, errors, name, id, label, register, required, maxlength, type }) => {
    window.console.log(errors); // Todo: do not forget to remove!
    return (
        <section className={'form-control'}>
            <label htmlFor={id} className={'form-control__label'}>{label}</label>
            <div className={'form-control__inner'}>
                <div className={'form-control__input-wrapper'}>
                    <input type={type} id={id} { ...register(name, { required, maxlength }) } />
                </div>
                <div className={'form-control__info'}>
                    <ReactSVG
                        src={errors
                            ? errorIcon
                            : currentValue && !errors
                                ? successIcon
                                : helpIcon
                        }
                    />
                    <div className={'form-control__info-labels'}>
                        {
                            !errors && currentValue && <InfoMark title={'Заполнено'} type={MARK_TYPES.SUCCESS}/>
                        }
                        {
                            !currentValue && required && !errors && <InfoMark title={'Обязательное поле'} type={MARK_TYPES.PRIMARY}/>
                        }
                        {
                            !currentValue && maxlength && !errors && <InfoMark title={`Не более ${maxlength} символов`} type={MARK_TYPES.PRIMARY}/>
                        }
                        {
                            errors && errors.type === FORM_ERRORS.REQUIRED && <InfoMark title={'Заполните поле'} type={MARK_TYPES.WARNING}/>
                        },
                        {
                            maxlength && errors && errors.type === FORM_ERRORS.MAX_LENGTH && <InfoMark title={`Не более ${maxlength} символов`} type={MARK_TYPES.WARNING}/>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormControlInput;
