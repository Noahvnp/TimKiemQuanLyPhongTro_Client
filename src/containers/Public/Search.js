import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Path } from "../../utils/constants";
import icons from "../../utils/icons";

import { SearchItem, Modal } from "../../components";

const {
  BsChevronRight,
  HiLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouseSiding,
  FiSearch,
} = icons;

const Search = () => {
  const { categories, provinces, acreages, prices } = useSelector(
    (state) => state.app
  );
  const navigate = useNavigate();
  const location = useLocation();

  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const [defaultText, setDefaultText] = useState("");
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({
    priceArr: [0, 100],
    acreageArr: [0, 100],
  });

  useEffect(() => {
    if (!location.pathname.includes(Path.DETAIL_SEARCH)) {
      setArrMinMax({
        priceArr: [0, 100],
        acreageArr: [0, 100],
      });
      setQueries({});
    }
  }, [location]);

  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
    setIsShowModal(true);
  };

  const handleSubmit = (e, query, arrMinMax) => {
    e.stopPropagation();
    setQueries((prev) => ({ ...prev, ...query }));
    setIsShowModal(false);
    arrMinMax && setArrMinMax((prev) => ({ ...prev, ...arrMinMax }));
  };

  const handleSearch = () => {
    // Chuyển object thành array, sau đó lọc name có chứa code
    const arrQueryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Code") || item[0].includes("Number"))
      .filter((item) => item[1]);

    const arrQueryTexts = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );

    let objQueryCodes = {};
    arrQueryCodes.forEach((item) => (objQueryCodes[item[0]] = item[1])); //Lấy mảng đã lọc chuyển thành obj

    let objQueryTexts = {};
    arrQueryTexts.forEach((item) => (objQueryTexts[item[0]] = item[1])); //Lấy mảng đã lọc chuyển thành obj
    let titleSearch = `${
      objQueryTexts?.category
        ? `${objQueryTexts?.category}`
        : "Cho thuê nhà trọ, phòng trọ"
    } ${objQueryTexts?.province ? `ở ${objQueryTexts?.province}` : ""} ${
      objQueryTexts?.price ? `giá ${objQueryTexts?.price},` : ""
    } ${objQueryTexts?.acreage ? `diện tích ${objQueryTexts?.acreage}.` : ""}`;

    navigate(
      {
        pathname: Path.DETAIL_SEARCH,
        search: createSearchParams(objQueryCodes).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <>
      <div className="w-3/5 my-4 p-[10px] bg-[#febb02] rounded-lg flex-col xl:flex-row flex items-center justify-around gap-2">
        <span
          className="cursor-pointer flex-1"
          onClick={() => handleShowModal(categories, "category", "Tất cả")}
        >
          <SearchItem
            text={queries.category}
            defaultText={"Loại cho thuê"}
            fontWeight
            IconBefore={<MdOutlineHouseSiding />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
          />
        </span>
        <span
          className="cursor-pointer flex-1"
          onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
        >
          <SearchItem
            text={queries.province}
            defaultText={"Toàn quốc"}
            IconBefore={<HiLocationMarker />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
          />
        </span>
        <span
          className="cursor-pointer flex-1"
          onClick={() => handleShowModal(prices, "price", "Chọn giá")}
        >
          <SearchItem
            text={queries.price}
            defaultText={"Chọn giá"}
            IconBefore={<TbReportMoney />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
          />
        </span>
        <span
          className="cursor-pointer flex-1"
          onClick={() => handleShowModal(acreages, "acreage", "Chọn diện tích")}
        >
          <SearchItem
            text={queries.acreage}
            defaultText={"Chọn diện tích"}
            IconBefore={<RiCrop2Line />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
          />
        </span>
        <button
          type="button"
          onClick={handleSearch}
          className="outline-none py-2 px-4 w-full bg-secondary1 text-[13.3px] flex flex-1 items-center justify-center gap-2 text-white font-medium rounded-md"
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          content={content}
          name={name}
          defaultText={defaultText}
          queries={queries}
          setIsShowModal={setIsShowModal}
          arrMinMax={arrMinMax}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Search;
