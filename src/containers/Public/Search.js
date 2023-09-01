import React from "react";
import { SearchItem } from "../../components";
import icons from "../../utils/icons";

const {
  BsChevronRight,
  HiLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouseSiding,
  FiSearch,
} = icons;

function Search() {
  return (
    <div className="w-3/5 my-4 p-[10px] bg-[#febb02] rounded-lg flex-col xl:flex-row flex items-center justify-around gap-2">
      <SearchItem
        text={"Phòng trọ, nhà trọ"}
        fontWeight
        IconBefore={<MdOutlineHouseSiding />}
        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
      />
      <SearchItem
        text={"Toàn quốc"}
        IconBefore={<HiLocationMarker />}
        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
      />
      <SearchItem
        text={"Chọn giá"}
        IconBefore={<TbReportMoney />}
        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
      />
      <SearchItem
        text={"Chọn diện tích"}
        IconBefore={<RiCrop2Line />}
        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
      />
      <button
        type="button"
        className="outline-none py-2 px-4 w-full bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium rounded-md"
      >
        <FiSearch />
        Tìm kiếm
      </button>
    </div>
  );
}

export default Search;
