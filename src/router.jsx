import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppWrapper from './appWrapper';
import PostList from './components/postList/postList';
import ScrollToTop from './helpers/scrollToTop';

const AppRouter = () => {
    const NewPost = React.lazy(() => import('./components/newPost/newPost'));

    return (
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
    );
};

export default AppRouter;