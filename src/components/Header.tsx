import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";
import { auth } from "../firebaseConfig";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserToStore(user);
        if (history.location.pathname === "/login") {
          history.push("/");
        }
      } else history.push("/login");
    });
  }, [userEmail]);

  const handleAuth = () => {
    if (userEmail) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/login");
        })
        .catch((error) => alert(error.message));
    }
  };

  type userType = {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  };

  const setUserToStore = (user: userType | any) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <a href="/">
        <Logo src="/images/logo.svg" alt="DisneyLogo" />
      </a>
      {/* Change userEmail to userName and change at line 94 */}
      {userEmail ? (
        <MenuDiv>
          <NavMenu>
            {/* <Link to="/">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </Link>
            <Link to="/">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </Link>
            <Link to="/">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </Link>
            <Link to="/">
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </Link> */}
            <Link to="/upload">
              <span>UPLOAD</span>
            </Link>
          </NavMenu>
          <SignOutButton>
            {userPhoto ? (
              <UserImg src={userPhoto} alt="User Image" />
            ) : (
              <p>{userEmail?.toUpperCase().charAt(0) ?? "U"}</p>
            )}
            <span onClick={handleAuth}>SignOut</span>
          </SignOutButton>
        </MenuDiv>
      ) : (
        <a href="/login">
          <LoginButton>Login</LoginButton>
        </a>
      )}
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background: #090b13;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 36px;
`;

const Logo = styled.img`
  width: 80px;
`;

const MenuDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavMenu = styled.div`
  // display: flex;
  // align-items: center;
  // margin-left: 25px;
  // flex: 1;

  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        background-color: white;
        height: 2px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }

    // @media only screen and (max-width: 890px) {
    //   display: none;
    // }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const LoginButton = styled.button`
  background: transparent;
  color: white;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 5px;
  outline: none;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 13px;
  margin-right: 50px;

  @media only screen and (max-width: 890px) {
    margin-right: 20px;
  }
`;

const SignOutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0;
  margin-right: 50px;

  p {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid silver;
    color: gold;
    font-weight: bolder;
    font-size: 20px;
    background-color: #2cd92c;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    padding: 5px;
    position: absolute;
    opacity: 0;
    background-color: black;
    border: 1px solid white;
    border-radius: 8px;
    cursor: pointer;
  }

  &:hover {
    span {
      opacity: 1;
      transition-duration: 1s;
    }
  }

  @media only screen and (max-width: 890px) {
    margin-right: 20px;
  }
`;
