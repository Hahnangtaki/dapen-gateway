import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './serial-generator-my-suffix.reducer';
import { ISerialGeneratorMySuffix } from 'app/shared/model/serial-generator-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISerialGeneratorMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SerialGeneratorMySuffix = (props: ISerialGeneratorMySuffixProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { serialGeneratorList, match, loading } = props;
  return (
    <div>
      <h2 id="serial-generator-my-suffix-heading">
        <Translate contentKey="dapenApp.serialGenerator.home.title">Serial Generators</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="dapenApp.serialGenerator.home.createLabel">Create new Serial Generator</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {serialGeneratorList && serialGeneratorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.serialGenerator.processCode">Process Code</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.serialGenerator.processName">Process Name</Translate>
                </th>
                <th>
                  <Translate contentKey="dapenApp.serialGenerator.counter">Counter</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {serialGeneratorList.map((serialGenerator, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${serialGenerator.id}`} color="link" size="sm">
                      {serialGenerator.id}
                    </Button>
                  </td>
                  <td>{serialGenerator.processCode}</td>
                  <td>{serialGenerator.processName}</td>
                  <td>{serialGenerator.counter}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${serialGenerator.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${serialGenerator.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${serialGenerator.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="dapenApp.serialGenerator.home.notFound">No Serial Generators found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ serialGenerator }: IRootState) => ({
  serialGeneratorList: serialGenerator.entities,
  loading: serialGenerator.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SerialGeneratorMySuffix);
