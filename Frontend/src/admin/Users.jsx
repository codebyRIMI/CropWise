// import React from "react";
// import AdminSidebar from "../components/AdminSidebar";


// const Users = () => {
//   return (
//     <>
//      <AdminSidebar />
//       <div>
//         <h1>Users</h1>
//       </div>
//     </>
//   )
// }

// export default Users


import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../scss/adminUser.scss";

import {
  Search,
  UserCog,
  CircleAlert,
} from "lucide-react";

const usersData = [
  {
    id: 1,
    initials: "MS",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    region: "Central Luzon",
    status: "Active",
    registered: "2024-01-15",
    login: "2026-06-14",
    recommendations: 24,
  },
  {
    id: 2,
    initials: "JC",
    name: "Juan dela Cruz",
    email: "juan.dc@email.com",
    region: "Ilocos Norte",
    status: "Active",
    registered: "2024-02-20",
    login: "2026-06-13",
    recommendations: 18,
  },
  {
    id: 3,
    initials: "AR",
    name: "Ana Reyes",
    email: "ana.reyes@farm.ph",
    region: "Davao",
    status: "Inactive",
    registered: "2024-03-10",
    login: "2026-04-02",
    recommendations: 9,
  },
  {
    id: 4,
    initials: "RL",
    name: "Roberto Lim",
    email: "rlim@agriph.net",
    region: "Pampanga",
    status: "Active",
    registered: "2024-03-22",
    login: "2026-06-14",
    recommendations: 31,
  },
  {
    id: 5,
    initials: "CO",
    name: "Celine Ocampo",
    email: "c.ocampo@gmail.com",
    region: "Bukidnon",
    status: "Suspended",
    registered: "2024-04-05",
    login: "2026-05-20",
    recommendations: 5,
  },
  {
    id: 6,
    initials: "FT",
    name: "Felix Tan",
    email: "felix.tan@agri.com",
    region: "Nueva Ecija",
    status: "Active",
    registered: "2024-04-18",
    login: "2026-06-12",
    recommendations: 42,
  },
  {
    id: 7,
    initials: "LR",
    name: "Luz Ramos",
    email: "lramos@gmail.com",
    region: "Batangas",
    status: "Active",
    registered: "2024-05-01",
    login: "2026-06-11",
    recommendations: 15,
  },
  {
    id: 8,
    initials: "DC",
    name: "Dennis Cruz",
    email: "dcruz@farm.ph",
    region: "Laguna",
    status: "Inactive",
    registered: "2024-05-14",
    login: "2026-03-15",
    recommendations: 7,
  },
  {
    id: 9,
    initials: "GV",
    name: "Grace Villanueva",
    email: "grace.v@email.com",
    region: "Cavite",
    status: "Active",
    registered: "2024-06-02",
    login: "2026-06-14",
    recommendations: 28,
  },
  {
    id: 10,
    initials: "EB",
    name: "Ernesto Bautista",
    email: "e.bautista@agri.ph",
    region: "Rizal",
    status: "Active",
    registered: "2024-06-20",
    login: "2026-06-10",
    recommendations: 20,
  },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ? true : user.status === filter;

    return matchesSearch && matchesFilter;
  });

  const active = usersData.filter((u) => u.status === "Active").length;
  const inactive = usersData.filter((u) => u.status === "Inactive").length;
  const suspended = usersData.filter((u) => u.status === "Suspended").length;

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="users-page">
        <div className="users-header">
          <div>
            <h2>User Management</h2>
            <p>{usersData.length} registered users</p>
          </div>

          <div className="users-controls">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              {["All", "Active", "Inactive", "Suspended"].map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Region</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Last Login</th>
                <th>Recommendations</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="avatar">{user.initials}</div>

                      <div>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td>{user.region}</td>

                  <td>
                    <span
                      className={`status ${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>{user.registered}</td>

                  <td>{user.login}</td>

                  <td>
                    <strong>{user.recommendations}</strong>
                  </td>

                  <td>
                    <div className="actions">
                      <UserCog size={18} />
                      <CircleAlert size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="summary-cards">
          <div className="summary green">
            <h2>{active}</h2>
            <p>Active Users</p>
          </div>

          <div className="summary gray">
            <h2>{inactive}</h2>
            <p>Inactive Users</p>
          </div>

          <div className="summary red">
            <h2>{suspended}</h2>
            <p>Suspended Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;