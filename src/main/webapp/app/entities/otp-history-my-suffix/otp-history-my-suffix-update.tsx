import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVisitorMySuffix } from 'app/shared/model/visitor-my-suffix.model';
import { getEntities as getVisitors } from 'app/entities/visitor-my-suffix/visitor-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './otp-history-my-suffix.reducer';
import { IOtpHistoryMySuffix } from 'app/shared/model/otp-history-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOtpHistoryMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OtpHistoryMySuffixUpdate = (props: IOtpHistoryMySuffixUpdateProps) => {
  const [visitorId, setVisitorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { otpHistoryEntity, visitors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/otp-history-my-suffix');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVisitors();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdTime = convertDateTimeToServer(values.createdTime);
    values.executedTime = convertDateTimeToServer(values.executedTime);
    values.expiredTime = convertDateTimeToServer(values.expiredTime);

    if (errors.length === 0) {
      const entity = {
        ...otpHistoryEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="dapenApp.otpHistory.home.createOrEditLabel">
            <Translate contentKey="dapenApp.otpHistory.home.createOrEditLabel">Create or edit a OtpHistory</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : otpHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="otp-history-my-suffix-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="otp-history-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="reffNoLabel" for="otp-history-my-suffix-reffNo">
                  <Translate contentKey="dapenApp.otpHistory.reffNo">Reff No</Translate>
                </Label>
                <AvField
                  id="otp-history-my-suffix-reffNo"
                  type="text"
                  name="reffNo"
                  validate={{
                    maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="encodedOtpLabel" for="otp-history-my-suffix-encodedOtp">
                  <Translate contentKey="dapenApp.otpHistory.encodedOtp">Encoded Otp</Translate>
                </Label>
                <AvField
                  id="otp-history-my-suffix-encodedOtp"
                  type="text"
                  name="encodedOtp"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdTimeLabel" for="otp-history-my-suffix-createdTime">
                  <Translate contentKey="dapenApp.otpHistory.createdTime">Created Time</Translate>
                </Label>
                <AvInput
                  id="otp-history-my-suffix-createdTime"
                  type="datetime-local"
                  className="form-control"
                  name="createdTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.otpHistoryEntity.createdTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="executedTimeLabel" for="otp-history-my-suffix-executedTime">
                  <Translate contentKey="dapenApp.otpHistory.executedTime">Executed Time</Translate>
                </Label>
                <AvInput
                  id="otp-history-my-suffix-executedTime"
                  type="datetime-local"
                  className="form-control"
                  name="executedTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.otpHistoryEntity.executedTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="expiredTimeLabel" for="otp-history-my-suffix-expiredTime">
                  <Translate contentKey="dapenApp.otpHistory.expiredTime">Expired Time</Translate>
                </Label>
                <AvInput
                  id="otp-history-my-suffix-expiredTime"
                  type="datetime-local"
                  className="form-control"
                  name="expiredTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.otpHistoryEntity.expiredTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="retryMaxLabel" for="otp-history-my-suffix-retryMax">
                  <Translate contentKey="dapenApp.otpHistory.retryMax">Retry Max</Translate>
                </Label>
                <AvField id="otp-history-my-suffix-retryMax" type="string" className="form-control" name="retryMax" />
              </AvGroup>
              <AvGroup>
                <Label id="retryCountLabel" for="otp-history-my-suffix-retryCount">
                  <Translate contentKey="dapenApp.otpHistory.retryCount">Retry Count</Translate>
                </Label>
                <AvField id="otp-history-my-suffix-retryCount" type="string" className="form-control" name="retryCount" />
              </AvGroup>
              <AvGroup>
                <Label for="otp-history-my-suffix-visitor">
                  <Translate contentKey="dapenApp.otpHistory.visitor">Visitor</Translate>
                </Label>
                <AvInput id="otp-history-my-suffix-visitor" type="select" className="form-control" name="visitorId">
                  <option value="" key="0" />
                  {visitors
                    ? visitors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/otp-history-my-suffix" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  visitors: storeState.visitor.entities,
  otpHistoryEntity: storeState.otpHistory.entity,
  loading: storeState.otpHistory.loading,
  updating: storeState.otpHistory.updating,
  updateSuccess: storeState.otpHistory.updateSuccess
});

const mapDispatchToProps = {
  getVisitors,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OtpHistoryMySuffixUpdate);
