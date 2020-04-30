import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './visitor-my-suffix.reducer';
import { IVisitorMySuffix } from 'app/shared/model/visitor-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVisitorMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisitorMySuffixDetail = (props: IVisitorMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { visitorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="dapenApp.visitor.detail.title">Visitor</Translate> [<b>{visitorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="email">
              <Translate contentKey="dapenApp.visitor.email">Email</Translate>
            </span>
          </dt>
          <dd>{visitorEntity.email}</dd>
          <dt>
            <span id="mobilePhone">
              <Translate contentKey="dapenApp.visitor.mobilePhone">Mobile Phone</Translate>
            </span>
          </dt>
          <dd>{visitorEntity.mobilePhone}</dd>
          <dt>
            <span id="encodedPassword">
              <Translate contentKey="dapenApp.visitor.encodedPassword">Encoded Password</Translate>
            </span>
          </dt>
          <dd>{visitorEntity.encodedPassword}</dd>
          <dt>
            <span id="memberStatus">
              <Translate contentKey="dapenApp.visitor.memberStatus">Member Status</Translate>
            </span>
          </dt>
          <dd>{visitorEntity.memberStatus}</dd>
          <dt>
            <span id="memberSince">
              <Translate contentKey="dapenApp.visitor.memberSince">Member Since</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={visitorEntity.memberSince} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/visitor-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/visitor-my-suffix/${visitorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ visitor }: IRootState) => ({
  visitorEntity: visitor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisitorMySuffixDetail);
