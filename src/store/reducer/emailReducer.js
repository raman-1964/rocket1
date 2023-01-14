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

const initialState = {
  allEmail: [],
  allEmailLoading: false,
  singleEmail: {},
  singleEmailLoading: false,
  isNextPage: true,
  isNextPageLoading: false,
};

export const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMAIL_REQUEST: {
      let obj = {};
      if (action.payload === 1) obj.allEmailLoading = true;
      else obj.isNextPageLoading = true;
      return { ...state, ...obj };
    }

    case GET_ALL_EMAIL_RECEIVED: {
      let obj = {};
      if (action.payload.page === 1) {
        obj.allEmailLoading = false;
        const allMails = action.payload.data.map((mail) => {
          return { ...mail, isRead: false, isFavorite: false };
        });
        obj.allEmail = [...allMails];
      } else {
        obj.isNextPageLoading = false;
        const allMails = action.payload.data.map((mail) => {
          return { ...mail, isRead: false, isFavorite: false };
        });
        obj.allEmail = [...state.allEmail, ...allMails];
      }
      return {
        ...state,
        isNextPage: action.payload.next,
        ...obj,
      };
    }

    case GET_ALL_EMAIL_FAILED:
      return { ...state, allEmailLoading: false };

    case GET_SINGLE_EMAIL_REQUEST:
      return { ...state, singleEmailLoading: true };

    case GET_SINGLE_EMAIL_RECEIVED: {
      const allMails = state.allEmail.map((mail) => {
        if (mail.id === action.payload.id) return { ...mail, isRead: true };
        return mail;
      });
      return {
        ...state,
        singleEmail: action.payload,
        allEmail: allMails,
        singleEmailLoading: false,
      };
    }

    case GET_SINGLE_EMAIL_FAILED:
      return { ...state, singleEmailLoading: false };

    case MARK_FAVORITE: {
      const allMails = state.allEmail.map((mail) => {
        if (mail.id === action.payload) return { ...mail, isFavorite: true };
        return mail;
      });
      return { ...state, allEmail: allMails };
    }

    case MARK_UNFAVORITE: {
      const allMails = state.allEmail.map((mail) => {
        if (mail.id === action.payload) return { ...mail, isFavorite: false };
        return mail;
      });
      return { ...state, allEmail: allMails };
    }

    case READ_UP: {
      const allMails =[];
       state.allEmail.map((mail) => {
        if (mail.isRead) allMails.push(mail);
      });
      state.allEmail.map((mail) => {
        if (!mail.isRead) allMails.push(mail);
      });
      return { ...state, allEmail: allMails };
    }

    case UNREAD_UP: {
      const allMails =[];
       state.allEmail.map((mail) => {
        if (!mail.isRead) allMails.push(mail);
      });
      state.allEmail.map((mail) => {
        if (mail.isRead) allMails.push(mail);
      });
      return { ...state, allEmail: allMails };
    }

    case FAVORITE_UP: {
      const allMails =[];
       state.allEmail.map((mail) => {
        if (mail.isFavorite) allMails.push(mail);
      });
      state.allEmail.map((mail) => {
        if (!mail.isFavorite) allMails.push(mail);
      });
      return { ...state, allEmail: allMails };
    }

    default:
      return state;
  }
};
