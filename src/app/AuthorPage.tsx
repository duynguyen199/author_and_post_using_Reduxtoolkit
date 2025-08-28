import React, { useEffect, useState } from "react";
import {
  addAuthor,
  deleteAuthor,
  editValueChange,
  fetchAuthor,
  getAuthorById,
} from "../store/thunk/authorThunk";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { TAuthor } from "../store/slice/AuthorSlice";
type Props = {};

export type TAtuhor = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
};
const listData = [
  { id: 1, nameInput: "name", placeHolder: "Enter Name", label: "text" },
  { id: 2, nameInput: "email", placeHolder: "Enter email", label: "email" },
  { id: 3, nameInput: "bio", placeHolder: "Enter bio", label: "bio" },
  { id: 4, nameInput: "avatar", placeHolder: "Enter avatar", label: "avatar" },
];

const AuthorPage: React.FC<Props> = (props: Props) => {
  const [authorData, setAuthorData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [authorDataEdit, setAuthorDataEdit] = useState<TAtuhor>(null);

  const { listAuthor, isLoading } = useSelector((state: RootState) => {
    return state.authorSlice;
  });

  const dispatch = useDispatch();
  const [idEdit, setIdEdit] = useState<number | null>(null);

  const handleGetValue = (value: string, nameInput: keyof TAtuhor) => {
    setAuthorData((prev) => ({
      ...prev,
      [nameInput]: value,
    }));
  };

  const handleGetDetailAuthor = async (id: number) => {
    try {
      const res = await dispatch(getAuthorById(id) as any).unwrap();
      setAuthorDataEdit(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    try {
      if (idEdit !== null && authorDataEdit) {
        await dispatch(
          editValueChange({ id: idEdit, authorData: authorDataEdit }) as any
        ).unwrap();
        setIdEdit(null);
        setAuthorDataEdit({
            name:"",
            email:"",
            bio:"",
            avatar:""
        });
        await dispatch(fetchAuthor()as any).unwrap()
      } else {
        await dispatch(addAuthor(authorData) as any).unwrap();
        setAuthorData({
          name: "",
          email: "",
          bio: "",
          avatar: "",
        });
        await dispatch(fetchAuthor() as any).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteAuthor(id) as any).unwrap();
      await dispatch(fetchAuthor() as any).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeValueEdit = (value: string, data: keyof TAtuhor) => {
    if (authorDataEdit) {
      setAuthorDataEdit((prev) => {
        return {
          ...prev,
          [data]: value,
        };
      });
    }
  };
  const handleGetVIdEdit = (id: number) => {
    const authorToEdit = listAuthor.find((item) => item.id === id);
    if (authorToEdit) {
      setAuthorDataEdit(authorToEdit);
      setIdEdit(id);
    } else {
      handleGetDetailAuthor(id);
    }
  };
  useEffect(() => {
    dispatch(fetchAuthor() as any);
  }, [dispatch]);

  return (
    <div>
      <h1>Authors</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          margin: "auto",
        }}
      >
        {listData.map((item, index) => {
          return (
            <>
              <label key={item.id}>{item.label}</label>
              <input
                type="text"
                placeholder={item.placeHolder}
                value={authorData[item.nameInput as keyof TAtuhor]}
                onChange={(e) =>
                  handleGetValue(
                    e.target.value,
                    item.nameInput as keyof TAtuhor
                  )
                }
              />
            </>
          );
        })}

        <button
          onClick={handleSubmit}
          style={{ marginTop: "20px", width: "20%", padding: "10px" }}
        >
          Submit
        </button>
        <h1>List Author</h1>

        {isLoading ? (
          <h2>Loading....</h2>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {listAuthor.map((item: TAuthor) => {
              return (
                <div
                  key={item.id}
                  style={{ border: "1px solid black", padding: "10px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    {" "}
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        marginTop: "20px",
                        width: "20%",
                        padding: "10px",
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleGetVIdEdit(item.id)}
                      style={{
                        marginTop: "20px",
                        width: "20%",
                        padding: "10px",
                      }}
                    >
                      edit
                    </button>
                  </div>

                  {idEdit === item.id ? (
                    <div>
                      {listData.map((data) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "60%",
                              margin: "auto",
                            }}
                          >
                            <label>{data.label}</label>
                            <input
                              type="text"
                              onChange={(e) => {
                                handleChangeValueEdit(
                                  e.target.value,
                                  data.nameInput as keyof TAtuhor
                                );
                              }}
                              value={
                                authorDataEdit?.[
                                  data.nameInput as keyof TAtuhor
                                ]
                              }
                            />
                          </div>
                        );
                      })}
                      <button
                        onClick={handleSubmit}
                        style={{
                          marginTop: "20px",
                          width: "20%",
                          padding: "10px",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2>{item.name}</h2>
                      <p>{item.email}</p>
                      <p>{item.bio}</p>
                      <img
                        src={item.avatar}
                        alt={item.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
