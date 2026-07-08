import React from "react";
import { Link } from "react-router-dom";
import "../scss/dashboard.scss";
import Sidebar from "../components/Sidebar";
import { useTranslation } from "react-i18next";
const Dashboard = () => {
    const { t } = useTranslation();
  return (
     <>
      <Sidebar />
      <div className="dashboard-container">
      <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
       <h1>
  {t("your_farm")} <span>{t("dashboard")}</span>
</h1>
        <p>{t("dashboard_description")}</p>
        <div className="header-buttons">
          <Link to="/recommendations">
          <button className="primary-btn">
             {t("get_smart_recommendations")}
          </button>
          </Link>
          <button className="secondary-btn">
           {t("view_farm_analytics")}
          </button>
        </div>
      </header>

      {/* Banner Image */}
      <div className="dashboard-banner">
        <img
          src="https://t3.ftcdn.net/jpg/15/42/35/04/360_F_1542350461_sB9xctFhIhImu2KhOg6t7Yq5N0szPhql.jpg"
          alt="Farm"
        />
      </div>

      {/* Farm Overview Section */}
      <section className="farm-overview">
         <h2>{t("your_farm_overview")}</h2>
        <div className="overview-grid">
          <div className="overview-card">
            <h3>10,000+</h3>
              <p>{t("farmers_helped")}</p>
          </div>
          <div className="overview-card">
            <h3>35%</h3>
            <p>{t("total_improvement")}</p>
          </div>
          <div className="overview-card">
            <h3>94%</h3>
             <p>{t("success_rate")}</p>
          </div>
          <div className="overview-card">
            <h3>50+</h3>
             <p>{t("crops_supported")}</p>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="recent-activity">
        <h2>{t("recent_activity")}</h2>
        <div className="activity-grid">
          <div className="activity-card">
            <h4>{t("latest_recommendations")}</h4>
            <ul>
                      <li>
  <b>{t("wheat")}</b> – {t("winter_season")}
</li>

<li>
  <b>{t("maize")}</b> – {t("monsoon_season")}
</li>

<li>
  <b>{t("soybean")}</b> – {t("post_monsoon")}
</li>
            </ul>
             <button className="link-btn">
  {t("view_all_recommendations")}
</button>
          </div>
          <div className="activity-card">
                  <h4>{t("performance_highlights")}</h4>

<p>
  {t("this_season_yield")} <b>+15%</b>
</p>

<p>
  {t("cost_reduction")} <b>₹5,000</b>
</p>

<p>
  {t("success_rate")} <b>94%</b>
</p>

<button className="link-btn">
  {t("view_detailed_analysis")}
</button>
          </div>
        </div>
      </section>

      {/* Smart Farming Tools */}
      <section className="smart-farming">
          <h2>{t("everything_you_need")}</h2>
           
           <p className="section-desc">
  {t("everything_you_need_desc")}
</p>
        <div className="tools-grid">
          <div className="tool-card">
            <div className="icon green">🌾</div>
              
              <h4>{t("smart_crop_recommendations")}</h4>

<p>{t("smart_crop_recommendations_desc")}</p>

<button className="learn-btn">
  {t("learn_more")}
</button>
          </div>

          <div className="tool-card">
            <div className="icon blue">☁️</div>
               
               <h4>{t("weather_insights")}</h4>

<p>{t("weather_insights_desc")}</p>

<button className="learn-btn">
  {t("learn_more")}
</button>
          </div>
          
          <div className="tool-card">
            <div className="icon orange">🧪</div>
            <h4>{t("soil_analysis")}</h4>

<p>{t("soil_analysis_desc")}</p>

<button className="learn-btn">
  {t("learn_more")}
</button>
          </div>

          <div className="tool-card">
            <div className="icon purple">📊</div>
               <h4>{t("analytics_dashboard")}</h4>

<p>{t("analytics_dashboard_desc")}</p>

<button className="learn-btn">
  {t("learn_more")}
</button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
            <h2>{t("quick_actions")}</h2>

<p>{t("quick_actions_desc")}</p>
        
        <div className="action-buttons">
          <Link to='/recommendations'>
              <button className="primary-btn">
  {t("smart_crop_analysis")}
</button>
          </Link>
          <Link to='/weather'>
             <button className="secondary-btn">
  {t("check_weather")}
</button>
          </Link>
          <Link to='/soil-analysis'>
             <button className="tertiary-btn">
  {t("soil_testing")}
</button>
          </Link>
         
        </div>
      </section>
    </div>
    </div>

    </>

  );
};

export default Dashboard;
