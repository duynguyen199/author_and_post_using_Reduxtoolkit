import React, { useState } from "react";
import type { DPost } from "../../constants/CreateAuthor";
import { useDispatch } from "react-redux";
import { createPostSaga } from "../../store/slice/postSlice";
type Props = {};

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
  const [post, setPost] = useState<DPost>({
    title: "",
    description: "",
    avatar: "",
    author_id: 0,
  });

  const dispatch = useDispatch();

  const handleChangePostData = (value: string, key: keyof DPost) => {
    
    setPost((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: DPost = {
      title: post.title,
      description: post.description,
      avatar: post.avatar,
      author_id: Number(post.author_id),
    };
    dispatch(createPostSaga(newPost));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          <span style={{ color: "#00c6ff" }}>Responsive</span>{" "}
          <span style={{ color: "#8a2be2" }}>Post</span> Form
        </h2>

        <div style={styles.formGrid}>
          {postData.map((post) => (
            <div key={post.id} style={styles.inputGroup}>
              <label style={styles.label}>{post.label}</label>
              <input
                type="text"
                placeholder={post.placeHolder}
                name={post.nameInput}
                style={styles.input}
                onChange={(e) => {
                  handleChangePostData(
                    e.target.value,
                    post.nameInput as keyof DPost
                  );
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button onClick={handleSubmitPost} style={styles.button}>
            SUBMIT
          </button>
        </div>
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
