import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SerialGeneratorMySuffix from './serial-generator-my-suffix';
import SerialGeneratorMySuffixDetail from './serial-generator-my-suffix-detail';
import SerialGeneratorMySuffixUpdate from './serial-generator-my-suffix-update';
import SerialGeneratorMySuffixDeleteDialog from './serial-generator-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SerialGeneratorMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SerialGeneratorMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SerialGeneratorMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SerialGeneratorMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={SerialGeneratorMySuffix} />
    </Switch>
  </>
);

export default Routes;
