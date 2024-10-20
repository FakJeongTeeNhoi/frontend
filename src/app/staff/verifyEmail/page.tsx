"use client";

import icon from "../../../assets/VerifyEmail/icon.png";
import ResendEmailModal from "./component/ResendEmailModal";
import Image from "next/image";

export default function VerifyEmail() {
  const sendEmail = () => {
    try {
      console.log("resent email");
    } catch (error: unknown) {
      console.error("Error sending email:", error);
    }
  };
  return (
    <div className="min-w-fit h-screen min-h-fit bg-blue-50 flex justify-center items-center">
      <div className="grid bg-white mt-[14%] mx-auto w-[75%] h-[86%] min-h-fit shadow-signIn text-center gap-y-8 py-10 px-4">
        <Image src={icon} alt="Email Verification Icon" className="mx-auto" />
        <div>
          <h1 className="text-gray-800 font-semibold text-2xl">
            Almost There!
          </h1>
          <h1 className="text-gray-800 font-semibold text-xl mt-2">
            Verify your email address
          </h1>
          <p className="text-[#8899A8] mt-4">
            A verification email has been sent to your inbox.
            <br />
            Please check your email and click the link to complete your
            registration.
          </p>
        </div>
        <ResendEmailModal onClick={sendEmail} />
      </div>
    </div>
  );
}
