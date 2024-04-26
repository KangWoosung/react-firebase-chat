/*   2024-04-25 00:12:33



*/
"use client";
import { InputGroup } from "@/app/util/InputGroup";
import { SignUpSchemaType, signUpSchema } from "@/app/zodSchemas/logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "@/app/lib/upload";

type UploadFileType = {
  file: File | null;
  url: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) });

  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState<UploadFileType>({
    file: null,
    url: "",
  });

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleAvatar");
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar({ file, url });
    }
  };

  const handleRegister = async (data: SignUpSchemaType) => {
    setLoading(true);
    const { email, password, userName } = data;
    console.log(userName);
    // console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    console.log(avatar.file);
    // return;

    try {
      // Auth Request
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      // upload avatar
      let imgUrl;
      if (avatar.file) {
        imgUrl = await upload(avatar.file);
        console.log(imgUrl);
      }

      // Create New User
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        userName,
        email,
        avatar: imgUrl,
        blocked: [],
      });

      // Create New Chat
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      // Success Notification
      toast.success("Account created. You can now log in.", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message, {
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
      <h2 className="my-8 text-2xl">Create an account</h2>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col justify-center items-center gap-12"
      >
        <InputGroup errorMessage={errors.userName?.message as string}>
          <label
            htmlFor="avatar"
            className="flex flex-row justify-start items-center gap-2 underline cursor-pointer"
          >
            <img
              src={avatar.url || "/avatar.png"}
              alt=""
              className="w-16 h-16 rounded-full object-cover opacity-60"
            />
            <span>Upload image</span>
          </label>
          <input
            {...register("avatar")}
            id="avatar"
            type="file"
            placeholder="Upload image"
            className=" hidden "
            onChange={handleAvatar}
          />
        </InputGroup>
        <InputGroup errorMessage={errors.userName?.message as string}>
          <input
            {...register("userName")}
            id="userName"
            type="text"
            placeholder="userName"
            className="peer rounded-md border-2 outline-0 p-2 w-[100%] font-light text-slate-300 
            placeholder-transparent
            bg-[color:var(--chat-bubble-background-color)] 
            border-transparent
            focus:border-[color:var(--chat-bubble-deep-background-color)]
            z-0"
          />
          <label
            htmlFor="userName"
            className="absolute left-2 -top-5 text-gray-300 text-sm
            transition-all
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-3
            peer-focus:-top-5
            peer-focus:text-gray-300 peer-focus:text-sm
            "
          >
            userName
          </label>
        </InputGroup>
        <InputGroup errorMessage={errors.email?.message as string}>
          <input
            {...register("email")}
            id="signUpEmail"
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
            htmlFor="signUpEmail"
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
            id="signUpPassword"
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
            htmlFor="signUpPassword"
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
          className={`w-[100%] rounded-md py-4 px-5 
          bg-[color:var(--positive-background-color)]
          hover:bg-[color:var(--positive-deep-background-color)]
          disabled:bg-[color:var(--input-background-disabled-color)]
          disabled:cursor-not-allowed
          `}
        >
          {loading ? "Loading" : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
