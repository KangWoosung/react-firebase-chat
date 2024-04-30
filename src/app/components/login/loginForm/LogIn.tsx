/*   2024-04-25 00:13:11

2024-04-26 06:32:57
우려했던대로,
변수와 상태명들을 lamadev 코드대로 무작정 따라 가다보니, 스파게티가 되어 버렸다.
시간이 좀 걸리더라도, imperative 한 네이밍 규칙을 따라 리네이밍 한 뒤에 context 작업에 들어가야 하겠다. 
일단 로그아웃 까지는 만들어보자. 

*/
"use client";
import { InputGroup } from "@/app/util/InputGroup";
import { LogInSchemaType, logInSchema } from "@/app/zodSchemas/logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { User as FirebaseUser } from "firebase/auth";
import { UserType } from "@/app/types/userType";

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInSchemaType>({ resolver: zodResolver(logInSchema) });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LogInSchemaType) => {
    setLoading(true);
    console.log(data);

    const { email, password } = data;
    try {
      // 이 부분이 가장 혼란스러웠던 것 같다.
      // signIn 처리후, res 리턴 객체를 저장하거나 몰고 다녀야 하는 것으로 생각했는데,
      // user 객체는, onAuthStateChanged 펑션에서 자동으로 확보되는 것이었다.
      // 로그인 액션 처리는 이 한줄이 전부다...
      const res = await signInWithEmailAndPassword(auth, email, password);

      toast.success("Log in success", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item flex flex-col p-6 gap-5 min-w-[70%]">
      <h2 className="my-8 text-2xl">Welcome Back</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-12"
      >
        <InputGroup errorMessage={errors.email?.message as string}>
          <input
            {...register("email")}
            id="logInEmail"
            type="text"
            placeholder="Email"
            className="peer rounded-md border-2 outline-0 p-2 w-[100%] font-light text-slate-300 
            placeholder-transparent
            bg-[color:var(--chat-bubble-background-color)] 
            border-transparent
            focus:border-[color:var(--chat-bubble-deep-background-color)]
            z-0
            "
          />
          <label
            htmlFor="logInEmail"
            className="absolute left-2 -top-5 text-gray-300 text-sm
            transition-all
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-3
            peer-focus:-top-5
            peer-focus:text-gray-300 peer-focus:text-sm
            "
          >
            Email
          </label>
        </InputGroup>
        <InputGroup errorMessage={errors.password?.message as string}>
          <input
            {...register("password")}
            id="logInPassword"
            type="password"
            placeholder="Password"
            className="peer rounded-md border-2 outline-0 p-2 w-[100%] font-light text-slate-300 
            placeholder-transparent
            bg-[color:var(--chat-bubble-background-color)] 
            border-transparent
            focus:border-[color:var(--chat-bubble-deep-background-color)]
            z-0
            "
          />
          <label
            htmlFor="logInPassword"
            className="absolute left-2 -top-5 text-gray-300 text-sm
            transition-all
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-3
            peer-focus:-top-5
            peer-focus:text-gray-300 peer-focus:text-sm
            "
          >
            Password
          </label>
        </InputGroup>

        <button
          disabled={loading}
          type="submit"
          className="w-[100%] rounded-md py-4 px-5 
          bg-[color:var(--positive-background-color)]
          hover:bg-[color:var(--positive-deep-background-color)]          
          disabled:bg-[color:var(--input-background-disabled-color)]
          disabled:cursor-not-allowed
          "
        >
          {loading ? "Loading" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LogInForm;

// type FirebaseUserType = FirebaseUser & {
//   uid: string;
//   userName: string;
//   avatar: string;
// };

// const convertFirebaseUserToUserType = (
//   firebaseUser: FirebaseUserType
// ): UserType => {
//   return {
//     uid: firebaseUser.uid,
//     email: firebaseUser.email ?? "",
//     userName: firebaseUser.userName ?? "Unknown User",
//     avatar: firebaseUser.avatar ?? "",
//     blocked: [],
//   };
// };
