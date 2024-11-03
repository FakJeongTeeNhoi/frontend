import Image from "next/image";
import DefaultButton from "../../Common/Buttons/DefaultButton";
import { signOut } from "next-auth/react";
import AccountBox from "@/components/Common/AccountBox/AccountBox";
import { logout } from "@/api/auth";

export type UserPage = "Search" | "My Reservation";
export default function NavbarUser({
  username,
  role,
  focus,
}: {
  username: string;
  role: string;
  focus: UserPage;
}) {
  const navigationLinks = [
    { name: "Search", href: "/search" },
    { name: "My Reservation", href: "/myReservation" },
  ];
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-yellow-100 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            src="/user_logo.png"
            alt="fakjeongteenhoi logo"
            width={300}
            height={50}
          />
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={`/user/${link.href}`}
                className={`block mt-4 lg:inline-block lg:mt-0 ${
                  focus == link.name ? "text-gray-800" : "text-gray-400"
                } text-xl font-semibold hover:text-gray-600 mr-4`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-row justify-items-center items-center space-x-12">
            <AccountBox username={username} role={role} pageType={"User"} />
            <DefaultButton
              label="Log out"
              onClick={() => {
                logout();
                signOut({ callbackUrl: "/user/signIn" });
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
