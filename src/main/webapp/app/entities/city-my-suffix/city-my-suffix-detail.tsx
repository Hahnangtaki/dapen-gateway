import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './city-my-suffix.reducer';
import { ICityMySuffix } from 'app/shared/model/city-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CityMySuffixDetail = (props: ICityMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cityEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="dapenApp.city.detail.title">City</Translate> [<b>{cityEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cityCode">
              <Translate contentKey="dapenApp.city.cityCode">City Code</Translate>
            </span>
          </dt>
          <dd>{cityEntity.cityCode}</dd>
          <dt>
            <span id="cityName">
              <Translate contentKey="dapenApp.city.cityName">City Name</Translate>
            </span>
          </dt>
          <dd>{cityEntity.cityName}</dd>
          <dt>
            <Translate contentKey="dapenApp.city.province">Province</Translate>
          </dt>
          <dd>{cityEntity.provinceId ? cityEntity.provinceId : ''}</dd>
        </dl>
        <Button tag={Link} to="/city-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/city-my-suffix/${cityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ city }: IRootState) => ({
  cityEntity: city.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CityMySuffixDetail);
