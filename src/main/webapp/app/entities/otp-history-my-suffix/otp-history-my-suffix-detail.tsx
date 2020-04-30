import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './otp-history-my-suffix.reducer';
import { IOtpHistoryMySuffix } from 'app/shared/model/otp-history-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOtpHistoryMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OtpHistoryMySuffixDetail = (props: IOtpHistoryMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { otpHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="dapenApp.otpHistory.detail.title">OtpHistory</Translate> [<b>{otpHistoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reffNo">
              <Translate contentKey="dapenApp.otpHistory.reffNo">Reff No</Translate>
            </span>
          </dt>
          <dd>{otpHistoryEntity.reffNo}</dd>
          <dt>
            <span id="encodedOtp">
              <Translate contentKey="dapenApp.otpHistory.encodedOtp">Encoded Otp</Translate>
            </span>
          </dt>
          <dd>{otpHistoryEntity.encodedOtp}</dd>
          <dt>
            <span id="createdTime">
              <Translate contentKey="dapenApp.otpHistory.createdTime">Created Time</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={otpHistoryEntity.createdTime} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="executedTime">
              <Translate contentKey="dapenApp.otpHistory.executedTime">Executed Time</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={otpHistoryEntity.executedTime} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="expiredTime">
              <Translate contentKey="dapenApp.otpHistory.expiredTime">Expired Time</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={otpHistoryEntity.expiredTime} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="retryMax">
              <Translate contentKey="dapenApp.otpHistory.retryMax">Retry Max</Translate>
            </span>
          </dt>
          <dd>{otpHistoryEntity.retryMax}</dd>
          <dt>
            <span id="retryCount">
              <Translate contentKey="dapenApp.otpHistory.retryCount">Retry Count</Translate>
            </span>
          </dt>
          <dd>{otpHistoryEntity.retryCount}</dd>
          <dt>
            <Translate contentKey="dapenApp.otpHistory.visitor">Visitor</Translate>
          </dt>
          <dd>{otpHistoryEntity.visitorId ? otpHistoryEntity.visitorId : ''}</dd>
        </dl>
        <Button tag={Link} to="/otp-history-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/otp-history-my-suffix/${otpHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ otpHistory }: IRootState) => ({
  otpHistoryEntity: otpHistory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OtpHistoryMySuffixDetail);
