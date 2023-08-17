"use client";

import AuthProvider from "../components/AuthProvider/AuthProvider";
import LoginButton from "../components/login-button";

const Home = () => {
  return (
    <>
      <AuthProvider>
        <LoginButton></LoginButton>
      </AuthProvider>
    </>
  );
};

export default Home;
