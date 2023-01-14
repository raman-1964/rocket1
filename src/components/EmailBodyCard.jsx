import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markFavorite, markUnFavorite } from "../store/action/emailAction";
import renderDate from "../utils/renderDate";

const EmailBodyCard = () => {
  const dispatch = useDispatch();
  const emailState = useSelector((state) => state.emailReducer);
  const [email, setEmail] = useState(null);

  const createMarkup = () => {
    return { __html: emailState.singleEmail.body };
  };

  useEffect(() => {
    emailState.allEmail.map((mail) => {
      if (mail.id === emailState.singleEmail.id) setEmail(mail);
    });
  }, [
    JSON.stringify(emailState.singleEmail),
    JSON.stringify(emailState.allEmail),
  ]);

  return (
    <div className="emailBodyCard">
      <h1 className="emailIcon">{email?.from?.name.slice(0, 1)}</h1>
      <div className="emailBodyCardUp">
        <div className="emailBodyCardUpLeft">
          <div className="emailBodyCardUpLeftFrom">
            <h1>{email?.subject}</h1>
            <p className="date">
              {renderDate(email?.date)}
            </p>
          </div>
          {!email?.isFavorite ? (
            <button
              className="favoriteBtn"
              onClick={() => dispatch(markFavorite(emailState.singleEmail.id))}
            >
              Mark as Favorite
            </button>
          ) : (
            <button
              className="favoriteBtn"
              onClick={() =>
                dispatch(markUnFavorite(emailState.singleEmail.id))
              }
            >
              Mark as UnFavorite
            </button>
          )}
        </div>
        <div dangerouslySetInnerHTML={createMarkup()} className="markup"></div>
      </div>
    </div>
  );
};

export default EmailBodyCard;
