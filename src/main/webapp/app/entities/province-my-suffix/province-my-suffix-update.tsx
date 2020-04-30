import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { getEntities as getCountries } from 'app/entities/country-my-suffix/country-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './province-my-suffix.reducer';
import { IProvinceMySuffix } from 'app/shared/model/province-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProvinceMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProvinceMySuffixUpdate = (props: IProvinceMySuffixUpdateProps) => {
  const [countryId, setCountryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { provinceEntity, countries, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/province-my-suffix');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCountries();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...provinceEntity,
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
          <h2 id="dapenApp.province.home.createOrEditLabel">
            <Translate contentKey="dapenApp.province.home.createOrEditLabel">Create or edit a Province</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : provinceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="province-my-suffix-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="province-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="provinceCodeLabel" for="province-my-suffix-provinceCode">
                  <Translate contentKey="dapenApp.province.provinceCode">Province Code</Translate>
                </Label>
                <AvField id="province-my-suffix-provinceCode" type="text" name="provinceCode" />
              </AvGroup>
              <AvGroup>
                <Label id="provinceNameLabel" for="province-my-suffix-provinceName">
                  <Translate contentKey="dapenApp.province.provinceName">Province Name</Translate>
                </Label>
                <AvField id="province-my-suffix-provinceName" type="text" name="provinceName" />
              </AvGroup>
              <AvGroup>
                <Label for="province-my-suffix-country">
                  <Translate contentKey="dapenApp.province.country">Country</Translate>
                </Label>
                <AvInput id="province-my-suffix-country" type="select" className="form-control" name="countryId">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/province-my-suffix" replace color="info">
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
  countries: storeState.country.entities,
  provinceEntity: storeState.province.entity,
  loading: storeState.province.loading,
  updating: storeState.province.updating,
  updateSuccess: storeState.province.updateSuccess
});

const mapDispatchToProps = {
  getCountries,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProvinceMySuffixUpdate);
