import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './serial-generator-my-suffix.reducer';
import { ISerialGeneratorMySuffix } from 'app/shared/model/serial-generator-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISerialGeneratorMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SerialGeneratorMySuffixUpdate = (props: ISerialGeneratorMySuffixUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { serialGeneratorEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/serial-generator-my-suffix');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...serialGeneratorEntity,
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
          <h2 id="dapenApp.serialGenerator.home.createOrEditLabel">
            <Translate contentKey="dapenApp.serialGenerator.home.createOrEditLabel">Create or edit a SerialGenerator</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : serialGeneratorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="serial-generator-my-suffix-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="serial-generator-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="processCodeLabel" for="serial-generator-my-suffix-processCode">
                  <Translate contentKey="dapenApp.serialGenerator.processCode">Process Code</Translate>
                </Label>
                <AvField
                  id="serial-generator-my-suffix-processCode"
                  type="text"
                  name="processCode"
                  validate={{
                    maxLength: { value: 1, errorMessage: translate('entity.validation.maxlength', { max: 1 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="processNameLabel" for="serial-generator-my-suffix-processName">
                  <Translate contentKey="dapenApp.serialGenerator.processName">Process Name</Translate>
                </Label>
                <AvField id="serial-generator-my-suffix-processName" type="text" name="processName" />
              </AvGroup>
              <AvGroup>
                <Label id="counterLabel" for="serial-generator-my-suffix-counter">
                  <Translate contentKey="dapenApp.serialGenerator.counter">Counter</Translate>
                </Label>
                <AvField id="serial-generator-my-suffix-counter" type="string" className="form-control" name="counter" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/serial-generator-my-suffix" replace color="info">
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
  serialGeneratorEntity: storeState.serialGenerator.entity,
  loading: storeState.serialGenerator.loading,
  updating: storeState.serialGenerator.updating,
  updateSuccess: storeState.serialGenerator.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SerialGeneratorMySuffixUpdate);
