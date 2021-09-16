import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { db } from "../firebaseConfig";
import ImageSlider from "./ImageSlider";
import MovieList from "./MovieList";
import Viewers from "./Viewers";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends: any[] = [];
  let trending: any[] = [];
  let originals: any[] = [];
  let newDisney: any[] = [];

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            newDisney = [...newDisney, { id: doc.id, ...doc.data() }];
            break;
        }
      });
      dispatch(
        setMovies({
          recommends: recommends,
          trending: trending,
          originals: originals,
          newDisney: newDisney,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <MovieList />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  overflow-x: hidden;
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  top: 72px;

  &:before {
    content: "";
    background: url(/images/home-background.png) center center / cover no-repeat
      fixed;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
`;

// type movieDataType = {
//   id: string;
//   title: string;
//   titleImg: string;
//   subTitle: string;
//   cardImg: string;
//   backgroundImg: string;
//   description: string;
// }[];
