// import React, { useState } from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// import "../scss/adminAnalytics.scss";

// const trendData = [
//   { month: "Jan", rice: 65, corn: 40, vegetables: 38, sugarcane: 28 },
//   { month: "Feb", rice: 72, corn: 46, vegetables: 42, sugarcane: 30 },
//   { month: "Mar", rice: 90, corn: 55, vegetables: 52, sugarcane: 34 },
//   { month: "Apr", rice: 95, corn: 61, vegetables: 48, sugarcane: 38 },
//   { month: "May", rice: 112, corn: 69, vegetables: 58, sugarcane: 42 },
//   { month: "Jun", rice: 99, corn: 64, vegetables: 54, sugarcane: 38 },
// ];

// const cropCards = [
//   {
//     name: "Rice",
//     value: 212,
//     percent: "+12%",
//     progress: 100,
//     color: "#f59e0b",
//     positive: true,
//   },
//   {
//     name: "Corn",
//     value: 156,
//     percent: "+8%",
//     progress: 73,
//     color: "#10b981",
//     positive: true,
//   },
//   {
//     name: "Vegetables",
//     value: 128,
//     percent: "-3%",
//     progress: 61,
//     color: "#3b82f6",
//     positive: false,
//   },
//   {
//     name: "Sugarcane",
//     value: 100,
//     percent: "+5%",
//     progress: 47,
//     color: "#8b5cf6",
//     positive: true,
//   },
//   {
//     name: "Cassava",
//     value: 69,
//     percent: "+15%",
//     progress: 34,
//     color: "#f97316",
//     positive: true,
//   },
//   {
//     name: "Sweet Potato",
//     value: 50,
//     percent: "-1%",
//     progress: 24,
//     color: "#ec4899",
//     positive: false,
//   },
// ];

// const pieData = cropCards.map((item) => ({
//   name: item.name,
//   value: item.value,
//   color: item.color,
// }));

// const AdminAnalytics = () => {
//   const [filter, setFilter] = useState("7");

//   return (
//     <>
//       <AdminSidebar />

//       <div className="adminAnalytics">

//         {/* Header */}

//         <div className="analyticsTop">

//           <div>
//             <h1>Crop Analytics</h1>
//             <p>Recommendation trends and distribution</p>
//           </div>

//           <div className="analyticsFilter">
//             <button
//               className={filter === "7" ? "active" : ""}
//               onClick={() => setFilter("7")}
//             >
//               Last 7 Days
//             </button>

//             <button
//               className={filter === "30" ? "active" : ""}
//               onClick={() => setFilter("30")}
//             >
//               Last 30 Days
//             </button>

//             <button
//               className={filter === "all" ? "active" : ""}
//               onClick={() => setFilter("all")}
//             >
//               All Time
//             </button>
//           </div>
//         </div>

//         {/* Cards */}

//         <div className="analyticsCards">
//           {cropCards.map((item) => (
//             <div className="analyticsCard" key={item.name}>

//               <div className="cardHeader">

//                 <h3>{item.name}</h3>

//                 <span
//                   className={item.positive ? "positive" : "negative"}
//                 >
//                   ↗ {item.percent}
//                 </span>

//               </div>

//               <h2>{item.value}</h2>

//               <p>recommendations</p>

//               <div className="progressBar">

//                 <div
//                   className="progressFill"
//                   style={{
//                     width: `${item.progress}%`,
//                     background: item.color,
//                   }}
//                 ></div>

//               </div>

//             </div>
//           ))}
//         </div>

//         {/* Bottom Section */}

//         <div className="analyticsBottom">

//           {/* Line Chart */}

//           <div className="chartCard">

//             <h2>Recommendation Trends Over Time</h2>

//             <ResponsiveContainer width="100%" height={320}>
//               <LineChart data={trendData}>

//                 <CartesianGrid
//                   strokeDasharray="4 4"
//                   vertical={false}
//                 />

//                 <XAxis dataKey="month" />

//                 <YAxis />

//                 <Tooltip />

//                 <Line
//                   type="monotone"
//                   dataKey="rice"
//                   stroke="#f59e0b"
//                   strokeWidth={3}
//                   dot={false}
//                 />

//                 <Line
//                   type="monotone"
//                   dataKey="corn"
//                   stroke="#10b981"
//                   strokeWidth={3}
//                   dot={false}
//                 />

//                 <Line
//                   type="monotone"
//                   dataKey="vegetables"
//                   stroke="#3b82f6"
//                   strokeWidth={3}
//                   dot={false}
//                 />

//                 <Line
//                   type="monotone"
//                   dataKey="sugarcane"
//                   stroke="#8b5cf6"
//                   strokeWidth={3}
//                   dot={false}
//                 />

//               </LineChart>
//             </ResponsiveContainer>

//             <div className="chartLegend">

//               <div>
//                 <span
//                   className="legendColor"
//                   style={{ background: "#f59e0b" }}
//                 ></span>
//                 Rice
//               </div>

//               <div>
//                 <span
//                   className="legendColor"
//                   style={{ background: "#10b981" }}
//                 ></span>
//                 Corn
//               </div>

//               <div>
//                 <span
//                   className="legendColor"
//                   style={{ background: "#3b82f6" }}
//                 ></span>
//                 Vegetables
//               </div>

//               <div>
//                 <span
//                   className="legendColor"
//                   style={{ background: "#8b5cf6" }}
//                 ></span>
//                 Sugarcane
//               </div>

//             </div>

//           </div>

//           {/* Pie Chart */}

//           <div className="chartCard">

//             <h2>Crop Distribution</h2>

//             <div className="pieSection">

//               <div className="pieChart">

//                 <ResponsiveContainer width="100%" height={280}>
//                   <PieChart>

//                     <Pie
//                       data={pieData}
//                       dataKey="value"
//                       innerRadius={55}
//                       outerRadius={80}
//                       paddingAngle={3}
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell
//                           key={index}
//                           fill={entry.color}
//                         />
//                       ))}
//                     </Pie>

//                     <Tooltip />

//                   </PieChart>
//                 </ResponsiveContainer>

//               </div>

//               <div className="pieLegend">

//                 {pieData.map((item) => (
//                   <div
//                     className="legendItem"
//                     key={item.name}
//                   >

//                     <div className="left">

//                       <span
//                         className="dot"
//                         style={{
//                           background: item.color,
//                         }}
//                       ></span>

//                       {item.name}

//                     </div>

//                     <strong>{item.value}</strong>

//                   </div>
//                 ))}

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     </>
//   );
// };

// export default AdminAnalytics;

import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "../scss/adminAnalytics.scss";

/* =====================================================
   Analytics Data
===================================================== */

const analyticsData = {
  "7": {
    cards: [
      {
        name: "Rice",
        value: 212,
        percent: "+12%",
        progress: 100,
        color: "#f59e0b",
        positive: true,
      },
      {
        name: "Corn",
        value: 156,
        percent: "+8%",
        progress: 73,
        color: "#10b981",
        positive: true,
      },
      {
        name: "Vegetables",
        value: 128,
        percent: "-3%",
        progress: 61,
        color: "#3b82f6",
        positive: false,
      },
      {
        name: "Sugarcane",
        value: 100,
        percent: "+5%",
        progress: 47,
        color: "#8b5cf6",
        positive: true,
      },
      {
        name: "Cassava",
        value: 69,
        percent: "+15%",
        progress: 34,
        color: "#f97316",
        positive: true,
      },
      {
        name: "Sweet Potato",
        value: 50,
        percent: "-1%",
        progress: 24,
        color: "#ec4899",
        positive: false,
      },
    ],

    trend: [
      { month: "Jan", rice: 65, corn: 40, vegetables: 38, sugarcane: 28 },
      { month: "Feb", rice: 72, corn: 46, vegetables: 42, sugarcane: 30 },
      { month: "Mar", rice: 90, corn: 55, vegetables: 52, sugarcane: 34 },
      { month: "Apr", rice: 95, corn: 61, vegetables: 48, sugarcane: 38 },
      { month: "May", rice: 112, corn: 69, vegetables: 58, sugarcane: 42 },
      { month: "Jun", rice: 99, corn: 64, vegetables: 54, sugarcane: 38 },
    ],
  },

  "30": {
    cards: [
      {
        name: "Rice",
        value: 864,
        percent: "+18%",
        progress: 100,
        color: "#f59e0b",
        positive: true,
      },
      {
        name: "Corn",
        value: 642,
        percent: "+11%",
        progress: 74,
        color: "#10b981",
        positive: true,
      },
      {
        name: "Vegetables",
        value: 511,
        percent: "+6%",
        progress: 59,
        color: "#3b82f6",
        positive: true,
      },
      {
        name: "Sugarcane",
        value: 398,
        percent: "+7%",
        progress: 46,
        color: "#8b5cf6",
        positive: true,
      },
      {
        name: "Cassava",
        value: 287,
        percent: "+10%",
        progress: 33,
        color: "#f97316",
        positive: true,
      },
      {
        name: "Sweet Potato",
        value: 210,
        percent: "+3%",
        progress: 24,
        color: "#ec4899",
        positive: true,
      },
    ],

    trend: [
      { month: "Week 1", rice: 180, corn: 130, vegetables: 110, sugarcane: 80 },
      { month: "Week 2", rice: 240, corn: 190, vegetables: 150, sugarcane: 120 },
      { month: "Week 3", rice: 320, corn: 240, vegetables: 200, sugarcane: 150 },
      { month: "Week 4", rice: 410, corn: 300, vegetables: 250, sugarcane: 190 },
    ],
  },

  all: {
    cards: [
      {
        name: "Rice",
        value: 5421,
        percent: "+25%",
        progress: 100,
        color: "#f59e0b",
        positive: true,
      },
      {
        name: "Corn",
        value: 4187,
        percent: "+20%",
        progress: 77,
        color: "#10b981",
        positive: true,
      },
      {
        name: "Vegetables",
        value: 3578,
        percent: "+18%",
        progress: 66,
        color: "#3b82f6",
        positive: true,
      },
      {
        name: "Sugarcane",
        value: 2869,
        percent: "+15%",
        progress: 53,
        color: "#8b5cf6",
        positive: true,
      },
      {
        name: "Cassava",
        value: 1892,
        percent: "+17%",
        progress: 35,
        color: "#f97316",
        positive: true,
      },
      {
        name: "Sweet Potato",
        value: 1465,
        percent: "+12%",
        progress: 27,
        color: "#ec4899",
        positive: true,
      },
    ],

    trend: [
      { month: "2021", rice: 900, corn: 650, vegetables: 520, sugarcane: 420 },
      { month: "2022", rice: 1800, corn: 1400, vegetables: 1100, sugarcane: 850 },
      { month: "2023", rice: 2800, corn: 2150, vegetables: 1800, sugarcane: 1350 },
      { month: "2024", rice: 4100, corn: 3200, vegetables: 2700, sugarcane: 2100 },
      { month: "2025", rice: 5421, corn: 4187, vegetables: 3578, sugarcane: 2869 },
    ],
  },
};

const AdminAnalytics = () => {
  const [filter, setFilter] = useState("7");

  const currentCards = analyticsData[filter].cards;
  const currentTrend = analyticsData[filter].trend;

  const pieData = currentCards.map((item) => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }));

  return (
    <>
      <AdminSidebar />

      <div className="adminAnalytics">
        <div className="analyticsTop">
          <div>
            <h1>Crop Analytics</h1>
            <p>Recommendation trends and distribution</p>
          </div>

          <div className="analyticsFilter">
            <button
              className={filter === "7" ? "active" : ""}
              onClick={() => setFilter("7")}
            >
              Last 7 Days
            </button>

            <button
              className={filter === "30" ? "active" : ""}
              onClick={() => setFilter("30")}
            >
              Last 30 Days
            </button>

            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All Time
            </button>
          </div>
        </div>

        <div className="analyticsCards">
          {currentCards.map((item) => (
            <div className="analyticsCard" key={item.name}>
              <div className="cardHeader">
                <h3>{item.name}</h3>

                <span className={item.positive ? "positive" : "negative"}>
                  {item.positive ? "↗" : "↘"} {item.percent}
                </span>
              </div>

              <h2>{item.value}</h2>

              <p>recommendations</p>

              <div className="progressBar">
                <div
                  className="progressFill"
                  style={{
                    width: `${item.progress}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="analyticsBottom">
          <div className="chartCard">
            <h2>Recommendation Trends Over Time</h2>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={currentTrend}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="rice"
                  stroke="#f59e0b"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="corn"
                  stroke="#10b981"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="vegetables"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="sugarcane"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="chartLegend">
              <div>
                <span
                  className="legendColor"
                  style={{ background: "#f59e0b" }}
                ></span>
                Rice
              </div>

              <div>
                <span
                  className="legendColor"
                  style={{ background: "#10b981" }}
                ></span>
                Corn
              </div>

              <div>
                <span
                  className="legendColor"
                  style={{ background: "#3b82f6" }}
                ></span>
                Vegetables
              </div>

              <div>
                <span
                  className="legendColor"
                  style={{ background: "#8b5cf6" }}
                ></span>
                Sugarcane
              </div>
            </div>
          </div>

          <div className="chartCard">
            <h2>Crop Distribution</h2>

            <div className="pieSection">
              <div className="pieChart">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="pieLegend">
                {pieData.map((item) => (
                  <div className="legendItem" key={item.name}>
                    <div className="left">
                      <span
                        className="dot"
                        style={{ background: item.color }}
                      ></span>

                      {item.name}
                    </div>

                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAnalytics;