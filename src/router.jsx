import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './app';
import AppWrapper from './appWrapper';
import ScrollToTop from './helpers/scrollToTop';

const AppRouter = () => {
    // const NewComponent = React.lazy(() => import('../'));

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
                                component={App}
                            />
                        </Switch>
                    </AppWrapper>
                </Switch>
            </React.Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;
