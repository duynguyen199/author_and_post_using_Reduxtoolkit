import React, { useState } from "react";
import type { DPost } from "../../constants/CreateAuthor";
import { useDispatch } from "react-redux";
import { createPostSaga } from "../../store/slice/postSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
type Props = {};

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),

  avatar: yup
    .string()
    .required("Avatar is required")
    .url("Avatar must be a valid URL")
    .min(10, "Avatar URL must be at least 10 characters")
    .max(2048, "Avatar URL cannot exceed 2048 characters"),

  author_id: yup
    .number()
    .required("Author ID is required")
    .min(1, "Author ID must be at least 1")
    .integer("Author ID must be an integer"),
});
const postData = [
  {
    id: 1,
    nameInput: "title",
    placeHolder: "Enter Title...",
    label: "Title",
  },
  {
    id: 2,
    nameInput: "description",
    placeHolder: "Enter Description...",
    label: "Description",
  },
  {
    id: 3,
    nameInput: "avatar",
    placeHolder: "Enter Avatar URL...",
    label: "Avatar",
  },
  {
    id: 4,
    nameInput: "author_id",
    placeHolder: "Enter Author ID...",
    label: "Author ID",
  },
];

const PostForm = (props: Props) => {
  // const [post, setPost] = useState<DPost>({
  //   title: "",
  //   description: "",
  //   avatar: "",
  //   author_id: 0,
  // });

  const dispatch = useDispatch();

  // const handleChangePostData = (value: string, key: keyof DPost) => {
  //   setPost((prev) => ({ ...prev, [key]: value }));
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DPost>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      avatar: "",
      author_id: 0,
    },
  });

  const onSubmit = (data: DPost) => {
    const newPost: DPost = {
      title: data.title,
      description: data.description,
      avatar: data.avatar,
      author_id: Number(data.author_id),
    };
    dispatch(createPostSaga(newPost));
  };
  // // const handleSubmitPost = async (e: React.FormEvent) => {
  //
  // };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          <span style={{ color: "#00c6ff" }}>Responsive</span>{" "}
          <span style={{ color: "#8a2be2" }}>Post</span> Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} style={styles.formGrid}>
          {postData.map((post) => (
            <div key={post.id} style={styles.inputGroup}>
              <label style={styles.label}>{post.label}</label>
              <input
                type="text"
                placeholder={post.placeHolder}
                {...register(post.nameInput as keyof DPost)}
                style={styles.input}
                // onChange={(e) => {
                //   handleChangePostData(
                //     e.target.value,
                //     post.nameInput as keyof DPost
                //   );
                // }}
              />
              {errors[post.nameInput as keyof DPost] && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  {errors[post.nameInput as keyof DPost]?.message}
                </p>
              )}
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button type="submit" style={styles.button}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #00c6ff, #8a2be2)",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    width: "800px",
    maxWidth: "100%",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "none",
    borderBottom: "2px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    background: "linear-gradient(90deg, #00c6ff, #8a2be2)",
    color: "#fff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
};

export default PostForm;
