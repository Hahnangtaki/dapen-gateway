import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './serial-generator-my-suffix.reducer';
import { ISerialGeneratorMySuffix } from 'app/shared/model/serial-generator-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISerialGeneratorMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SerialGeneratorMySuffixDetail = (props: ISerialGeneratorMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { serialGeneratorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="dapenApp.serialGenerator.detail.title">SerialGenerator</Translate> [<b>{serialGeneratorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="processCode">
              <Translate contentKey="dapenApp.serialGenerator.processCode">Process Code</Translate>
            </span>
          </dt>
          <dd>{serialGeneratorEntity.processCode}</dd>
          <dt>
            <span id="processName">
              <Translate contentKey="dapenApp.serialGenerator.processName">Process Name</Translate>
            </span>
          </dt>
          <dd>{serialGeneratorEntity.processName}</dd>
          <dt>
            <span id="counter">
              <Translate contentKey="dapenApp.serialGenerator.counter">Counter</Translate>
            </span>
          </dt>
          <dd>{serialGeneratorEntity.counter}</dd>
        </dl>
        <Button tag={Link} to="/serial-generator-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/serial-generator-my-suffix/${serialGeneratorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ serialGenerator }: IRootState) => ({
  serialGeneratorEntity: serialGenerator.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SerialGeneratorMySuffixDetail);
