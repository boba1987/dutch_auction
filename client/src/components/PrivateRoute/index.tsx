import React from 'react'
import {Redirect, Route, RouteProps} from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
    isLoggedIn: boolean
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        let redirectPath: string = '';
        if (!this.props.isLoggedIn) {
            redirectPath = '/login';
        }

        if (redirectPath) {
            const renderComponent = () => (<Redirect to={{pathname: redirectPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        } else {
            return <Route {...this.props}/>;
        }
    }
}

export default ProtectedRoute;