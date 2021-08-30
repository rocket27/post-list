import classNames from 'classnames';
import React from 'react';
import { ReactSVG } from 'react-svg';
import errorIcon from '../../assets/images/svg/error.svg';
import helpIcon from '../../assets/images/svg/help.svg';
import successIcon from '../../assets/images/svg/success.svg';
import { POST_CREATE_FORM_CONFIG } from '../../config/postCreateFormConfig';
import { MARK_TYPES } from '../../enums/markTypes';
import InfoMark from '../infoMark/infoMark';


const FormControlSelect = ({ currentValue, errors, id, label, name, options, register }) => {
    return (
        <section className={'form-control'}>
            {
                label && <label htmlFor={id} className={'form-control__label'}>{label}</label>
            }
            <div className={'form-control__inner'}>
                <div className={classNames(
                    'form-control__input-wrapper', {
                        'form-control__input-wrapper--error': errors,
                    },
                )}>
                    <select
                        id={id}
                        name={name}
                        defaultValue={''}
                        { ...register(POST_CREATE_FORM_CONFIG.city.name) }
                    >
                        <option disabled value={''}>Выберите город</option>
                        {
                            options.map((option) => {
                                return (
                                    <option
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.name}
                                    </option>
                                );
                            })
                        }
                    </select>
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
                            !errors && currentValue && <InfoMark content={'Заполнено'} type={MARK_TYPES.SUCCESS}/>
                        }
                        {
                            errors && <InfoMark content={errors.message} type={MARK_TYPES.WARNING}/>
                        }
                        {
                            !currentValue && !errors &&
                            <InfoMark content={'Обязательное поле'} type={MARK_TYPES.PRIMARY}/>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormControlSelect;
