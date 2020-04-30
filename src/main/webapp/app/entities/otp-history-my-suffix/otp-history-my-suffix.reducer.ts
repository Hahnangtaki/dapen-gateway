import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOtpHistoryMySuffix, defaultValue } from 'app/shared/model/otp-history-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_OTPHISTORY_LIST: 'otpHistory/FETCH_OTPHISTORY_LIST',
  FETCH_OTPHISTORY: 'otpHistory/FETCH_OTPHISTORY',
  CREATE_OTPHISTORY: 'otpHistory/CREATE_OTPHISTORY',
  UPDATE_OTPHISTORY: 'otpHistory/UPDATE_OTPHISTORY',
  DELETE_OTPHISTORY: 'otpHistory/DELETE_OTPHISTORY',
  RESET: 'otpHistory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOtpHistoryMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type OtpHistoryMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: OtpHistoryMySuffixState = initialState, action): OtpHistoryMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OTPHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OTPHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_OTPHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_OTPHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_OTPHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_OTPHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OTPHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_OTPHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_OTPHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_OTPHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_OTPHISTORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_OTPHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_OTPHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_OTPHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_OTPHISTORY):
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

const apiUrl = 'api/otp-histories';

// Actions

export const getEntities: ICrudGetAllAction<IOtpHistoryMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_OTPHISTORY_LIST,
  payload: axios.get<IOtpHistoryMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IOtpHistoryMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OTPHISTORY,
    payload: axios.get<IOtpHistoryMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOtpHistoryMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OTPHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOtpHistoryMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OTPHISTORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOtpHistoryMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OTPHISTORY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
