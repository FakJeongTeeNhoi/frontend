"use client";
import NavbarUser from "@/components/User/NavbarUser/NavbarUser";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SelectInput from "./components/SelectInput";
import TextInput from "./components/TextInput";
import DefaultButton from "@/components/Common/Buttons/DefaultButton";
import { updateUser, UpdateUser } from "@/api/user";

export default function Account() {
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
  const [role, setRole] = useState<string>("");

  const fetchUser = async () => {
    if (user) {
      try {
        const [name, lastname] = user.name.split(" ");
        setFirstName(name);
        setLastName(lastname);
        setEmail(user.email);
        setFaculty(user.faculty);
        setId(user.user_id || "");
        setRole(user.role || "");
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      console.error("User is not defined");
      return;
    }

    const updatedName = `${firstName} ${lastName}`;
    const updatedUserData: UpdateUser = {
      account_id: user.account_id,
      user_id: id,
      name: updatedName,
      faculty: faculty,
      type: "user",
      role: role,
    };

    try {
      const response = await updateUser(updatedUserData);

      if (response.success) {
        fetchUser();
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFirstName(user.name.split(" ")[0] || "");
      setLastName(user.name.split(" ")[1] || "");
      setEmail(user.email || "");
      setFaculty(user.faculty || "");
      setId(user.user_id || "");
      setRole(user.role || "");
    }
  };

  return (
    <>
      {user ? (
        <>
          <NavbarUser username={user.name} role={user.type} focus="Search" />
          <div className="w-[45%] min-w-fit m-auto space-y-[7%]">
            <h1 className="font-extrabold text-gray-800 text-5xl leading-9 mt-[7%]">
              Account Management
            </h1>
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
                      disable={true}
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
                      selectType="faculty"
                      id="faculty"
                      label="Faculty"
                      placeholder={faculty}
                      value={faculty}
                      onChange={setFaculty}
                    />
                    <SelectInput
                      selectType="role"
                      id="role"
                      label="Role"
                      placeholder={role}
                      value={role}
                      onChange={setRole}
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
                  <DefaultButton
                    label="Save"
                    onClick={() => {
                      onSubmit;
                    }}
                  />
                  <button
                    className=" text-gray-400 bg-white border border-gray-400 hover:text-[#3758F9] hover:border-[#D1D5DB] font-medium rounded-md h-12 py-3 px-7 w-44"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
