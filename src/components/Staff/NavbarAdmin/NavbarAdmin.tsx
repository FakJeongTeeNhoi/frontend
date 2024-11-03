import Image from "next/image";
import DefaultButton from "../../Common/Buttons/DefaultButton";
import AccountBox from "../../Common/AccountBox/AccountBox";
import { signOut } from "next-auth/react";
import { logout } from "@/api/auth";

export type AdminPage = "Dashboard" | "Request" | "Space Management";
export default function NavbarAdmin({
  username,
  role,
  focus,
}: {
  username: string;
  role: string;
  focus: AdminPage;
}) {
  const navigationLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Request", href: "/request" },
    { name: "Space Management", href: "/spaceManagement" },
  ];
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-yellow-100 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            src="/admin_logo.png"
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
                href={`/staff/${link.href}`}
                className={`block mt-4 lg:inline-block lg:mt-0 ${
                  focus == link.name ? "text-gray-800" : "text-gray-400"
                } text-xl font-semibold hover:text-gray-600 mr-4`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-row justify-items-center items-center space-x-12">
            <AccountBox username={username} role={role} pageType={"Staff"} />
            <DefaultButton
              label="Log out"
              onClick={() => {
                logout();
                signOut({ callbackUrl: "/staff/signIn" });
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
