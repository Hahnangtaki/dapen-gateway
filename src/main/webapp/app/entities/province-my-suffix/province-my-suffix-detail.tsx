import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './province-my-suffix.reducer';
import { IProvinceMySuffix } from 'app/shared/model/province-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProvinceMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProvinceMySuffixDetail = (props: IProvinceMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { provinceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="dapenApp.province.detail.title">Province</Translate> [<b>{provinceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="provinceCode">
              <Translate contentKey="dapenApp.province.provinceCode">Province Code</Translate>
            </span>
          </dt>
          <dd>{provinceEntity.provinceCode}</dd>
          <dt>
            <span id="provinceName">
              <Translate contentKey="dapenApp.province.provinceName">Province Name</Translate>
            </span>
          </dt>
          <dd>{provinceEntity.provinceName}</dd>
          <dt>
            <Translate contentKey="dapenApp.province.country">Country</Translate>
          </dt>
          <dd>{provinceEntity.countryId ? provinceEntity.countryId : ''}</dd>
        </dl>
        <Button tag={Link} to="/province-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/province-my-suffix/${provinceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ province }: IRootState) => ({
  provinceEntity: province.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProvinceMySuffixDetail);
