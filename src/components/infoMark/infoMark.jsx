import React from 'react';
import classNames from 'classnames';
import { MARK_TYPES } from '../../enums/markTypes';
import './infoMark.scss';

const InfoMark = ({ content, maxLength, required, type }) => {
    return (
        <small
            className={classNames(
                'info-mark', {
                    'info-mark--primary': type === MARK_TYPES.PRIMARY,
                    'info-mark--warning': type === MARK_TYPES.WARNING,
                    'info-mark--success': type === MARK_TYPES.SUCCESS,
                }
            )}
        >
            {
                (required || maxLength) &&
                <>
                    {
                        required && <span>Обязательное поле</span>
                    }
                    {
                        maxLength &&  <span>Не более {maxLength} символов</span>
                    }
                </>
            }
            {
                !required && !maxLength && content && <span>{content}</span>
            }
        </small>
    );
};

export default InfoMark;
