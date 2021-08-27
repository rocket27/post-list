import React from 'react';
import classNames from 'classnames';
import { MARK_TYPES } from '../../enums/markTypes';
import './infoMark.scss';

const InfoMark = ({ title, type }) => {
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
            {title}
        </small>
    );
};

export default InfoMark;
