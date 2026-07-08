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
        {/* Header */}
        <div className="header">
          <div>
            <h1>Analytics Dashboard</h1>
            <p>
              Understand your farming performance with insights from actual data
              and environmental factors
            </p>
          </div>

          <select>
            <option>Last 12 Months</option>
          </select>
        </div>

        {/* Top Cards */}
        <div className="cards">
          <div className="card">
            <DollarSign size={20} />
            <h2>₹{(analytics.total_revenue ?? 0).toLocaleString()}</h2>
            <span>From sales</span>
            <p>Total Revenue</p>
          </div>

          <div className="card">
            <TrendingUp size={20} />
            <h2>{(analytics.average_yield ?? 0).toFixed(2)} T/Ha</h2>
            <span>Actual performance</span>
            <p>Average Yield</p>
          </div>

          <div className="card">
            <Target size={20} />
            <h2>{(analytics.quality_rate ?? 0).toFixed(2)}%</h2>
            <span>Good quality</span>
            <p>Quality Rate</p>
          </div>

          <div className="card">
            <Leaf size={20} />
            <h2>{(analytics.profit_margin ?? 0).toFixed(2)}%</h2>
            <span>Profitable</span>
            <p>Profit Margin</p>
          </div>
        </div>

        {/* Tabs */}

        <div className="tabs">
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

          <button
            className={activeTab === "environment" ? "active" : ""}
            onClick={() => setActiveTab("environment")}
          >
            Environmental Insights
          </button>

          <button
            className={activeTab === "distribution" ? "active" : ""}
            onClick={() => setActiveTab("distribution")}
          >
            Crop Distribution
          </button>

          <button
            className={activeTab === "achievement" ? "active" : ""}
            onClick={() => setActiveTab("achievement")}
          >
            Achievements
          </button>
        </div>

        {/* Yield Analysis */}

        {activeTab === "yield" && (
          <div className="chart">
            <h3>Crop Yield Trends</h3>
            <p>Monitor yield performance across different crops over time</p>

            <div className="chart-box">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="yield"
                    stroke="#4A6CF7"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Financial Performance */}

        {activeTab === "financial" && (
          <div className="chart">
            <h3>Financial Performance</h3>
            <p>Track revenue, expenses and profit trends</p>

            <div className="chart-box">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar dataKey="revenue" fill="#8B80F9" />
                  <Bar dataKey="expenses" fill="#81C995" />
                  <Bar dataKey="profit" fill="#F4C542" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bottom-cards">
              <div className="box">
                <h4>Total Revenue</h4>
                <h2 className="green">
                  ₹{(analytics.total_revenue ?? 0).toLocaleString()}
                </h2>
              </div>

              <div className="box">
                <h4>Total Expenses</h4>
                <h2>₹{(analytics.total_expenses ?? 0).toLocaleString()}</h2>
              </div>

              <div className="box">
                <h4>Net Profit</h4>
                <h2 className="blue">
                  ₹{(analytics.total_profit ?? 0).toLocaleString()}
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Environmental Insights */}

        {activeTab === "environment" && (
          <div className="environment-card">
            <div className="field-card">
              <div className="field-header">
                <h3>
                  {environment.crop} - {environment.field}
                </h3>

                <span className="badge">{environment.quality}</span>
              </div>

              <div className="summary">
                <div>
                  <span>Harvest Date</span>
                  <h5>{environment.date}</h5>
                </div>

                <div>
                  <span>Area</span>
                  <h5>{environment.area} ha</h5>
                </div>

                <div>
                  <span>Total Yield</span>
                  <h5>{environment.yield} tons</h5>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Crop Distribution */}

        {activeTab === "distribution" && (
          <div className="distribution-wrapper">
            <div className="distribution-card">
              <h3>Crop Distribution</h3>

              <PieChart width={350} height={250}>
                <Pie data={cropData} dataKey="value" outerRadius={90} label>
                  {cropData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <div className="summary-card">
              <h3>Crop Performance Summary</h3>

              {cropData.map((crop, index) => (
                <div className="crop-item" key={index}>
                  <span>{crop.name}</span>
                  <strong>{crop.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}

        {activeTab === "achievement" && (
          <div className="achievement-wrapper">
            <div className="achievement-grid">
              <div className="achievement-card">
                <h4>🏅 Best Yield</h4>
                <p>{achievements.best_yield} T/Ha</p>
              </div>

              <div className="achievement-card">
                <h4>🌱 Quality Rate</h4>
                <p>{achievements.quality_rate}%</p>
              </div>

              <div className="achievement-card">
                <h4>💰 Profit Margin</h4>
                <p>{achievements.profit_margin}%</p>
              </div>
            </div>

            <div className="quick-stats">
              <h3>Quick Stats</h3>

              <div className="stat-row">
                <span>Total Plantings</span>
                <strong>{achievements.plantings}</strong>
              </div>

              <div className="stat-row">
                <span>Total Harvests</span>
                <strong>{achievements.harvests}</strong>
              </div>

              <div className="stat-row">
                <span>Average Yield</span>
                <strong>{analytics.average_yield} T/Ha</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
