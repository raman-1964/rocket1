import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailBodyCard from "./components/EmailBodyCard";
import EmailCard from "./components/EmailCard";
import Skeleton from "./components/Skeleton";
import Spinner from "./components/Spinner";
import {
  favoriteUp,
  getAllEmail,
  readUp,
  unReadUp,
} from "./store/action/emailAction";

function App() {
  const emailState = useSelector((state) => state.emailReducer);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const observer = useRef();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const lastElementRef = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect();
      if (!emailState.isNextPage) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && emailState.isNextPage)
          setPage((prev) => prev + 1);
      });
      if (element) observer.current.observe(element);
    },
    [emailState.isNextPage]
  );

  useEffect(() => {
    dispatch(getAllEmail(page));
  }, [page]);

  return (
    <>
      <div className="filter">
        <p>Filter By:</p>

        <span
          className={`unread ${filter === "UnRead" ? "filterBorder" : ""}`}
          onClick={() => {
            setFilter("UnRead");
            dispatch(unReadUp());
          }}
        >
          UnRead
        </span>
        <span
          className={`${filter === "Read" ? "filterBorder" : ""}`}
          onClick={() => {
            setFilter("Read");
            dispatch(readUp());
          }}
        >
          Read
        </span>
        <span
          className={`${filter === "Favorites" ? "filterBorder" : ""}`}
          onClick={() => {
            setFilter("Favorites");
            dispatch(favoriteUp());
          }}
        >
          Favorites
        </span>
      </div>
      <div className={`app ${id && "width-split"}`}>
        <div className={`cards ${id && "width-40"}`}>
          {emailState.allEmailLoading ? (
            [...Array(5).keys()].map((_, index) => (
              <Skeleton
                className="loader"
                isWhiteLoader="true"
                key={`email-${index}`}
              />
            ))
          ) : (
            <>
              {emailState.allEmail.map((mail, ind) => {
                return (
                  <EmailCard
                    ref={
                      ind === emailState.allEmail.length - 1
                        ? lastElementRef
                        : undefined
                    }
                    key={`email-${ind}`}
                    email={mail}
                    id={id}
                    setId={setId}
                  />
                );
              })}

              {emailState.isNextPageLoading && (
                <Skeleton className="loader " isWhiteLoader="true" />
              )}
            </>
          )}
        </div>
        {emailState.singleEmailLoading && id ? (
          <div className="emailBodyCardLoading">
            <Spinner />
          </div>
        ) : (
          id && <EmailBodyCard />
        )}
      </div>
    </>
  );
}

export default App;
