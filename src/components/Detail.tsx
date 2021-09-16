import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { db } from "../firebaseConfig";

const Detail = () => {
  const { id }: { id: string } = useParams();
  // const initialState: movieDataType = {
  //   title: "",
  //   titleImg: "",
  //   subTitle: "",
  //   cardImg: "",
  //   backgroundImg: "",
  //   description: "",
  //   type: "recommend",
  // };
  const initialState: any = {
    title: "",
    titleImg: "",
    subTitle: "",
    cardImg: "",
    backgroundImg: "",
    description: "",
    type: "",
  };
  const [movie, setMovie] = useState(initialState);

  useEffect(() => {
    db.collection("/movies")
      .doc(id)
      .get()
      .then((movieData) => {
        if (movieData.exists) {
          setMovie(movieData.data());
        } else console.log("No such document in db!");
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container>
      <Background>
        <img src={movie.backgroundImg} alt={movie.title} />
      </Background>
      <TitleImage>
        <img src={movie.titleImg} alt={movie.title} />
      </TitleImage>
      <Controls>
        <PlayButton>
          <img src="/images/play-icon-black.png" alt="Play Icon" />
          <span>PLAY</span>
        </PlayButton>
        <TrailerButton>
          <img src="/images/play-icon-white.png" alt="Play Icon" />
          <span>TRAILER</span>
        </TrailerButton>
        <AddToWatchlistButton>+</AddToWatchlistButton>
        <GroupWatchButton>
          <img src="/images/group-icon.png" alt="" />
        </GroupWatchButton>
      </Controls>
      <p>{movie.subTitle}</p>
      <Description>{movie.description}</Description>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  min-height: calc(100vh-70px);
  padding: 0 calc(3.5vw+5px);
  position: relative;
  top: 72px;
  max-width: 720px;
  margin: 10px auto 0 auto;
  overflow-x: hidden;

  @media only screen and (max-width: 720px) {
  }

  @media only screen and (max-width: 540px) {
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.8;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;
// background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;

const TitleImage = styled.div`
  height: 30vh;
  min-height: 170px;
  width: 35vw;
  min-width: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  margin-top: 20px;
`;

const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  background-color: white;
  color: black;
  outline: none;
  border: none;
  margin-right: 15px;
  padding: 0 20px;

  &:hover {
    opacity: 0.8;
  }
`;

const TrailerButton = styled(PlayButton)`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  opacity: 0.8;

  &:hover {
    background-color: rgba(219, 219, 219, 0.5);
  }
`;

const AddToWatchlistButton = styled.button`
  margin-right: 15px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  background: rgba(10, 10, 10, 0.3);
  border: 2px solid white;
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GroupWatchButton = styled(AddToWatchlistButton)`
  background-color: black;
`;

const Description = styled.p`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
  max-width: 760px;
`;

// type movieDataType = {
//   title: string;
//   titleImg: string;
//   subTitle: string;
//   cardImg: string;
//   backgroundImg: string;
//   description: string;
//   type: string;
// };
