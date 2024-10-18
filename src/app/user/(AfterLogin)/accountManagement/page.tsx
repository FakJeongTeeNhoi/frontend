"use client";

import { useState } from "react";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";

export default function accountManagement() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signUpData = {
      firstName,
      lastName,
      email,
      id,
      faculty,
      role: "user",
    };

    try {
      console.log("Sign Up Data: ", signUpData);
      window.location.href = "/user/verifyEmail";
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="min-w-fit h-screen min-h-fit bg-blue-50 flex justify-center items-center">
      <div className="w-[45%] min-w-fit m-auto space-y-[7%]">
        <h1 className="font-extrabold text-gray-800 text-5xl leading-9 mt-[7%]">
          Account Management
        </h1>

        {/* Form Section */}
        <div className="bg-gray-50 border border-gray-300 p-16 min-w-fit min-h-fit ">
          <form className="space-y-12" onSubmit={onSubmit}>
            <div className="px-2 pb-8 pt-2 rounded-lg border-b-2 border-gray-300 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <TextInput
                  id="firstName"
                  label="Firstname"
                  type="text"
                  placeholder={firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextInput
                  id="lastName"
                  label="Lastname"
                  type="text"
                  placeholder={lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextInput
                  id="email"
                  label="Chula Email"
                  type="email"
                  placeholder={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                  id="id"
                  label="Chual ID"
                  type="text"
                  placeholder={id}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <SelectInput
                  id="faculty"
                  label="Faculty"
                  placeholder={faculty}
                  value={faculty}
                  onChange={setFaculty}
                />
              </div>
              <div className="flex flex-row items-center space-x-5">
                <label
                  htmlFor={id}
                  className="font-medium text-[#111928] dark:text-white"
                >
                  Password:
                </label>
                <button
                  className=" text-[#111928] bg-white border border-gray-400 hover:text-[#3758F9] hover:border-[#D1D5DB] font-medium rounded-md h-12 py-3 px-7 w-fit"
                  onClick={() => {
                    window.location.href = "/user/resetPassword";
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>

            <div className="flex flex-row-reverse gap-x-[4%]">
              <button
                type="submit"
                className=" text-white bg-blue-400 hover:bg-[#60A5FA] font-medium rounded-md h-12 py-3 px-7 w-fit"
              >
                Save
              </button>
              <button
                className=" text-gray-400 bg-white border border-gray-400 hover:text-[#3758F9] hover:border-[#D1D5DB] font-medium rounded-md h-12 py-3 px-7 w-44"
                onClick={() => {
                  window.location.href = "/user/signIn";
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
