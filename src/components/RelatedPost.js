import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostSidebar from "./PostSidebar";

import * as actions from "../store/actions";

const RelatedPost = () => {
  const dispatch = useDispatch();
  const { latest_posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(actions.getLatestPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full p-4 bg-white border border-gray-300 shadow-sm rounded-md">
      <h3 className="font-medium text-lg mb-4">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {latest_posts?.length > 0 &&
          latest_posts.map((new_post) => (
            <PostSidebar
              key={new_post.id}
              title={new_post.title}
              image={JSON.parse(new_post?.images?.image)}
              price={new_post.attributes.price}
              createdAt={new_post.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedPost;
