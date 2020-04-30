import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CountryMySuffix from './country-my-suffix';
import ProvinceMySuffix from './province-my-suffix';
import CityMySuffix from './city-my-suffix';
import VisitorMySuffix from './visitor-my-suffix';
import OtpHistoryMySuffix from './otp-history-my-suffix';
import SerialGeneratorMySuffix from './serial-generator-my-suffix';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}country-my-suffix`} component={CountryMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}province-my-suffix`} component={ProvinceMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}city-my-suffix`} component={CityMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}visitor-my-suffix`} component={VisitorMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}otp-history-my-suffix`} component={OtpHistoryMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}serial-generator-my-suffix`} component={SerialGeneratorMySuffix} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
