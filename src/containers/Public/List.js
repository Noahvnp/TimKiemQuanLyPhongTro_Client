import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Button, Item } from "../../components";

import { getPostsLimit } from "../../store/actions/post";

const List = ({ categoryCode }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    let arrParams = [];
    for (let entry of searchParams.entries()) arrParams.push(entry); //Chuyển object thành 1 mảng lớn chứa nhiều mảng nhỏ gồm [[key, value], [key, value], ...]

    let objParams = {};
    arrParams?.forEach((param) => {
      if (Object.keys(objParams)?.some((item) => item === param[0])) {
        //Nếu đã có key trong obj thì truyền vào các mảng đã có sẵn với key tươn ứng trong mảng lớn đó
        objParams[param[0]] = [...objParams[param[0]], param[1]];
      } else objParams = { ...objParams, [param[0]]: [param[1]] }; // Nếu chưa có thì tạo obj mới với key = [param[0]], value là mảng [param[1]]
    });
    if (categoryCode) objParams.categoryCode = categoryCode;
    dispatch(getPostsLimit(objParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, categoryCode]);

  return (
    <div className="w-full bg-white border border-gray-300 shadow-md rounded-md px-4">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-lg font-semibold">Danh sách tin đăng</h4>
        <span className="text-sm">Cập nhật: 12:09 02/09/2023</span>
      </div>
      <div className="flex items-center gap-1 my-2">
        <span>Sắp xếp:</span>
        <Button bgColor="bg-gray-200" text="Mặc định" />
        <Button bgColor="bg-gray-200" text="Mới nhất" />
      </div>
      <div className="flex flex-col gap-4">
        {posts.length > 0 &&
          posts.map((post) => (
            <Item
              key={post?.id}
              address={post?.address}
              attributes={post?.attributes}
              description={JSON.parse(post?.description)}
              images={JSON.parse(post?.images?.image)}
              star={+post?.star}
              title={post?.title}
              user={post?.user}
              postId={post?.id}
            />
          ))}
      </div>
    </div>
  );
};

export default List;
