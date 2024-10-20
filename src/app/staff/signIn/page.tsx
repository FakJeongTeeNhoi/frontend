"use client";

import Image from "next/image";
import { useState } from "react";
import shapes from "../../../assets/SignIn/staff_shapes.svg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      console.log(loginData);
      const result = await signIn("credentials", {
        ...loginData,
        redirect: false,
      });
      console.log(result);
      if (result?.error) {
        console.error("SignIn failed");
      } else {
        router.push("/staff/spaceManagement");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="absolute w-screen min-w-fit h-screen min-h-fit bg-blue-50 flex justify-center items-center">
      <div className="absolute w-1/3 h-full top-0 right-0 bg-yellow-200" />

      <div className="relative bg-white w-[77%] min-w-fit h-[56%] min-h-fit grid grid-cols-2 items-center shadow-signIn">
        {/* Form Section */}
        <div className="w-full flex flex-col px-[7%] py-[11%] gap-10">
          <h1 className="text-3xl font-bold text-[#212B36]">Sign In</h1>
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-[#111928]"
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
                className="block mb-1 font-medium text-[#111928] "
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
              className=" text-white bg-blue-400 hover:bg-[#60A5FA] font-medium rounded-md h-12 py-3 px-7 w-full"
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
            className="absolute object-right-top"
          />
        </div>
      </div>
    </div>
  );
}
