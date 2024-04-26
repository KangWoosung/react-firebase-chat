/*   2024-04-25 00:00:37



*/
"use client";
import React from "react";
import LogInForm from "./loginForm/LogIn";
import SignUpForm from "./signupForm/SignUpForm";

const LogIn = () => {
  return (
    <div className="flex flex-row justify-center items-top gap-5 ">
      <LogInForm />
      <div className="sepatater "></div>
      <SignUpForm />
    </div>
  );
};

export default LogIn;
