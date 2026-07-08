import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../scss/adminDashboard.scss";

import {
  Users,
  UserCheck,
  Sprout,
  Bell,
  MessageSquare,
  TriangleAlert,
  CircleAlert,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

const userGrowth = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 260 },
  { month: "Apr", users: 340 },
  { month: "May", users: 470 },
  { month: "Jun", users: 610 },
];

const stats = [
  {
    title: "Total Users",
    value: "1,240",
    subtitle: "Registered farmers",
    change: "+14% vs last month",
    color: "blue",
    icon: <Users size={20} />,
  },
  {
    title: "Active Users",
    value: "892",
    subtitle: "Last 30 days",
    change: "+8% vs last month",
    color: "green",
    icon: <UserCheck size={20} />,
  },
  {
    title: "Recommendations",
    value: "2,852",
    subtitle: "Total generated",
    change: "+22% vs last month",
    color: "orange",
    icon: <Sprout size={20} />,
  },
  {
    title: "Notifications",
    value: "7,640",
    subtitle: "All time",
    change: "+5% vs last month",
    color: "purple",
    icon: <Bell size={20} />,
  },
  {
    title: "Feedback",
    value: "312",
    subtitle: "Across all types",
    change: "-2% vs last month",
    color: "red",
    negative: true,
    icon: <MessageSquare size={20} />,
  },
];

const progress = [
  {
    title: "Recommendation Accuracy",
    value: 87,
  },
  {
    title: "Notification Delivery",
    value: 96,
  },
  {
    title: "User Retention (30d)",
    value: 72,
  },
  {
    title: "Feedback Resolution",
    value: 64,
  },
  {
    title: "System Uptime",
    value: 99,
  },
];

const activity = [
  {
    icon: <Users size={16} className="admin-green-icon" />,
    text: "New user registered: Grace Villanueva (Cavite)",
    time: "2 min ago",
  },
  {
    icon: <Bell size={16} className="admin-blue-icon" />,
    text: "Weather alert sent to 1,240 users",
    time: "32 min ago",
  },
  {
    icon: <CircleAlert size={16} className="admin-red-icon" />,
    text: "Critical feedback received — Farm save issue",
    time: "1 hr ago",
  },
  {
    icon: <Sprout size={16} className="admin-orange-icon" />,
    text: "28 crop recommendations generated",
    time: "2 hr ago",
  },
  {
    icon: <TriangleAlert size={16} className="admin-yellow-icon" />,
    text: "Weather API latency increased (380ms)",
    time: "3 hr ago",
  },
];

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-dashboard">
        {/* Header */}

        <header className="admin-dashboard-header">
          <div>
            <h1>Overview</h1>
            <p>Platform-wide metrics at a glance</p>
          </div>

          <div className="admin-status">
            <div className="admin-warning">
              <TriangleAlert size={16} />
              <span>2 services degraded</span>
            </div>

            <div className="admin-live">
              <span className="admin-dot"></span>
              Live
            </div>

            <div className="admin-avatar">AD</div>
          </div>
        </header>

        {/* Statistic Cards */}

        <section className="admin-stats-grid">
          {stats.map((item, index) => (
            <div className="admin-card" key={index}>
              <div className={`admin-icon admin-${item.color}`}>
                {item.icon}
              </div>

              <p>{item.title}</p>

              <h2>{item.value}</h2>

              <small>{item.subtitle}</small>

              <span
                className={
                  item.negative ? "admin-red-text" : "admin-green-text"
                }
              >
                {item.negative ? "↓ " : "↑ "}
                {item.change}
              </span>
            </div>
          ))}
        </section>

        {/* Middle */}

        <section className="admin-middle">
          {/* Graph */}

          <div className="admin-card-large">
            <div className="admin-card-header">
              <h3>User Growth</h3>
            </div>

            <div className="admin-chart">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={userGrowth}>
                  <defs>
                    <linearGradient
                      id="colorUsers"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#3b82f6"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#edf2f7" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="users"
                    fill="url(#colorUsers)"
                    stroke="none"
                  />

                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary */}

          <div className="admin-card-large">
            <div className="admin-card-header">
              <h3>Platform Activity Summary</h3>
            </div>

            {progress.map((item, index) => (
              <div className="admin-progress-item" key={index}>
                <div className="admin-progress-top">
                  <span>{item.title}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="admin-progress">
                  <div
                    style={{
                      width: `${item.value}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}

        <section className="admin-card-large admin-activity">
          <div className="admin-card-header">
            <h3>Recent Activity</h3>
          </div>

          <ul>
            {activity.map((item, index) => (
              <li key={index}>
                <div className="activity-left">
                  {item.icon}
                  <span>{item.text}</span>
                </div>

                <span className="activity-time">{item.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;