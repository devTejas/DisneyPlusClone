import React from "react";
import styled from "styled-components";

const Viewers: React.FC = () => {
  return (
    <Container>
      <Wrap>
        <img src="/images/viewers-disney.png" alt="Viewers disney" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/disney.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-marvel.png" alt="Viewers marvel" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/marvel.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-national.png" alt="Viewers national" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/national-geographic.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-pixar.png" alt="Viewers pixar" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/pixar.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-starwars.png" alt="Viewers starwars" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/star-wars.mp4" type="video/mp4" />
        </video>
      </Wrap>
    </Container>
  );
};

export default Viewers;

const Container = styled.div`
  margin-top: 30px;
  display: grid;
  padding: 30px 0px 26px;
  grid-gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media only screen and (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  cursor: pointer;
  border: 2px solid rgba(49, 49, 49, 0.8);
  border-radius: 10px;
  // display: flex;
  // align-items: center;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px 10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transtion: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: transparent;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    border-radius: 10px;
    right: 0px;
    z-index: -1;
    opacity: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    border: 2px solid rgb(249, 249, 249, 0.8);
    transform: scale(1.05);

    video {
      opacity: 1;
    }
  }
`;
