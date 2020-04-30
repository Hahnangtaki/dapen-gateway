import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './visitor-my-suffix.reducer';
import { IVisitorMySuffix } from 'app/shared/model/visitor-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVisitorMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VisitorMySuffix = (props: IVisitorMySuffixProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { visitorList, match, loading } = props;
  return (
    <div>
      <h2 id="visitor-my-suffix-heading">
        <Translate contentKey="dapenApp.visitor.home.title">Visitors</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="dapenApp.visitor.home.createLabel">Create new Visitor</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {visitorList && visitorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.visitor.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.visitor.mobilePhone">Mobile Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.visitor.encodedPassword">Encoded Password</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.visitor.memberStatus">Member Status</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.visitor.memberSince">Member Since</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visitorList.map((visitor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${visitor.id}`} color="link" size="sm">
                      {visitor.id}
                    </Button>
                  </td>
                  <td>{visitor.email}</td>
                  <td>{visitor.mobilePhone}</td>
                  <td>{visitor.encodedPassword}</td>
                  <td>{visitor.memberStatus}</td>
                  <td>
                    <TextFormat type="date" value={visitor.memberSince} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${visitor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${visitor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${visitor.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="dapenApp.visitor.home.notFound">No Visitors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ visitor }: IRootState) => ({
  visitorList: visitor.entities,
  loading: visitor.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisitorMySuffix);
