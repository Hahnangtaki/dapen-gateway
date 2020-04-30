import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProvinceMySuffix } from 'app/shared/model/province-my-suffix.model';
import { getEntities as getProvinces } from 'app/entities/province-my-suffix/province-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './city-my-suffix.reducer';
import { ICityMySuffix } from 'app/shared/model/city-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICityMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CityMySuffixUpdate = (props: ICityMySuffixUpdateProps) => {
  const [provinceId, setProvinceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { cityEntity, provinces, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/city-my-suffix');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProvinces();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...cityEntity,
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
          <h2 id="dapenApp.city.home.createOrEditLabel">
            <Translate contentKey="dapenApp.city.home.createOrEditLabel">Create or edit a City</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : cityEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="city-my-suffix-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="city-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cityCodeLabel" for="city-my-suffix-cityCode">
                  <Translate contentKey="dapenApp.city.cityCode">City Code</Translate>
                </Label>
                <AvField id="city-my-suffix-cityCode" type="text" name="cityCode" />
              </AvGroup>
              <AvGroup>
                <Label id="cityNameLabel" for="city-my-suffix-cityName">
                  <Translate contentKey="dapenApp.city.cityName">City Name</Translate>
                </Label>
                <AvField id="city-my-suffix-cityName" type="text" name="cityName" />
              </AvGroup>
              <AvGroup>
                <Label for="city-my-suffix-province">
                  <Translate contentKey="dapenApp.city.province">Province</Translate>
                </Label>
                <AvInput id="city-my-suffix-province" type="select" className="form-control" name="provinceId">
                  <option value="" key="0" />
                  {provinces
                    ? provinces.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/city-my-suffix" replace color="info">
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
  provinces: storeState.province.entities,
  cityEntity: storeState.city.entity,
  loading: storeState.city.loading,
  updating: storeState.city.updating,
  updateSuccess: storeState.city.updateSuccess
});

const mapDispatchToProps = {
  getProvinces,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CityMySuffixUpdate);
