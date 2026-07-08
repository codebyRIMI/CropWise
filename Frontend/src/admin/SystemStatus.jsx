import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../scss/adminStatus.scss";

import {
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Database,
  Bell,
  Cpu,
  Cloud,
  FlaskConical,
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Globe,
  ShieldCheck,
  Server,
  Radio,
} from "lucide-react";

const servicesData = [
  {
    id: 1,
    title: "Main Database",
    subtitle: "PostgreSQL primary cluster",
    status: "Healthy",
    uptime: "99.98%",
    latency: "4ms",
    last: "30s ago",
    icon: Database,
  },
  {
    id: 2,
    title: "Notification Scheduler",
    subtitle: "Crop-based notification service",
    status: "Healthy",
    uptime: "99.85%",
    latency: "12ms",
    last: "45s ago",
    icon: Bell,
  },
  {
    id: 3,
    title: "Crop Recommendation Model",
    subtitle: "ML inference API v2.4",
    status: "Healthy",
    uptime: "99.72%",
    latency: "128ms",
    last: "1m ago",
    icon: Cpu,
  },
  {
    id: 4,
    title: "Weather Data Service",
    subtitle: "PAGASA API integration",
    status: "Degraded",
    uptime: "97.3%",
    latency: "380ms",
    last: "2m ago",
    icon: Cloud,
  },
  {
    id: 5,
    title: "Soil Analysis Engine",
    subtitle: "Soil data processing pipeline",
    status: "Healthy",
    uptime: "99.91%",
    latency: "45ms",
    last: "1m ago",
    icon: FlaskConical,
  },
  {
    id: 6,
    title: "Dashboard Page",
    subtitle: "Main application homepage",
    status: "Healthy",
    uptime: "100%",
    latency: "8ms",
    last: "15s ago",
    icon: LayoutDashboard,
  },
  {
    id: 7,
    title: "Analytics Engine",
    subtitle: "Data aggregation service",
    status: "Healthy",
    uptime: "99.65%",
    latency: "92ms",
    last: "30s ago",
    icon: BarChart3,
  },
  {
    id: 8,
    title: "Market Trends API",
    subtitle: "Price data feed aggregator",
    status: "Healthy",
    uptime: "98.8%",
    latency: "210ms",
    last: "1m ago",
    icon: TrendingUp,
  },
  {
    id: 9,
    title: "CDN / Static Assets",
    subtitle: "Cloudflare edge network",
    status: "Healthy",
    uptime: "100%",
    latency: "18ms",
    last: "10s ago",
    icon: Globe,
  },
  {
    id: 10,
    title: "Auth Service",
    subtitle: "JWT authentication service",
    status: "Healthy",
    uptime: "99.99%",
    latency: "6ms",
    last: "20s ago",
    icon: ShieldCheck,
  },
  {
    id: 11,
    title: "API Gateway",
    subtitle: "Load balancer / reverse proxy",
    status: "Healthy",
    uptime: "99.97%",
    latency: "2ms",
    last: "5s ago",
    icon: Server,
  },
  {
    id: 12,
    title: "WebSocket Server",
    subtitle: "Real-time event bus",
    status: "Degraded",
    uptime: "96.5%",
    latency: "550ms",
    last: "3m ago",
    icon: Radio,
  },
];

const SystemStatus = () => {
  const [services] = useState(servicesData);

  const healthy = services.filter(
    (s) => s.status === "Healthy"
  ).length;

  const degraded = services.filter(
    (s) => s.status === "Degraded"
  ).length;

  const down = services.filter(
    (s) => s.status === "Down"
  ).length;

  const overall = Math.round((healthy / services.length) * 100);

  return (
    <>
      <AdminSidebar />

      <div className="systemStatus">

        <div className="statusHeader">

          <div>
            <h1>System Status</h1>
            <p>Health of all core services</p>
          </div>

          <button className="refreshBtn">
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

        <div className="statusCards">

          <div className="statusCard healthy">
            <CheckCircle2 size={18} />
            <span>HEALTHY</span>
            <h2>{healthy}</h2>
          </div>

          <div className="statusCard degraded">
            <AlertTriangle size={18} />
            <span>DEGRADED</span>
            <h2>{degraded}</h2>
          </div>

          <div className="statusCard down">
            <XCircle size={18} />
            <span>DOWN</span>
            <h2>{down}</h2>
          </div>

          <div className="statusCard overall">
            <span>OVERALL HEALTH</span>
            <h2>{overall}%</h2>

            <div className="progress">
              <div
                className="progressFill"
                style={{ width: `${overall}%` }}
              />
            </div>

          </div>

        </div>

        <div className="warningBanner">
          <AlertTriangle size={18} />

          <div>
            <h4>Degraded Services Detected</h4>

            <p>
              Weather Data Service and WebSocket Server are
              experiencing elevated latency or reduced
              availability. Investigate immediately.
            </p>
          </div>
        </div>

        {/* Services Grid Starts Here */}
                <div className="servicesGrid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className={`serviceCard ${service.status.toLowerCase()}`}
              >
                <div className="serviceHeader">

                  <div className="serviceInfo">

                    <div className="serviceIcon">
                      <Icon size={20} />
                    </div>

                    <div>

                      <div className="serviceTitle">

                        <h3>{service.title}</h3>

                        <span
                          className={`statusBadge ${service.status.toLowerCase()}`}
                        >
                          {service.status}
                        </span>

                      </div>

                      <p>{service.subtitle}</p>

                    </div>

                  </div>

                  {service.status === "Healthy" ? (
                    <CheckCircle2
                      size={18}
                      className="statusIcon healthy"
                    />
                  ) : service.status === "Degraded" ? (
                    <AlertTriangle
                      size={18}
                      className="statusIcon degraded"
                    />
                  ) : (
                    <XCircle
                      size={18}
                      className="statusIcon down"
                    />
                  )}
                </div>

                <div className="serviceStats">

                  <span>
                    <strong>{service.uptime}</strong> uptime
                  </span>

                  <span>
                    <strong>{service.latency}</strong> latency
                  </span>

                  <span>{service.last}</span>

                </div>

                <div className="serviceProgress">

                  <div
                    className={`progressFill ${service.status.toLowerCase()}`}
                    style={{
                      width:
                        service.status === "Healthy"
                          ? "99%"
                          : service.status === "Degraded"
                          ? "84%"
                          : "35%",
                    }}
                  ></div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </>
  );
};

export default SystemStatus;