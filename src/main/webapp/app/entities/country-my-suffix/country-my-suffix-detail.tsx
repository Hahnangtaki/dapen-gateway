import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './country-my-suffix.reducer';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryMySuffixDetail = (props: ICountryMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { countryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="dapenApp.country.detail.title">Country</Translate> [<b>{countryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="countryCodeDigits">
              <Translate contentKey="dapenApp.country.countryCodeDigits">Country Code Digits</Translate>
            </span>
          </dt>
          <dd>{countryEntity.countryCodeDigits}</dd>
          <dt>
            <span id="countryName">
              <Translate contentKey="dapenApp.country.countryName">Country Name</Translate>
            </span>
          </dt>
          <dd>{countryEntity.countryName}</dd>
          <dt>
            <span id="nationality">
              <Translate contentKey="dapenApp.country.nationality">Nationality</Translate>
            </span>
          </dt>
          <dd>{countryEntity.nationality}</dd>
        </dl>
        <Button tag={Link} to="/country-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/country-my-suffix/${countryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ country }: IRootState) => ({
  countryEntity: country.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryMySuffixDetail);
