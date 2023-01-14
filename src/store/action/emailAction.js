import {
  FAVORITE_UP,
  GET_ALL_EMAIL_FAILED,
  GET_ALL_EMAIL_RECEIVED,
  GET_ALL_EMAIL_REQUEST,
  GET_SINGLE_EMAIL_FAILED,
  GET_SINGLE_EMAIL_RECEIVED,
  GET_SINGLE_EMAIL_REQUEST,
  MARK_FAVORITE,
  MARK_UNFAVORITE,
  READ_UP,
  UNREAD_UP,
} from "../constant/emailConstants";

export const getAllEmail = (data) => {
  return { type: GET_ALL_EMAIL_REQUEST , payload:data};
};

export const getAllEmailSuccess = (data) => {
  return { type: GET_ALL_EMAIL_RECEIVED, payload: data };
};

export const getAllEmailFailed = (data) => {
  return { type: GET_ALL_EMAIL_FAILED, payload: data };
};

export const markFavorite = (data) => {
  return { type: MARK_FAVORITE, payload: data };
};
export const markUnFavorite = (data) => {
  return { type: MARK_UNFAVORITE, payload: data };
};

export const getSingleEmail = (data) => {
  return { type: GET_SINGLE_EMAIL_REQUEST, payload: data };
};
export const getSingleEmailSuccess = (data) => {
  return { type: GET_SINGLE_EMAIL_RECEIVED, payload: data };
};
export const getSingleEmailFailed = (data) => {
  return { type: GET_SINGLE_EMAIL_FAILED, payload: data };
};



export const readUp = () => {
  return { type: READ_UP };
};
export const unReadUp = () => {
  return { type: UNREAD_UP };
};
export const favoriteUp = () => {
  return { type: FAVORITE_UP };
};