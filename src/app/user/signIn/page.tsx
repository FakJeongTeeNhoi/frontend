"use client";

import Image from "next/image";
import { useState } from "react";
import shapes from "../../../assets/SignIn/shapes.svg";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      console.log("Login Data: ", loginData);
      window.location.href = "/user/signUp";
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="absolute w-screen min-w-fit h-screen min-h-fit bg-blue-50 flex justify-center items-center">
      <div className="absolute w-1/3 h-full top-0 right-0 bg-yellow-200" />
      <div className="relative bg-white w-1/2 min-w-[800px] h-[550px] grid grid-cols-2 items-center shadow-signIn">
        {/* Form Section */}
        <div className="w-full flex flex-col p-8 gap-y-10">
          <h1 className="text-3xl font-bold text-[#212B36]">Sign In</h1>
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-[#111928] dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                className="bg-white border border-[#DFE4EA] text-[#637381] rounded-md block w-full h-12 p-2.5 focus:border-[#3758F9] focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-[#111928] dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                className="bg-white border border-[#DFE4EA] text-[#637381] rounded-md block w-full h-12 p-2.5 focus:border-[#3758F9] focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className=" text-white bg-blue-400 hover:bg-[#60A5FA] font-medium rounded-md h-12 p-2.5 w-full"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-full">
          <Image
            src={shapes}
            alt="Decorative shapes"
            layout="fill"
            objectFit="cover"
            className="absolute top-0 right-0"
          />
        </div>
      </div>
    </div>
  );
}