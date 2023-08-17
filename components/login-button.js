"use client"; 

import { useSession, signIn } from "next-auth/react";

const Login = () => {
  const session = useSession();
  console.log(session);
  return (
    <>
      <button onClick={() => signIn("google")}>sign in</button>
    </>
  );
};

export default Login;
