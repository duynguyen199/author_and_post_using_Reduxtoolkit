// Import RootState from your store definition, not from @reduxjs/toolkit/query
import type { RootState } from "../store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostByIDSaga,
  fetchPostsStart,
  getPostByIdSaga,
} from "../store/slice/postSlice";
import PostForm from "../component/PostForm/PostForm";
import type { DPost } from "../constants/CreateAuthor";

type Props = {};

const PostPage = (props: Props) => {
  const dispatch = useDispatch();
  const dataStore = useSelector((state: RootState) => state.postsSlice);

  const handleGetIdedit = (id: number) => {
    dispatch(getPostByIdSaga(id));
  };

  const handleGetDataAfterDelete= ()=>{
         dispatch(fetchPostsStart({limit: 10, page:1, search:"", status:""}) )
    
  }
  const handleDelete = (data: DPost) => {

    console.log(data,"data")
    const fetchData = {...data, fnc:handleGetDataAfterDelete}
    dispatch(deletePostByIDSaga(fetchData));
  };

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

      {dataStore?.posts.map((post: DPost) => (
        <div
          key={post.title}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img
            style={{ height: 100, width: 100, borderRadius: 100 }}
            src={post.avatar}
          />
          <ul>
            <li>{post.title}</li>
            <li>{post.description}</li>
          </ul>
          <button
            onClick={() => {
              handleGetIdedit(post.id);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleDelete(post);
            }}
          >
            delete
          </button>
        </div>
      ))}

      {/* Pagination */}

      {Array.from(Array(dataStore?.pagination.pages).keys()).map((page) => (
        <button onClick={() => setFilter({ ...filter, page: page + 1 })}>
          Page {page + 1}
        </button>
      ))}
      <PostForm />
    </div>
  );
};

export default PostPage;
