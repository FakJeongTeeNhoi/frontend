import UserIcon from "../Icons/UserIcon";

export type PageType = "User" | "Staff";

export default function AccountBox({
  username,
  role,
  pageType,
}: {
  username: string;
  role: string;
  pageType: PageType;
}) {
  const accountPath = (pageType == "User" ? "/user" : "/staff") + "/account";
  return (
    <>
      <div className="flex flex-row items-center px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded space-x-4">
        <a
          className="hover:bg-blue-400 rounded-full p-1 cursor-pointer"
          href={accountPath}
        >
          <UserIcon width={40} height={40} color="#FDE68A" />
        </a>
        <div className="flex flex-col text-lg text-gray-800">
          <div>
            Hello, <span className="font-semibold italic">{username}</span>{" "}
          </div>
          <div className="font-medium">Role: {role}</div>
        </div>
      </div>
    </>
  );
}
