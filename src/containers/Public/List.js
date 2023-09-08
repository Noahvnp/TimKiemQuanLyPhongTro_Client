import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Item } from "../../components";

import { getPosts, getPostsLimit } from "../../store/actions/post";

const List = ({ page }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    let offset = page ? +page - 1 : 0;
    dispatch(getPostsLimit(offset));
  }, [page]);

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
