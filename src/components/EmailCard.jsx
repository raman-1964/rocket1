import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { getSingleEmail } from "../store/action/emailAction";
import renderDate from "../utils/renderDate";

const EmailCard = forwardRef(({ email, id, setId }, ref) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        ref={ref}
        className={`emailCard ${id === email.id ? "readingBorder" : ""} ${
          email.isRead && "read"
        }`}
        onClick={() => {
          dispatch(getSingleEmail(email.id));
          setId(email.id);
        }}
      >
        <h1 className="emailIcon">{email.from.name.slice(0, 1)}</h1>
        <div className="emailCard_right">
          <div>
            <h1>
              <span>From: </span>
              <div className="emailFrom">
                <p>{email.from.name}</p>
                <p>{email.from.email}</p>
              </div>
            </h1>
            <h1>
              <span>Subject: </span>
              {email.subject}
            </h1>
          </div>
          <p className="desc">{email.short_description}</p>
          <div className="favoriteCont">
            <p className="date">
              {renderDate(email.date)}
            </p>
            {email.isFavorite && <p className="favoriteText">Favorite</p>}
          </div>
        </div>
      </div>
    </>
  );
});

export default EmailCard;
