import classNames from 'classnames';
import React from 'react';
import { ReactSVG } from 'react-svg';
import errorIcon from '../../assets/images/svg/error.svg';
import helpIcon from '../../assets/images/svg/help.svg';
import successIcon from '../../assets/images/svg/success.svg';
import { MARK_TYPES } from '../../enums/markTypes';
import InfoMark from '../infoMark/infoMark';


const FormControlSelect = React.forwardRef(({ currentValue, errors, id, label, name, options, register }, ref) => {
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
                        ref={ref}
                        defaultValue
                    >
                        <option disabled value>Выберите город</option>
                        {
                            options.map((option) => {
                                return (
                                    <option
                                        key={option.id}
                                        value={option.name}
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
                            <InfoMark
                                type={MARK_TYPES.PRIMARY}
                            />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
});

export default FormControlSelect;
