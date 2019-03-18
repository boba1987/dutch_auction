import React from 'react'
import { isLoggedIn } from '../../services/AuthService';
import {Redirect, Route, RouteProps} from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
    authenticationPath: string;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        let redirectPath: string = '';
        if (!isLoggedIn()) {
            redirectPath = this.props.authenticationPath;
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