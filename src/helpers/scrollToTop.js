import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * При переходе между страницами приложения
 * необходимо выполнять скроллинг к верху страницы
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => window.scrollTo(0, 0), [pathname]);
    return null;
};

export default ScrollToTop;
