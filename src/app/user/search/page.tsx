'use client'

import NavbarUser from "@/components/User/NavbarUser/NavbarUser";

export default function Search() {
  return (
    <>
      <NavbarUser username={"mock"} role={"student"} focus="Search" />
      <div>Search Page</div>
    </>
  );
}
