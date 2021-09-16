import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { db, storage } from "../firebaseConfig";

const UploadForm = () => {
  const sampleMovieData: movieDataType = {
    title: "",
    titleImg: "",
    subTitle: "",
    cardImg: "",
    backgroundImg: "",
    description: "",
    type: "recommend",
  };
  const [movieData, setMovieData] = useState(sampleMovieData);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let e = event!.target;
    setMovieData({ ...movieData, [e.name]: e.value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let e = event!.target;
    let eName = e.name;
    let file = e!.files![0];

    const storageRef = storage.ref(file.name);

    storageRef.put(file).then(async () => {
      const url = await storageRef.getDownloadURL();
      setMovieData({ ...movieData, [eName]: url });
    });
  };

  const upload = (e: any) => {
    e.preventDefault();
    if (movieData.titleImg && movieData.cardImg && movieData.backgroundImg) {
      const collectionRef = db.collection("movies");
      collectionRef
        .add(movieData)
        .then(() => {
          console.table(collectionRef);
          setMovieData({ ...sampleMovieData });
          history.push("/detail");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert(
        "Please upload the Title Image, Card Image, Background Image again! "
      );
    }
  };

  const history = useHistory();

  return (
    <Container>
      <p>All fields are mandatory!</p>
      <form
        onSubmit={(e: any) => {
          upload(e);
        }}
      >
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            onChange={handleTextChange}
            placeholder="Title"
            value={movieData.title}
            required
          />
        </label>
        <label htmlFor="titleImg">
          Title Image
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="titleImg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleFileChange(e);
            }}
            required
          />
        </label>
        <label htmlFor="subTitle">
          Sub Title
          <input
            type="text"
            name="subTitle"
            onChange={handleTextChange}
            placeholder="Sub Title"
            value={movieData.subTitle}
            required
          />
        </label>
        <label htmlFor="backgroundImg">
          Background Image
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="backgroundImg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleFileChange(e);
            }}
            required
          />
        </label>
        <label htmlFor="cardImg">
          Card Image
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="cardImg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleFileChange(e);
            }}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            placeholder="Description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setMovieData({
                ...movieData,
                [e.currentTarget.name]: e!.currentTarget.value,
              });
            }}
            value={movieData.description}
            required
          ></textarea>
        </label>
        <label htmlFor="type">
          Type
          <select
            name="type"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setMovieData({
                ...movieData,
                [e.currentTarget.name]: e!.currentTarget.value,
              });
            }}
            value={movieData.type}
            required
          >
            <option disabled>SELECT MOVIE TYPE</option>
            <option value="recommend">RECOMMENDED</option>
            <option value="new">NEW TO DISNEY</option>
            <option value="original">ORIGINALS</option>
            <option value="trending">TRENDING</option>
          </select>
        </label>
        <input type="submit" value="Upload" />
      </form>
    </Container>
  );
};

export default UploadForm;

const Container = styled.div`
  position: relative;
  top: 72px;

  width: 100%;
  margin: 3.125rem auto 0 auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  form {
    padding: 2.5rem 0.625rem;
    border-radius: 0.25rem;

    @media (min-width: 480px) {
      padding: 2.5rem;
    }
  }

  label {
    display: block;
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  input,
  select,
  textarea {
    margin: 0;

    display: block;
    width: 100%;
    height: 2.375rem;
    padding: 0.375rem 0.75rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    resize: none;
  }

  input[type="submit"] {
    background-color: black;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    border: 3px solid;
    cursor: pointer;

    &:hover {
      background-color: grey;
      color: black;
    }
  }

  textarea {
    height: 88px;
  }
`;

type movieDataType = {
  title: string;
  titleImg: string;
  subTitle: string;
  cardImg: string;
  backgroundImg: string;
  description: string;
  type: string;
};
