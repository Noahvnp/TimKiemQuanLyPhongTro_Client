import React, { useEffect } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPostsLimit } from "../../store/actions";
import {
  BoxInfo,
  Button,
  RelatedPost,
  SliderImageDetail,
} from "../../components/";

import icons from "../../utils/icons";
import { Path } from "../../utils/constants";

const {
  HiLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  BsStopwatch,
  BsHash,
  BiSolidFlagAlt,
} = icons;

const DetailPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);

  const handleFilterLabel = () => {
    const titleSearch = `${posts[0]?.label?.value}`;
    navigate(
      {
        pathname: `/${Path.DETAIL_SEARCH}`,
        search: createSearchParams({
          labelCode: posts[0]?.label?.code,
        }).toString(),
      },
      {
        state: { titleSearch },
      }
    );
  };

  return (
    <div className="w-full flex gap-4 mt-4">
      <div className="w-[70%] h-fit border border-gray-300 bg-white rounded-md">
        {posts && posts?.length > 0 && (
          <>
            <SliderImageDetail
              images={JSON.parse(posts[0]?.images?.image) || {}}
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-red-600">
                {posts[0]?.title}
              </h2>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm pt-3">
                  <span>Chuyên mục: </span>
                  <span
                    className="text-blue-600 underline font-semibold hover:text-orange-600 cursor-pointer"
                    onClick={handleFilterLabel}
                  >
                    {posts[0]?.label?.value}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiLocationMarker color="#2563eb" />
                  <span>{posts[0]?.address}</span>
                </div>

                <div className="flex items-center justify-start gap-10 [&>*]:flex [&>*]:items-center [&>*]:gap-1">
                  <span className="font-semibold text-lg text-green-600">
                    <TbReportMoney color="gray" />
                    {posts[0]?.attributes?.price}
                  </span>
                  <span className="">
                    <RiCrop2Line color="gray" />
                    {posts[0]?.attributes?.acreage}
                  </span>
                  <span className="">
                    <BsStopwatch color="gray" />
                    {posts[0]?.attributes?.published}
                  </span>
                  <span className="">
                    <BsHash color="gray" />
                    {posts[0]?.attributes?.hashtag}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-lg">Thông tin mô tả</h3>
                  <div className="flex flex-col gap-2 mt-2 text-[.9rem]">
                    {posts[0]?.description &&
                      posts[0]?.description?.length > 0 &&
                      JSON.parse(posts[0].description)?.map((item, index) => (
                        <span key={index}>{item}</span>
                      ))}
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-lg">Đặc điểm tin đăng</h3>
                  <table className="w-full mt-">
                    <tbody className="[&>*:nth-child(even)]:bg-gray-100 [&>*]:[&>*]:text-sm [&>*]:[&>*]:px-3 [&>*]:[&>*]:py-2">
                      <tr>
                        <td>Mã tin:</td>
                        <td>{posts[0]?.overviews?.code}</td>
                      </tr>
                      <tr>
                        <td>Khu vực:</td>
                        <td>{posts[0]?.overviews?.acreage}</td>
                      </tr>
                      <tr>
                        <td>Loại tin rao:</td>
                        <td>{posts[0]?.overviews?.type}</td>
                      </tr>
                      <tr>
                        <td>Đối tượng:</td>
                        <td>{posts[0]?.overviews?.target}</td>
                      </tr>
                      <tr>
                        <td>Gói tin:</td>
                        <td>{posts[0]?.overviews?.bonus}</td>
                      </tr>
                      <tr>
                        <td>Ngày đăng:</td>
                        <td>{posts[0]?.overviews?.created}</td>
                      </tr>
                      <tr>
                        <td>Ngày hết hạn:</td>
                        <td>{posts[0]?.overviews?.expire}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-lg">Thông tin liên hệ</h3>
                  <table className="w-full mt-1">
                    <tbody className="[&>*:nth-child(even)]:bg-gray-100 [&>*]:[&>*]:text-sm [&>*]:[&>*]:px-3 [&>*]:[&>*]:py-2">
                      <tr>
                        <td>Liên hệ:</td>
                        <td>{posts[0]?.user?.name}</td>
                      </tr>
                      <tr>
                        <td>Điện thoại:</td>
                        <td>{posts[0]?.user?.phone}</td>
                      </tr>
                      <tr>
                        <td>Zalo:</td>
                        <td>{posts[0]?.user?.zalo}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="font-bold text-lg">Bản đồ</h3>
                <span className="mt-1 text-sm">{posts[0]?.address}</span>
              </div>

              <div className="my-6">
                <Button
                  text={"Gửi phản hồi"}
                  textColor="text-blue-700"
                  fontSz="font-medium"
                  IcBefore={BiSolidFlagAlt}
                  className="border border-blue-700"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-[30%] flex flex-col gap-4">
        <BoxInfo userData={posts[0]?.user} />
        <RelatedPost outstandingPosts />
        <RelatedPost />
      </div>
    </div>
  );
};

export default DetailPost;
