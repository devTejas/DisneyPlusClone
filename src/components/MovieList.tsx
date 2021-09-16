import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  selectNewDisney,
  selectOriginals,
  selectRecommends,
  selectTrending,
} from "../features/movie/movieSlice";

const MovieList: React.FC = () => {
  const recommends = useSelector(selectRecommends);

  const newDisney = useSelector(selectNewDisney);
  const originals = useSelector(selectOriginals);
  const trending = useSelector(selectTrending);

  return (
    <Container>
      {recommends && (
        <>
          <h3>RECOMMENDED FOR YOU</h3>
          <Content>
            {recommends.map((movie, index) => (
              <Wrap key={index}>
                <Link to={"/detail/" + movie.id}>
                  <img loading="lazy" src={movie.cardImg} alt={movie.title} />
                </Link>
                {/* <DisLikeBtn>👎{0}</DisLikeBtn> */}
              </Wrap>
            ))}
          </Content>
        </>
      )}
      {newDisney && (
        <>
          <h3>NEW TO DISNEY</h3>
          <Content>
            {newDisney.map((movie, index) => (
              <Wrap key={index}>
                <Link to={"/detail/" + movie.id}>
                  <img loading="lazy" src={movie.cardImg} alt={movie.title} />
                </Link>
              </Wrap>
            ))}
          </Content>
        </>
      )}
      {originals && (
        <>
          <h3>ORIGINALS</h3>
          <Content>
            {originals.map((movie, index) => (
              <Wrap key={index}>
                <Link to={"/detail/" + movie.id}>
                  <img loading="lazy" src={movie.cardImg} alt={movie.title} />
                </Link>
              </Wrap>
            ))}
          </Content>
        </>
      )}
      {trending && (
        <>
          <h3>TRENDING</h3>
          <Content>
            {trending.map((movie, index) => (
              <Wrap key={index}>
                <Link to={"/detail/" + movie.id}>
                  <img loading="lazy" src={movie.cardImg} alt={movie.title} />
                </Link>
              </Wrap>
            ))}
          </Content>
        </>
      )}
    </Container>
  );
};

export default MovieList;

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

// const DisLikeBtn = styled.button``;

// const Container = styled.div``;

// const Content = styled.div`
//   display: grid;
//   grid-gap: 25px;
//   grid-template-columns: repeat(4, minmax(0, 1fr));
//   margin-bottom: 50px;

//   @media only screen and (max-width: 760px) {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }

//   @media only screen and (max-width: 480px) {
//     grid-template-columns: repeat(1, minmax(0, 1fr));
//   }
// `;

// const Wrap = styled.div`
//   overflow: hidden;
//   cursor: pointer;
//   border-radius: 10px;
//   border: 3px solid rgba(249, 249, 249, 0.1);
//   box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px 10px,
//     rgb(0 0 0 / 73%) 0px 16px 10px -10px;
//   transtion: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
//   transition-duration: 300ms;

//   img {
//     width: 100%;
//     height: 100%;
//     height: 100px;
//     object-fit: cover;
//   }

//   &:hover {
//     transform: scale(1.05);
//     box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
//       rgb(0 0 0 / 72%) 0px 30px 22px -10px;
//     border-color: rgba(249, 249, 249, 0.8);
//   }
// `;

// type PropsType = {
//   listName: string;
//   movieData: {
//     id: string;
//     title: string;
//     titleImg: string;
//     subTitle: string;
//     cardImg: string;
//     backgroundImg: string;
//     description: string;
//   }[];
// };
