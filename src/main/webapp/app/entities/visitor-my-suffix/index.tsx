import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VisitorMySuffix from './visitor-my-suffix';
import VisitorMySuffixDetail from './visitor-my-suffix-detail';
import VisitorMySuffixUpdate from './visitor-my-suffix-update';
import VisitorMySuffixDeleteDialog from './visitor-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VisitorMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VisitorMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VisitorMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VisitorMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={VisitorMySuffix} />
    </Switch>
  </>
);

export default Routes;
