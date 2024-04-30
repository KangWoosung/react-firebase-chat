/*  2024-04-25 00:26:00


*/
"use client";
import { ReactNode, useEffect, useId, useState } from "react";
import { CiWarning } from "react-icons/ci";
import "./inputGroup.css";

type InputGroupProps = {
  errorMessage?: string;
  children: ReactNode;
};

export function InputGroup({ errorMessage = "", children }: InputGroupProps) {
  const [showError, setShowError] = useState(false);
  const reactId = useId();

  useEffect(() => {
    errorMessage.length > 0 && setShowError(true);
    return () => setShowError(false);
  }, [errorMessage.length]);

  return (
    <div
      className={`form-group relative w-[100%] ${
        errorMessage.length > 0 ? "error" : ""
      }`}
    >
      {children}
      <div
        key={reactId}
        className={`absolute min-h-6 flex flex-row justify-start items-center gap-2 py-0 px-3 mt-1 text-xs font-light 
        text-red-800 rounded-md w-[100%]  ease-in-out 
          duration-300 transition-all origin-top-right
          ${showError ? "bg-red-100 dark:bg-red-400 " : "bg-transparent"}
          `}
        role="alert"
      >
        {showError && (
          <>
            <span className="">
              <CiWarning />
            </span>{" "}
            {errorMessage}
          </>
        )}
        {/* <span className="font-medium">
          <CiWarning />
        </span>{" "}
        {errorMessage} */}
      </div>
      {/* {showError && errorMessage.length > 0 && (
        <div className="msg">{errorMessage}</div>
      )} */}
    </div>
  );
}
