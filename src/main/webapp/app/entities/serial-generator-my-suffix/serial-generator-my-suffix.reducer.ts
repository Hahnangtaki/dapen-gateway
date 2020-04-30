import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISerialGeneratorMySuffix, defaultValue } from 'app/shared/model/serial-generator-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_SERIALGENERATOR_LIST: 'serialGenerator/FETCH_SERIALGENERATOR_LIST',
  FETCH_SERIALGENERATOR: 'serialGenerator/FETCH_SERIALGENERATOR',
  CREATE_SERIALGENERATOR: 'serialGenerator/CREATE_SERIALGENERATOR',
  UPDATE_SERIALGENERATOR: 'serialGenerator/UPDATE_SERIALGENERATOR',
  DELETE_SERIALGENERATOR: 'serialGenerator/DELETE_SERIALGENERATOR',
  RESET: 'serialGenerator/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISerialGeneratorMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SerialGeneratorMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: SerialGeneratorMySuffixState = initialState, action): SerialGeneratorMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SERIALGENERATOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SERIALGENERATOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SERIALGENERATOR):
    case REQUEST(ACTION_TYPES.UPDATE_SERIALGENERATOR):
    case REQUEST(ACTION_TYPES.DELETE_SERIALGENERATOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SERIALGENERATOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SERIALGENERATOR):
    case FAILURE(ACTION_TYPES.CREATE_SERIALGENERATOR):
    case FAILURE(ACTION_TYPES.UPDATE_SERIALGENERATOR):
    case FAILURE(ACTION_TYPES.DELETE_SERIALGENERATOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERIALGENERATOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERIALGENERATOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SERIALGENERATOR):
    case SUCCESS(ACTION_TYPES.UPDATE_SERIALGENERATOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SERIALGENERATOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/serial-generators';

// Actions

export const getEntities: ICrudGetAllAction<ISerialGeneratorMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SERIALGENERATOR_LIST,
  payload: axios.get<ISerialGeneratorMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISerialGeneratorMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SERIALGENERATOR,
    payload: axios.get<ISerialGeneratorMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISerialGeneratorMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SERIALGENERATOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISerialGeneratorMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SERIALGENERATOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISerialGeneratorMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SERIALGENERATOR,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
