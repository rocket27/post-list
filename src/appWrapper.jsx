import React from 'react';

const AppWrapper = ({ children }) => {
    return (
        <div className={'container'}>
            {children}
        </div>
    );
};

export default AppWrapper;
