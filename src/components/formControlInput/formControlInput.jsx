import classNames from 'classnames';
import React from 'react';
import { ReactSVG } from 'react-svg';
import { MARK_TYPES } from '../../enums/markTypes';
import InfoMark from '../infoMark/infoMark';
import helpIcon from '../../assets/images/svg/help.svg';
import successIcon from '../../assets/images/svg/success.svg';
import errorIcon from '../../assets/images/svg/error.svg';

const FormControlInput = ({ currentValue, errors, name, id, label, maxLength, placeholder, register, required }) => {
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
                    <input
                        type={'text'}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        { ...register(name) }
                    />
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
                            <InfoMark
                                required={required}
                                maxLength={maxLength}
                                type={MARK_TYPES.PRIMARY}
                            />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormControlInput;
