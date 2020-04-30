import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CityMySuffix from './city-my-suffix';
import CityMySuffixDetail from './city-my-suffix-detail';
import CityMySuffixUpdate from './city-my-suffix-update';
import CityMySuffixDeleteDialog from './city-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CityMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CityMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CityMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CityMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={CityMySuffix} />
    </Switch>
  </>
);

export default Routes;
