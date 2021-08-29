import { Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppWrapper from './appWrapper';
import PostList from './components/postList/postList';
import ScrollToTop from './helpers/scrollToTop';
import postStore from './store/postStore';

const stores = { postStore };

const AppRouter = () => {
    const NewPost = React.lazy(() => import('./components/newPost/newPost'));

    return (
        <Provider {...stores}>
            <BrowserRouter>
                <ScrollToTop/>
                <React.Suspense fallback={'Loading, please wait...'}>
                    <Switch>
                        <AppWrapper>
                            <Switch>
                                <Route
                                    exact
                                    path={'/'}
                                    component={PostList}
                                />
                                <Route
                                    exact
                                    path={'/new'}
                                    component={NewPost}
                                />
                            </Switch>
                        </AppWrapper>
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    );
};

export default AppRouter;
