import React from 'react';
import classNames from 'classnames';
import './loader.scss';

const Loader = ({ relativePosition }) => {
    return (
        <div
            className={classNames(
                'loader', {
                    'loader--absolute-position': !relativePosition,
                    'loader--relative-position': relativePosition,
                },
            )}
        >
            <div
                className={classNames(
                    'loader__bar',
                )}
            />
        </div>
    );
};

export default Loader;
