import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
export default function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:1000/users");

      setUsers(res.data);
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  const deleteUser = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirm) {
      try {
        const res = await axios.delete(`http://localhost:1000/users/${id}`);

        console.log("res", res);

        // SUCCESS
        getUsers();
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="max-w-[500px] mx-auto py-[50px]">
      {users.map((user, index) => {
        return (
          <div
            key={index}
            className="bg-[#ddd] flex justify-between p-[15px] mb-3"
          >
            <div className="name">{user.name}</div>
            <div className="flex items-center gap-x-[15px]">
              <div>
                <Link href={`/users/${user.id}`}>Edit user</Link>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
