"use client";

import { useState } from "react";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import { useRouter } from "next/navigation";
import { register } from "@/api/auth";
import { useSession } from "next-auth/react";
import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";

export default function SignUp() {
  const { data: session } = useSession();
  const user = session ? session.user : null;
  const router = useRouter();
  if (user == null) {
    router.push("/staff/signIn");
  }
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signUpData = {
      email,
      password: "",
      name: `${firstName} ${lastName}`,
      faculty,
      type: "staff",
    };
    try {
      const result = await register(signUpData);
      if (result?.error) {
        console.error(result.error);
      } else {
        console.log("Sign Up Data: ", signUpData);
        router.push("/staff/verifyEmail");
      }
    } catch (error: unknown) {
      console.error("Register error", error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <NavbarAdmin
            username={user.name}
            role={user.type}
            focus="Dashboard"
          />
          <div className="min-w-fit h-screen min-h-fit bg-blue-50 flex justify-center items-center">
            <div className="w-[45%] min-w-fit m-auto space-y-[7%]">
              <h1 className="font-extrabold text-8xl text-gray-800">
                Register Staff
              </h1>

              {/* Form Section */}
              <div className="bg-gray-50 border border-gray-300 p-16 min-w-fit min-h-fit ">
                <form className="space-y-12" onSubmit={onSubmit}>
                  <div className="grid grid-cols-2 gap-8 px-2 pb-8 pt-2 rounded-[10px] border-b-2 border-gray-300">
                    <TextInput
                      id="firstName"
                      label="Firstname"
                      type="text"
                      placeholder="Firstname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextInput
                      id="lastName"
                      label="Lastname"
                      type="text"
                      placeholder="Lastname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextInput
                      id="email"
                      label="Chula Email"
                      type="email"
                      placeholder="Chula Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                      id="id"
                      label="Chula ID"
                      type="text"
                      placeholder="Chula ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      isHidden
                    />
                    <SelectInput
                      id="faculty"
                      label="Faculty"
                      placeholder="Faculty"
                      value={faculty}
                      onChange={setFaculty}
                    />
                  </div>

                  <div className="flex flex-row-reverse gap-x-[4%]">
                    <button
                      type="submit"
                      className=" text-white bg-blue-400 hover:bg-[#60A5FA] font-medium rounded-md h-12 py-3 px-7 w-44"
                    >
                      Create Account
                    </button>
                    <button
                      className=" text-gray-400 bg-white border border-gray-400 hover:text-[#3758F9] hover:border-[#D1D5DB] font-medium rounded-md h-12 py-3 px-7 w-44"
                      onClick={() => {
                        window.location.href = "/staff/spaceManagement";
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
