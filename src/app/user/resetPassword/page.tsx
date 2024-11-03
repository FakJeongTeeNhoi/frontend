"use client";

import { useState } from "react";
import TextInput from "./components/TextInput";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { changePassword } from "@/api/auth";
import ConfirmationModal from "./components/ConfirmModal";
import SuccessModal from "./components/SuccessModal";
import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";
import NavbarUser from "@/components/User/NavbarUser/NavbarUser";

export default function ResetPassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const { data: session } = useSession();
  const user = session ? session.user : null;
  if (user == null) {
    router.push("/user/signIn");
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!session || !session.token) {
      alert("You must be logged in to reset your password");
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);

    const resetPasswordData = {
      currentPassword,
      newPassword,
    };

    if (!session || !session.token) {
      alert("You must be logged in to reset your password");
      return;
    }

    try {
      const result = await changePassword(
        session.token,
        resetPasswordData.currentPassword,
        resetPasswordData.newPassword
      );
      if (result?.error) {
        console.error("Change password failed");
      } else {
        setIsSuccessModalOpen(true);
      }
    } catch (error: unknown) {
      console.error("Reset password error", error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <NavbarUser
            username={user.name}
            role={user.role || "User"}
            focus="Search"
          />
          <div className="min-w-fit h-screen min-h-fit bg-blue-50 flex justify-center items-center">
            <div className="w-[45%] min-w-fit m-auto space-y-[7%]">
              <h1 className="font-extrabold text-8xl text-gray-800 text-center">
                Reset Password
              </h1>

              {/* Form Section */}
              <div className="bg-gray-50 border border-gray-300 p-16 min-w-fit min-h-fit">
                <form className="space-y-12" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 gap-8 px-2 pb-8 pt-2 rounded-[10px] border-b-2 border-gray-300">
                    <TextInput
                      id="currentPassword"
                      label="Your Password"
                      type="password"
                      placeholder="Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextInput
                      id="newPassword"
                      label="New Password"
                      type="password"
                      placeholder="Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextInput
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      placeholder="Re-enter Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-row-reverse gap-x-[4%]">
                    <button
                      type="submit"
                      className="text-white bg-blue-400 hover:bg-[#60A5FA] font-medium rounded-md h-12 py-3 px-7 w-44"
                    >
                      Reset
                    </button>
                    <button
                      type="button" // Change this to "button" to avoid form submission
                      className="text-gray-400 bg-white border border-gray-400 hover:text-[#3758F9] hover:border-[#D1D5DB] font-medium rounded-md h-12 py-3 px-7 w-44"
                      onClick={() => router.push("/user/search")}
                    >
                      Skip for now
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirm}
            />
            <SuccessModal isOpen={isSuccessModalOpen} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
