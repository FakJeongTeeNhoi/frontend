"use client";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";
import { CreateNewStaffButton } from "@/components/Staff/SpaceManagement/CreateNewStaffButton/CreateNewStaffButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SpaceManagement() {
  const { data: session } = useSession();
  const user = session ? session.user : null;
  const router = useRouter();
  if (user == null) {
    router.push("/staff/signIn");
  }

  const breadcrumbItems = [
    { label: "Space Management", href: "/staff/spaceManagement" },
  ];

  return (
    <>
      {user ? (
        <>
          <NavbarAdmin
            username={user.name}
            role={user.type}
            focus="Space Management"
          />
          <div className="flex flex-col py-16 px-32">
            <div className="flex flex-row justify-between items-center w-full">
              <Breadcrumb items={breadcrumbItems} />
              <CreateNewStaffButton
                onClick={() => {
                  router.push("/staff/signUp");
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
