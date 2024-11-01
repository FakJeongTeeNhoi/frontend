'use client'

import NavbarUser from "@/components/User/NavbarUser/NavbarUser";

export default function MyReservation() {
  return (
    <>
      <NavbarUser username={"mock"} role={"student"} focus="My Reservation" />
      <div>My Reservation Page</div>
    </>
  );
}
