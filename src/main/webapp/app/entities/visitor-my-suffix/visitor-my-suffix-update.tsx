import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './visitor-my-suffix.reducer';
import { IVisitorMySuffix } from 'app/shared/model/visitor-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVisitorMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisitorMySuffixUpdate = (props: IVisitorMySuffixUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { visitorEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/visitor-my-suffix');
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
        ...visitorEntity,
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
          <h2 id="dapenApp.visitor.home.createOrEditLabel">
            <Translate contentKey="dapenApp.visitor.home.createOrEditLabel">Create or edit a Visitor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : visitorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="visitor-my-suffix-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="visitor-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="emailLabel" for="visitor-my-suffix-email">
                  <Translate contentKey="dapenApp.visitor.email">Email</Translate>
                </Label>
                <AvField
                  id="visitor-my-suffix-email"
                  type="text"
                  name="email"
                  validate={{
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mobilePhoneLabel" for="visitor-my-suffix-mobilePhone">
                  <Translate contentKey="dapenApp.visitor.mobilePhone">Mobile Phone</Translate>
                </Label>
                <AvField
                  id="visitor-my-suffix-mobilePhone"
                  type="text"
                  name="mobilePhone"
                  validate={{
                    maxLength: { value: 14, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="encodedPasswordLabel" for="visitor-my-suffix-encodedPassword">
                  <Translate contentKey="dapenApp.visitor.encodedPassword">Encoded Password</Translate>
                </Label>
                <AvField
                  id="visitor-my-suffix-encodedPassword"
                  type="text"
                  name="encodedPassword"
                  validate={{
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="memberStatusLabel" for="visitor-my-suffix-memberStatus">
                  <Translate contentKey="dapenApp.visitor.memberStatus">Member Status</Translate>
                </Label>
                <AvField id="visitor-my-suffix-memberStatus" type="string" className="form-control" name="memberStatus" />
              </AvGroup>
              <AvGroup>
                <Label id="memberSinceLabel" for="visitor-my-suffix-memberSince">
                  <Translate contentKey="dapenApp.visitor.memberSince">Member Since</Translate>
                </Label>
                <AvField id="visitor-my-suffix-memberSince" type="date" className="form-control" name="memberSince" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/visitor-my-suffix" replace color="info">
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
  visitorEntity: storeState.visitor.entity,
  loading: storeState.visitor.loading,
  updating: storeState.visitor.updating,
  updateSuccess: storeState.visitor.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisitorMySuffixUpdate);
