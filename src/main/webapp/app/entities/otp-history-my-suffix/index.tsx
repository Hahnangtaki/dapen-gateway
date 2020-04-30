import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OtpHistoryMySuffix from './otp-history-my-suffix';
import OtpHistoryMySuffixDetail from './otp-history-my-suffix-detail';
import OtpHistoryMySuffixUpdate from './otp-history-my-suffix-update';
import OtpHistoryMySuffixDeleteDialog from './otp-history-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OtpHistoryMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OtpHistoryMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OtpHistoryMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OtpHistoryMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={OtpHistoryMySuffix} />
    </Switch>
  </>
);

export default Routes;
