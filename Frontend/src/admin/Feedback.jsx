import React, { useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../scss/adminFeedback.scss";

import {
  Search,
  Check,
  Trash2,
  Clock3,
} from "lucide-react";

const initialFeedback = [
  {
    id: 1,
    initials: "MS",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    type: "Bug Report",
    priority: "High",
    status: "Open",
    message:
      "The weather page shows incorrect rainfall data for my region. It seems to be showing data from a different province.",
    date: "2026-06-14 09:15",
  },
  {
    id: 2,
    initials: "JC",
    name: "Juan dela Cruz",
    email: "juan.dc@email.com",
    type: "Feature Request",
    priority: "Medium",
    status: "Resolved",
    message:
      "It would be helpful to have a crop calendar feature that shows optimal planting and harvesting dates based on my location.",
    date: "2026-06-13 14:30",
  },
  {
    id: 3,
    initials: "FT",
    name: "Felix Tan",
    email: "felix.tan@agri.com",
    type: "General Feedback",
    priority: "Low",
    status: "Resolved",
    message:
      "The crop recommendation system is very accurate! It helped me decide to plant corn this season and I got great results.",
    date: "2026-06-13 11:00",
  },
  {
    id: 4,
    initials: "GV",
    name: "Grace Villanueva",
    email: "grace.v@email.com",
    type: "Bug Report",
    priority: "Critical",
    status: "Open",
    message:
      "Cannot save my farm records. The save button shows a spinner but nothing gets saved. This has been happening for two days.",
    date: "2026-06-12 16:45",
  },
  {
    id: 5,
    initials: "RL",
    name: "Roberto Lim",
    email: "rlim@agriph.net",
    type: "Feature Request",
    priority: "Medium",
    status: "Open",
    message:
      "Please add support for multiple farm locations under one account. I manage three different farms.",
    date: "2026-06-12 10:20",
  },
  {
    id: 6,
    initials: "LR",
    name: "Luz Ramos",
    email: "lramos@gmail.com",
    type: "General Feedback",
    priority: "Low",
    status: "Open",
    message:
      "The soil analysis tool needs more detail on micronutrient recommendations. Would love to see copper and zinc guidance.",
    date: "2026-06-11 13:30",
  },
];

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(initialFeedback);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Types");

  const filteredFeedback = useMemo(() => {
    return feedbacks.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All Types" || item.type === filter;

      return matchSearch && matchFilter;
    });
  }, [feedbacks, search, filter]);

  const total = feedbacks.length;

  const open = feedbacks.filter(
    (f) => f.status === "Open"
  ).length;

  const resolved = feedbacks.filter(
    (f) => f.status === "Resolved"
  ).length;

  const critical = feedbacks.filter(
    (f) => f.priority === "Critical"
  ).length;

  const resolveFeedback = (id) => {
    setFeedbacks((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Resolved" }
          : item
      )
    );
  };

  const deleteFeedback = (id) => {
    setFeedbacks((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <AdminSidebar />

      <div className="feedback">

        <div className="feedbackHeader">

          <div>
            <h1>Feedback Management</h1>
            <p>{open} open items</p>
          </div>

          <div className="feedbackActions">

            <div className="searchBox">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search feedback..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option>All Types</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>General Feedback</option>
            </select>

          </div>

        </div>

        <div className="feedbackStats">

          <div className="statCard">
            <h2>{total}</h2>
            <p>Total</p>
          </div>

          <div className="statCard">
            <h2 className="blue">{open}</h2>
            <p>Open</p>
          </div>

          <div className="statCard">
            <h2 className="green">{resolved}</h2>
            <p>Resolved</p>
          </div>

          <div className="statCard">
            <h2 className="red">{critical}</h2>
            <p>Critical</p>
          </div>

        </div>

        {/* Feedback list starts here */}
                <div className="feedbackList">
          {filteredFeedback.map((item) => (
            <div className="feedbackCard" key={item.id}>
              {/* Left Section */}
              <div className="feedbackLeft">
                <div className="avatar">{item.initials}</div>

                <div className="feedbackContent">
                  <div className="feedbackTop">
                    <div className="userInfo">
                      <h3>{item.name}</h3>
                      <span>{item.email}</span>
                    </div>

                    <div className="badges">
                      <span
                        className={`badge type ${item.type
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {item.type}
                      </span>

                      <span
                        className={`badge priority ${item.priority.toLowerCase()}`}
                      >
                        {item.priority}
                      </span>

                      <span
                        className={`badge status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <p className="message">{item.message}</p>

                  <div className="date">
                    <Clock3 size={14} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}

              <div className="feedbackButtons">
                {item.status === "Open" && (
                  <button
                    className="resolveBtn"
                    onClick={() => resolveFeedback(item.id)}
                  >
                    <Check size={16} />
                    Resolve
                  </button>
                )}

                <button
                  className="deleteBtn"
                  onClick={() => deleteFeedback(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feedback;