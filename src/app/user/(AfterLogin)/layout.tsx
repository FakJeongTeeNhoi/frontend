"use client";
import logo from "../../../assets/AccountManagement/logo.png";
import userIcon from "../../../assets/AccountManagement/user.png";
import Image from "next/image";
import Link from "next/link";

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // need name and user_role
  const name = "Moodeng";
  const role = "Student";

  return (
    <div>
      <nav className="bg-yellow-100 dark:bg-gray-900 w-full min-w-fit">
        <div className="w-full grid grid-cols-2 items-center justify-between px-[3%] pt-3 pb-[2px] gap-5">
          <div className="flex gap-10 items-center">
            <Link href="/user/search">
              <Image
                src={logo}
                alt="logo"
                className="min-w-[180px] min-h-[50px]" // Adjust dimensions
              />
            </Link>

            <div className="hidden md:flex gap-10 items-center">
              <Link
                href="/user/signIn"
                className="text-[#637381] text-xl font-medium leading-6 focus:text-[#111928] focus:font-semibold"
              >
                Search
              </Link>
              <Link
                href="/user/signIn"
                className="text-[#637381] text-xl font-medium leading-6 focus:text-[#111928] focus:font-semibold"
              >
                Reservation
              </Link>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-end">
            <div className="flex bg-gray-50 rounded-lg border border-gray-300 px-4 py-1 gap-3 items-center">
              <Image src={userIcon} alt="user icon" className="w-10 h-10" />
              <div>
                <p className="text-gray-800 leading-6 font-medium">
                  Hello, <span className="italic font-bold">{name}</span>
                </p>
                <p className="text-gray-800 font-medium leading-6">
                  Role: {role}
                </p>
              </div>
            </div>
            <button className=" text-white bg-blue-400 hover:bg-[#60A5FA] font-medium rounded-md h-12 py-3 px-7 w-fit">
              Log out
            </button>
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
