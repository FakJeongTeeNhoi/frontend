"use client";

import { signIn, useSession } from "next-auth/react";
import icon from "../../../assets/VerifyEmail/icon.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const token = searchParams.get("token");
  const session = useSession();
  console.log(session);

  useEffect(() => {
    if (token) {
      const autoLogin = async () => {
        const response = await signIn("credentials", {
          token,
          redirect: false,
        });
        if (response?.error) {
          console.log("Error");
        }
        console.log("Success");
      };

      autoLogin();
    } else {
      console.log("Auto-login failed. Please try again.");
    }
  }, [token]);

  return (
    <div className="min-w-fit h-screen min-h-fit bg-blue-50 flex justify-center items-center">
      <div className="grid bg-white mt-[1%] mx-auto w-[75%] h-[86%] min-h-fit shadow-signIn text-center gap-[6%] py-10 px-4">
        <Image src={icon} alt="Email Verification Icon" className="mx-auto" />
        <div className="grid gap-[19%]">
          <div>
            <h1 className="text-gray-800 font-semibold text-2xl">Verified</h1>
            <p className="text-[#9CA3AF] text-2xl leading-loose">
              You account has successfully created.
            </p>
            <div className="border border-[#DFE4EA] w-1/2 mx-auto leading-[3rem]" />
          </div>
          <div>
            <p className="text-[#9CA3AF] text-2xl leading-loose">
              Welcome, {name}
            </p>

            <button
              className=" text-white bg-blue-400 hover:bg-[#60A5FA] font-medium rounded-md h-12 py-3 px-7 w-fit"
              onClick={() => {
                window.location.href = "/user/resetPassword";
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
