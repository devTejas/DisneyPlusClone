import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setUserLoginDetails } from "../features/user/userSlice";
import { provider } from "../firebaseConfig";
import firebase from "firebase";

const Login = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        setUserToStore(result.user);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  type userType = {
    name: string | null;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  };

  const setUserToStore = (user: userType | any) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName ?? user.name,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  
  // signup
  const createUser = (email: string, password: string, name: string) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        setUserToStore({ ...user, name });
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // signin
  const signInUser = (email: any, password: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        setUserToStore(user);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const [signin, setSignin] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [samePassword, setSamePassword] = useState(true);

  const checkPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (user.password !== event?.currentTarget?.value) setSamePassword(false);
    else setSamePassword(true);
  };

  const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    let e = event.currentTarget;
    setUser({ ...user, [e.name]: e.value });
  };

  const handleAuth = (e: any) => {
    e.preventDefault();
    signin
      ? signInUser(user.email, user.password)
      : createUser(user.email, user.password, user.name);
  };

  return (
    <Container>
      <Background src="/images/login-background.jpg" alt="Image" />
      <TitleImage src="/images/cta-logo-one.svg" alt="Image" />
      <ButtonContainer>
        <ButtonWithText onClick={() => setSignin(true)}>
          <p>Existing User?</p>
          <p>Sign IN</p>
        </ButtonWithText>
        <ButtonWithText onClick={() => setSignin(false)}>
          <p>New User?</p>
          <p>Sign UP</p>
        </ButtonWithText>
      </ButtonContainer>
      <DetailForm
        onSubmit={(e: any) => {
          handleAuth(e);
        }}
      >
        {/* {!signin && (
          <div>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              onInput={handleUser}
              required
            />
            *
          </div>
        )} */}
        <div>
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            onInput={handleUser}
            required
          />
          *
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your Password"
            name="password"
            onInput={handleUser}
            required
          />
          *
        </div>
        {!signin && (
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              onInput={checkPassword}
              required
            />
            *
          </div>
        )}
        {!samePassword && user.password && (
          <p>PASSWORD & CONFIRM PASSWORD ARE NOT SAME!</p>
        )}
        {/* if user wants to signin, then variable signin is false(default) so it must be used as !signin */}
        <StyledButton type="submit">
          {signin ? `SIGN IN` : `SIGN UP`}
        </StyledButton>
        <p>
          *ALL FIELDS ARE REQUIRED!
          <br /> For a demo👇
          <br /> Email - user@test.com
          <br /> Password - testuser
        </p>
      </DetailForm>
      <LoginButton onClick={handleGoogleLogin}>LOGIN WITH GOOGLE</LoginButton>
      <FooterImage src="/images/cta-logo-two.png" alt="Image" />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0vh 25vw;
  position: relative;
  top: 72px;

  @media screen and (max-width: 768px) {
  }

  @media screen and (max-width: 480px) {
    margin: 0 10px;
  }
`;

const Background = styled.img`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleImage = styled.img``;

const StyledButton = styled.button`
  background: #40e0d0; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff0080, #ff8c00, #40e0d0);
  background: linear-gradient(to right, #ff0080, #ff8c00, #40e0d0);
  transition-duration: 250ms;

  cursor: pointer;
  color: black;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 1.4;
  border-radius: 10px;
  border: none;
  margin: 10px 0;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1.5px;
    line-height: 1;
    padding: 4px 0;
  }

  @media only screen and (max-width: 480px) {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 1;
    padding: 4px 0;
  }
`;

const LoginButton = styled(StyledButton)`
  padding: 10px 0;
  &:hover {
    background: -webkit-linear-gradient(to left, #ff0080, #ff8c00, #40e0d0);
    background: linear-gradient(to left, #ff0080, #ff8c00, #40e0d0);
  }
`;

const FooterImage = styled.img``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonWithText = styled(StyledButton)`
  border: 5px solid black;
  border-radius: 0;
  background: #c4c4c4;
  color: black;
  flex: 1;
  line-height: 0;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  &:hover {
    background: black;
    color: white;
    transform: scale(1.05);
  }

  p:nth-child(1) {
    font-weight: normal;
    white-space: nowrap;
  }

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

// const SignIn = styled.div``;

const DetailForm = styled.form`
  display: flex;
  flex-direction: column;

  div {
    margin: 0 0 5px 0;
    border-radius: 5px;
    border: 1px solid black;
    background: white;
    padding: 10px;
    color: black;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      outline: none;
      border: none;
      letter-spacing: 1.5px;
    }
  }
`;
