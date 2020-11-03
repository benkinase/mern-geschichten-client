import React from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function UsersList() {
  const { users } = React.useContext(AuthContext);
  return (
    <div>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
