import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { PageNumber } from "../../components";
import icons from "../../utils/icons";

const { GrLinkNext, GrLinkPrevious } = icons;

const Pagination = () => {
  const [searchParams] = useSearchParams();
  const { count, posts } = useSelector((state) => state.post);

  const [arrPages, setArrPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideNextPage, setIsHideNextPage] = useState(false);
  const [isHidePrevPage, setIsHidePrevPage] = useState(false);

  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    let maxPages = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTSIZE);
    let nextPage = currentPage + 1 > maxPages ? maxPages : currentPage + 1;
    let prevPage = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    let temp = [];
    for (let i = prevPage; i <= nextPage; i++) temp.push(i);
    setArrPages(temp);
    currentPage <= 2 ? setIsHidePrevPage(true) : setIsHidePrevPage(false);
    currentPage >= maxPages - 1
      ? setIsHideNextPage(true)
      : setIsHideNextPage(false);
  }, [count, posts, currentPage]);

  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {!isHidePrevPage && (
        <PageNumber
          icon={<GrLinkPrevious />}
          text={1}
          setCurrentPage={setCurrentPage}
        />
      )}
      {!isHidePrevPage && <PageNumber text={"..."} />}
      {arrPages.length > 0 &&
        arrPages.map((item) => (
          <PageNumber
            key={item}
            text={item}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ))}
      {!isHideNextPage && <PageNumber text={"..."} />}
      {!isHideNextPage && (
        <PageNumber
          icon={<GrLinkNext />}
          text={Math.floor(count / posts.length)}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Pagination;
