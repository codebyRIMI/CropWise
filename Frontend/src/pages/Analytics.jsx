import React, { useEffect, useState } from "react";
import { getAnalytics } from "../api/analyticsApi";
import "../scss/analytics.scss";
import Sidebar from "../components/Sidebar";

import { DollarSign, TrendingUp, Target, Leaf } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8B80F9", "#81C995", "#F4C542"];

function Analytics() {
  const [activeTab, setActiveTab] = useState("yield");
  const [analytics, setAnalytics] = useState({
    total_revenue: 0,
    total_expenses: 0,
    total_profit: 0,
    profit_margin: 0,
    average_yield: 0,
    quality_rate: 0,

    yield_chart: [],
    financial_chart: [],
    crop_distribution: [],
    environment: {},
    achievements: {},
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics();

        setAnalytics(res.data);

        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnalytics();
  }, []);

  const cropData = analytics.crop_distribution || [];
  const environment = analytics.environment || {};

  const achievements = analytics.achievements || {};
  const yieldData = analytics.yield_chart || [];
  const financialData = analytics.financial_chart || [];

  return (
    <div className="layout">
      <Sidebar />

      <div className="analytics">
        {/* ================= HEADER ================= */}
        <div className="analytics-header">
          <div className="header-content">
            <h1>Analytics Dashboard</h1>

            <p>
              Understand your farming performance with insights from actual data
              and environmental factors
            </p>
          </div>

          <div className="header-filter">
            <select>
              <option>Last 12 Months</option>
            </select>
          </div>
        </div>

        {/* ================= TOP SUMMARY ================= */}

        <div className="analytics-cards">
          <div className="analytics-card">
            <div className="card-top">
              <DollarSign className="icon" size={42} />

              <div className="card-info">
                <h2>₹{(analytics.total_revenue ?? 0).toLocaleString()}</h2>
                <span>↗ From sales</span>
              </div>
            </div>

            <h4>Total Revenue</h4>
          </div>

          <div className="analytics-card">
            <div className="card-top">
              <TrendingUp className="icon" size={42} />

              <div className="card-info">
                <h2>{(analytics.average_yield ?? 0).toFixed(2)} T/Ha</h2>
                <span>↗ Actual performance</span>
              </div>
            </div>

            <h4>Average Yield</h4>
          </div>

          <div className="analytics-card">
            <div className="card-top">
              <Target className="icon" size={42} />

              <div className="card-info">
                <h2>{(analytics.quality_rate ?? 0).toFixed(0)}%</h2>
                <span>↗ Good quality</span>
              </div>
            </div>

            <h4>Quality Rate</h4>
          </div>

          <div className="analytics-card">
            <div className="card-top">
              <Leaf className="icon" size={42} />

              <div className="card-info">
                <h2>{(analytics.profit_margin ?? 0).toFixed(0)}%</h2>
                <span>↗ Profitable</span>
              </div>
            </div>

            <h4>Profit Margin</h4>
          </div>
        </div>

        {/* ================= TABS ================= */}

        <div className="analytics-tabs">
          <button
            className={activeTab === "yield" ? "active" : ""}
            onClick={() => setActiveTab("yield")}
          >
            Yield Analysis
          </button>

          <button
            className={activeTab === "financial" ? "active" : ""}
            onClick={() => setActiveTab("financial")}
          >
            Financial Performance
          </button>
{/* 
          <button
            className={activeTab === "environment" ? "active" : ""}
            onClick={() => setActiveTab("environment")}
          >
            Environmental Insights
          </button> */}

          <button
            className={activeTab === "distribution" ? "active" : ""}
            onClick={() => setActiveTab("distribution")}
          >
            Crop Distribution
          </button>

          {/* <button
            className={activeTab === "achievement" ? "active" : ""}
            onClick={() => setActiveTab("achievement")}
          >
            Achievements
          </button> */}
        </div>

        {/* Yield Analysis */}

        {activeTab === "yield" && (
          <div className="yield-wrapper">
            <div className="analytics-panel">
              <div className="panel-header">
                <h3>Actual Yield Performance</h3>
                <p>
                  Track your real harvest yields across different crops and seasons
                </p>
              </div>

              <div className="chart-box">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={yieldData}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="yield"
                      stroke="#7C6CF6"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="yield-cards">
              <div className="summary-card">
                <h4>Best Performing Crop</h4>
                <h2 className="green">
                  {analytics.achievements?.best_crop || "-"}
                </h2>
                <p>
                  {(analytics.achievements?.best_yield || 0).toFixed(2)}
                  {" "}tons/hectare
                </p>
                <span className="badge dark">
                  Top Performer
                </span>
              </div>
              <div className="summary-card">
                <h4>Total Harvests</h4>
                <h2 className="blue">
                  {analytics.achievements?.harvests || 0}
                </h2>
                <p>Harvest Records</p>
                <span className="badge">
                  This Season
                </span>
              </div>
              <div className="summary-card">
                <h4>Quality Performance</h4>
                <h2 className="blue">
                  Excellent
                </h2>
                <p>High quality harvests</p>
                <span className="badge">
                  {analytics.quality_rate.toFixed(0)}% Quality Rate
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Financial Performance */}

        {activeTab === "financial" && (
          <div className="financial-section">

            {/* Chart Card */}
            <div className="financial-chart-card">
              <div className="financial-header">
                <h3>Financial Performance</h3>
                <p>Track revenue, expenses, and profit trends</p>
              </div>

              <div className="chart-box">
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey="revenue" fill="#8B80F9" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="expenses" fill="#81C995" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="profit" fill="#F4C542" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="financial-cards">

              <div className="financial-card">
                <h4>Total Revenue</h4>

                <h2 className="green">
                  ₹{(analytics.total_revenue ?? 0).toLocaleString()}
                </h2>

                <p className="card-subtitle">All time</p>

                <span className="card-footer green">
                  ↗ From {analytics.total_sales ?? 0} sales
                </span>
              </div>

              <div className="financial-card">
                <h4>Total Expenses</h4>

                <h2 className="orange">
                  ₹{(analytics.total_expenses ?? 0).toLocaleString()}
                </h2>

                <p className="card-subtitle">All time</p>

                <span className="card-footer orange">
                  ↗ From {analytics.total_expenses_records ?? 0} expenses
                </span>
              </div>

              <div className="financial-card">
                <h4>Net Profit</h4>

                <h2 className="blue">
                  ₹{(analytics.total_profit ?? 0).toLocaleString()}
                </h2>

                <p className="card-subtitle">All time</p>

                <span className="card-footer green">
                  ↗{" "}
                  {analytics.total_revenue
                    ? (
                        ((analytics.total_profit ?? 0) /
                          analytics.total_revenue) *
                        100
                      ).toFixed(1)
                    : 0}
                  % margin
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Environmental Insights */}
        {activeTab === "environment" && (
          <div className="environment-section">

            {/* Section Header */}
            <div className="environment-header">
              <h3>Environmental Context Analysis</h3>
              <p>
                Understanding your farming outcomes through soil and weather
                conditions
              </p>
            </div>

            {/* Main Card */}
            <div className="environment-card">

              {/* Crop Header */}
              <div className="field-header">
                <div>
                  <h2>
                    {environment.crop} - {environment.field}
                  </h2>

                  <p className="field-info">
                    Harvested: {environment.date} • Yield: {environment.yield} T/Ha •
                    Quality: {environment.quality}
                  </p>
                </div>

                <span className="badge">High Yield</span>
              </div>

              {/* Insight Cards */}

              <div className="insight-card">
                <div className="icon">🌱</div>

                <div className="content">
                  <h4>Optimal Soil Nutrients</h4>

                  <p>
                    Nitrogen levels (45 kg/ha) and pH (6.8) during planting period
                    supported strong crop development for {environment.crop}.
                  </p>
                </div>
              </div>

              <div className="insight-card">
                <div className="icon">🌞</div>

                <div className="content">
                  <h4>Favorable Weather Conditions</h4>

                  <p>
                    Adequate rainfall and moderate temperatures during growth period
                    contributed to excellent quality harvest.
                  </p>
                </div>
              </div>

              <div className="insight-card">
                <div className="icon">💧</div>

                <div className="content">
                  <h4>Optimal Moisture Management</h4>

                  <p>
                    Soil moisture levels (18%) were well maintained during critical
                    growth stages, supporting healthy development.
                  </p>
                </div>
              </div>

              {/* Summary */}

              <div className="cycle-summary">

                <h4>Farming Cycle Summary</h4>

                <div className="summary-grid">

                  <div className="summary-item">
                    <span>Planted</span>
                    <h5>3/15/2024</h5>
                  </div>

                  <div className="summary-item">
                    <span>Area</span>
                    <h5>{environment.area} ha</h5>
                  </div>

                  <div className="summary-item">
                    <span>Total Yield</span>
                    <h5>{environment.yield} tons</h5>
                  </div>

                  <div className="summary-item">
                    <span>Per Hectare</span>
                    <h5>{environment.yield} T/Ha</h5>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Crop Distribution */}
        {activeTab === "distribution" && (
          <div className="distribution-section">

            {/* Left Card */}
            <div className="distribution-card">

              <div className="card-header">
                <h3>Crop Distribution</h3>
                <p>Land allocation by crop type</p>
              </div>

              <div className="pie-chart-wrapper">
                <PieChart width={520} height={420}>
                  <Pie
                    data={cropData}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >
                    {cropData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>

            </div>

            {/* Right Card */}
            <div className="summary-card">

              <div className="card-header">
                <h3>Crop Performance Summary</h3>
                <p>Individual crop statistics</p>
              </div>

              <div className="crop-summary-list">

                {cropData.map((crop, index) => (

                  <div className="crop-item" key={index}>

                    <div className="crop-left">

                      <span
                        className="crop-dot"
                        style={{
                          background: COLORS[index % COLORS.length],
                        }}
                      />

                      <h4>{crop.name}</h4>

                    </div>

                    <div className="crop-right">

                      <h4>{crop.value}% of farm</h4>

                      <p>
                        {(
                          (crop.value / 100) *
                          (environment.area ?? 0)
                        ).toFixed(1)}{" "}
                        hectares
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        
      </div>
    </div>
  );
}

export default Analytics;
