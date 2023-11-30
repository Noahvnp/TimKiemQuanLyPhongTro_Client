import React, { useEffect, useState } from "react";

import icons from "../../utils/icons";
import { BarChart } from "../../components";
import { apiGetOverviews } from "../../services";
import { formatPrice } from "../../utils/Common/formatPrice";

const { MdOutlineBarChart, LuFileLineChart, LuFileBarChart2, FaUsers } = icons;

const Overview = () => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    apiGetOverviews().then((response) => setdata(response?.data?.response));
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 grid grid-cols-4 gap-6 [&>*]:font-medium [&>*]:border [&>*]:border-gray-200 [&>*]:rounded-xl [&>*]:p-3 [&>*]:shadow-lg">
        <div className="bg-primary flex items-center gap-4">
          <span>
            <LuFileLineChart size={50} color="blue" />
          </span>
          <div className="flex flex-col">
            Tin đăng <span className="text-2xl">{data?.posts}</span>
          </div>
        </div>
        <div className="bg-primary flex items-center gap-4">
          <span>
            <FaUsers size={50} color="blue" />
          </span>
          <div className="flex flex-col">
            Người thuê <span className="text-2xl">{data?.contracts}</span>
          </div>
        </div>
        <div className="bg-primary flex items-center gap-4">
          <span>
            <LuFileBarChart2 size={50} color="blue" />
          </span>
          <div className="flex flex-col">
            Số hợp đồng <span className="text-2xl">{data?.contracts}</span>
          </div>
        </div>
        <div className="bg-primary flex items-center gap-4">
          <span>
            <MdOutlineBarChart size={60} color="blue" />
          </span>
          <div className="flex flex-col">
            Doanh thu{" "}
            <span className="text-2xl">
              {data?.amount ? formatPrice(data?.amount) : 0}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 mb-6">
        <BarChart dataOverview={data} />
      </div>
    </div>
  );
};

export default Overview;
