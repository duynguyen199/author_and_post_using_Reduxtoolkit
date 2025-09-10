// Import RootState from your store definition, not from @reduxjs/toolkit/query
import type { RootState } from "../store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsStart } from "../store/slice/postSlice";
import type { DAuthor } from "../constants/CreateAuthor";
import PostForm from "../component/PostForm/PostForm";

type Props = {};

const PostPage = (props: Props) => {
  const dispatch = useDispatch();
  const dataStore = useSelector((state: RootState) => state.postsSlice);

  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
  });

  useEffect(() => {
    dispatch(fetchPostsStart(filter));
  }, [filter]);

  return (
    <div>
      <input
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
      />

      <select
        onChange={(e) => {
          setFilter({ ...filter, status: e.target.value });
        }}
      >
        <option value="">All</option>
        <option value="draft">draft</option>
        <option value="published">published</option>
        <option value="archived">archived</option>
      </select>

      {dataStore?.posts.map((post:DAuthor) => (
        <li key={post.title}>{post.title}</li>
      ))}

      {/* Pagination */}

      {Array.from(Array(dataStore?.pagination.pages).keys()).map((page) => (
        <button onClick={() => setFilter({ ...filter, page: page + 1 })}>
          Page {page + 1}
        </button>
      ))}
      <PostForm/>
    </div>
  );
};

export default PostPage;
