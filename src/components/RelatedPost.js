import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostSidebar from "./PostSidebar";

import * as actions from "../store/actions";

const RelatedPost = ({ outstandingPosts }) => {
  const dispatch = useDispatch();

  const { latest_posts, outstanding_posts } = useSelector(
    (state) => state.post
  );

  const [posts, setPosts] = useState({});

  useEffect(() => {
    outstandingPosts
      ? dispatch(actions.getOutStandingPosts())
      : dispatch(actions.getLatestPosts());
  }, []);

  useEffect(() => {
    outstandingPosts ? setPosts(outstanding_posts) : setPosts(latest_posts);
  }, [latest_posts, outstanding_posts]);

  return (
    <div className="w-full p-4 bg-white border border-gray-300 shadow-sm rounded-md">
      <h3 className="font-medium text-lg mb-4">
        {!outstandingPosts ? "Tin mới đăng" : "Tin nổi bật"}
      </h3>
      <div className="w-full flex flex-col gap-2">
        {posts?.length > 0 &&
          posts.map((post) => (
            <PostSidebar
              key={post.id}
              postId={post?.id}
              title={post.title}
              image={JSON.parse(post?.images?.image)}
              star={post.star}
              price={post.attributes.price}
              createdAt={post.overviews.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedPost;
