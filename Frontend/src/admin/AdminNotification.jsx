import React, {
  useEffect,
  useState,
} from "react";


import AdminSidebar from "../components/AdminSidebar";
import "../scss/adminNotification.scss";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";


import {
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";


import {
  getDashboard,
  searchNotificationHistory,
} from "../api/adminNotificationApi.js";



const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#64748b",
];


const renderLegend = (props) => {
  const { payload } = props;

  return (
    <ul className="custom-legend">
      {payload.map((entry, index) => (
        <li
          key={entry.value}
          style={{
            color:
              COLORS[
                index % COLORS.length
              ],
          }}
        >
          <span
            className="legend-dot"
            style={{
              backgroundColor:
                COLORS[
                  index % COLORS.length
                ],
            }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};


const renderBarLegend = ({ payload }) => (
  <ul className="bar-legend">
    {payload.map((entry, index) => (
      <li
        key={entry.value}
        style={{
          color: entry.color,
        }}
      >
        <span
          className="legend-dot"
          style={{
            backgroundColor: entry.color,
          }}
        />
        {entry.value}
      </li>
    ))}
  </ul>
);



const AdminNotification = () => {

  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [notificationData,setNotificationData] = useState([]);
  const [deliveryData,setDeliveryData] = useState([]);
  const [notificationHistory,setNotificationHistory] = useState([]);

  const [summary,setSummary] = useState({
    total_sent: 0,
    delivered: 0,
    failed: 0,
    delivery_rate: 0,
  });


  const [search,setSearch] = useState("");

  const loadDashboard =
    async () => {
      try {
        setLoading(true);

        const res =
          await getDashboard();

        setSummary(
          res.data.summary
        );

        setNotificationData(
          res.data.types
        );

        setDeliveryData(
          res.data.delivery
        );

        setNotificationHistory(
          res.data.history
        );
      }
      catch (err) {
        console.log(err);
        setError(
          "Unable to load notification dashboard."
        );
      }
      finally {
        setLoading(false);
      }

    };



useEffect(() => {
  loadDashboard();
}, []);



useEffect(() => {
  const timeout = setTimeout(
      async () => {
        try {
          if (
            search.trim() === ""
          ) {
            loadDashboard();
            return;
          }
          const res =
            await searchNotificationHistory(
              search
            );
          setNotificationHistory(
            res.data
          );
        }
        catch (err) {
          console.log(err);
        }
      },
      500
    );
  return () =>
    clearTimeout(timeout);
}, [search]);





if (loading) {
  return (
    <div className="admin-notification-page">
      <AdminSidebar />

      <main className="notification-content notification-loading">
        <div className="status-card">
          <div className="loader"></div>
          <h2>Loading Notifications</h2>
          <p>Please wait while we fetch the latest data...</p>
        </div>
      </main>
    </div>
  );
}

if (error) {
  return (
    <div className="admin-notification-page">
      <AdminSidebar />

      <main className="notification-content notification-error">
        <div className="status-card">
          <div className="error-icon">!</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </main>
    </div>
  );
}




  return (
    <div className="admin-notification-page">
      <AdminSidebar />

      <main className="notification-content">
        <div className="page-header">
          <h1>Notification Monitoring</h1>
          <p>
            Track delivery statistics and notification
            performance.
          </p>
        </div>

        {/* Statistics */}

        <div className="stats-grid">
          <div className="stat-card">
            <span>TOTAL SENT</span>
            <h2>
              {(summary.total_sent ?? 0).toLocaleString()}
            </h2>
          </div>

          <div className="stat-card">
            <span>DELIVERED</span>
            <h2 className="success">
              {(summary.delivered ?? 0).toLocaleString()}
            </h2>
          </div>

          <div className="stat-card">
            <span>FAILED</span>
            <h2 className="danger">
              {(summary.failed ?? 0).toLocaleString()}
            </h2>
          </div>

          <div className="stat-card">
            <span>DELIVERY RATE</span>
            <h2 className="primary">
              {(summary.delivery_rate ?? 0).toLocaleString()}%
            </h2>
          </div>
        </div>

        {/* Charts */}

        <div className="charts-grid">

          {/* Pie Chart */}

          <div className="chart-card">
            <div className="card-header">
              <h3>Notifications by Type</h3>
            </div>

            {
              notificationData.length > 0 ? (

              <ResponsiveContainer
                  width="100%"
                  height={350}
              >
              <PieChart>
                <Pie
                  data={notificationData}
                  cx="50%"
                  cy="45%"
                  innerRadius={75}
                  outerRadius={115}
                  dataKey="value"
                  paddingAngle={2}
                  strokeWidth={0}
                >
                 {notificationData.map(
                  (entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  )
                )}
                </Pie>

                <Tooltip />

                

                <Legend
                content={renderLegend}
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: "15px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            ) : (
              <div className="empty-chart">
                No notification data available.
              </div>
              )
            }
          </div>

          {/* Bar Chart */}

          <div className="chart-card">
            <div className="card-header">
              <h3>
                Delivery Performance by Batch
              </h3>
            </div>
          {
              deliveryData.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart
                data={deliveryData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />


                <XAxis
                  dataKey="batch"
                  tick={({ x, y, payload }) => (
                    <text
                      x={x}
                      y={y}
                      dy={16}
                      textAnchor="middle"
                      fill="#111827"
                      fontSize="14"
                      fontWeight="600"
                    >
                      {payload.value}
                    </text>
                  )}
                />

                <YAxis
                  tick={({ x, y, payload }) => (
                    <text
                      x={x}
                      y={y}
                      dx={-10}
                      textAnchor="end"
                      fill="#111827"
                      fontSize="13"
                      fontWeight="600"
                    >
                      {payload.value}
                    </text>
                  )}
                />

                <Tooltip />

                <Legend 
                content={renderBarLegend} 
                />

                <Bar
                  name="Delivered"
                  dataKey="delivered"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  name="Failed"
                  dataKey="failed"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

            ) : (
            <div className="empty-chart">
              No delivery data available.
            </div>
            )
          }
          </div>
        </div>


        {/* Notification History */}
        <div className="history-cardd">
          <div className="history-header">
            <h3>Notification History</h3>

            <div className="search-box">
              <FiSearch />

              <input
                type="text"
                placeholder="Search notifications..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          <div className="history-table-wrapper">

            {notificationHistory.length > 0 ? (

              <table className="history-table">
                <thead>
                  <tr>
                    <th>TYPE</th>
                    <th>RECIPIENT</th>
                    <th>SENT</th>
                    <th>DELIVERED</th>
                    <th>FAILED</th>
                    <th>RATE</th>
                    <th>TIMESTAMP</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {notificationHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="type">
                        {item.type}
                      </td>

                      <td>
                        {item.recipient}
                      </td>

                      <td>
                        {(item.sent ?? 0).toLocaleString()}
                      </td>

                      <td className="delivered">
                        {(item.delivered ?? 0).toLocaleString()}
                      </td>

                      <td className="failed">
                        {(item.failed ?? 0).toLocaleString()}
                      </td>

                      <td>
                        {item.rate}
                      </td>

                      <td className="timestamp">
                        {item.timestamp}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${item.status}`}
                        >
                          {item.status === "completed" ? (
                            <>
                              <FiCheckCircle />
                              Completed
                            </>
                          ) : item.status === "failed" ? (
                            <>
                              <FiXCircle />
                              Failed
                            </>
                          ) : (
                            <>
                              <FiClock />
                              Sending...
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-history">
                No notification history found.
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminNotification;