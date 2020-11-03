import React from "react";
import Stories from "./Stories";
import UsersList from "./UsersList";

export default function Dashboard() {
  return (
    <div className="">
      <Stories />
      <UsersList />
    </div>
  );
}
