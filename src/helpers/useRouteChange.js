import { useHistory } from 'react-router-dom';

/**
 * Перейти по указанному пути.
 * @param path
 */
const UseRouteChange = (path) => {
    const history = useHistory();
    history.push(path);
}

export default UseRouteChange;
