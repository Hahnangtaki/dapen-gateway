import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './otp-history-my-suffix.reducer';
import { IOtpHistoryMySuffix } from 'app/shared/model/otp-history-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOtpHistoryMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const OtpHistoryMySuffix = (props: IOtpHistoryMySuffixProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { otpHistoryList, match, loading } = props;
  return (
    <div>
      <h2 id="otp-history-my-suffix-heading">
        <Translate contentKey="dapenApp.otpHistory.home.title">Otp Histories</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="dapenApp.otpHistory.home.createLabel">Create new Otp History</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {otpHistoryList && otpHistoryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.otpHistory.reffNo">Reff No</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.otpHistory.encodedOtp">Encoded Otp</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.otpHistory.createdTime">Created Time</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.otpHistory.executedTime">Executed Time</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.otpHistory.expiredTime">Expired Time</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.otpHistory.retryMax">Retry Max</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.otpHistory.retryCount">Retry Count</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.otpHistory.visitor">Visitor</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {otpHistoryList.map((otpHistory, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${otpHistory.id}`} color="link" size="sm">
                      {otpHistory.id}
                    </Button>
                  </td>
                  <td>{otpHistory.reffNo}</td>
                  <td>{otpHistory.encodedOtp}</td>
                  <td>
                    <TextFormat type="date" value={otpHistory.createdTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={otpHistory.executedTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={otpHistory.expiredTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{otpHistory.retryMax}</td>
                  <td>{otpHistory.retryCount}</td>
                  <td>
                    {otpHistory.visitorId ? <Link to={`visitor-my-suffix/${otpHistory.visitorId}`}>{otpHistory.visitorId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${otpHistory.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${otpHistory.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${otpHistory.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="dapenApp.otpHistory.home.notFound">No Otp Histories found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ otpHistory }: IRootState) => ({
  otpHistoryList: otpHistory.entities,
  loading: otpHistory.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OtpHistoryMySuffix);
