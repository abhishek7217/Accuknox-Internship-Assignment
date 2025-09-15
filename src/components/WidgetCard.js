import React from "react";
import { useDispatch } from "react-redux";
import { removeWidget } from "../store/dashboardSlice";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

// Color definitions for different data types
const CHART_COLORS = {
  Connected: "#6449eb",
  "Not Connected": "#c2c8e0",
  Passed: "#0b8a5b",
  Failed: "#ef4444",
  Warning: "#fbbf24",
  "Not Available": "#94a3b8",
  High: "#c81111",
  Medium: "#ebd652",
  Critical: "#4a0606",
  A: "#3b82f6",
  B: "#8b5cf6",
  C: "#ec4899",
  D: "#f97316",
};

// Individual widget component
function WidgetCard({ categoryId, widget }) {
  const dispatch = useDispatch();
  
  // Calculate total value for progress widgets
  const totalValue = (widget.data || []).reduce(
    (sum, item) => sum + (item.value || 0), 
    0
  );
  
  // Handle widget removal
  const handleRemove = () => {
    if (window.confirm(`Remove "${widget.name}" widget?`)) {
      dispatch(removeWidget({ categoryId, widgetId: widget.id }));
    }
  };

  // Render different content based on widget type
  const renderWidgetContent = () => {
    switch (widget.type) {
      case "donut":
        return renderDonutChart();
      case "bar":
        return renderBarChart();
      case "progress":
        return renderProgressChart();
      default:
        return renderTextContent();
    }
  };

  // Donut chart visualization with legend on the right
  const renderDonutChart = () => {
    if (!widget.data || widget.data.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-chart-container">
            <img 
              src="https://www.shutterstock.com/image-vector/growing-bar-graph-icon-black-600nw-653567311.jpg" 
              alt="No data available" 
              className="empty-chart-image"
            />
            <p>No data available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="donut-chart-container">
        <div className="chart-side">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={widget.data}
                dataKey="value"
                innerRadius={45}
                outerRadius={65}
              >
                {widget.data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS[entry.name] || "#94a3b8"} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">{totalValue}</div>
        </div>
        
        <div className="legend-side">
          <ul className="legend-vertical">
            {widget.data.map((item, idx) => (
              <li key={idx} className="legend-item">
                <span
                  className="legend-dot"
                  style={{ background: CHART_COLORS[item.name] || "#94a3b8" }}
                />
                <div className="legend-text">
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">({item.value})</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Bar chart visualization
  const renderBarChart = () => {
    if (!widget.data || widget.data.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-chart-container">
            <img 
              src="https://www.shutterstock.com/image-vector/growing-bar-graph-icon-black-600nw-653567311.jpg" 
              alt="No graph data available" 
              className="empty-chart-image"
            />
            <p>No Graph data available</p>
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={widget.data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#3b82f6" />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Progress chart visualization
  const renderProgressChart = () => {
    if (!widget.data || widget.data.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-chart-container">
            <img 
              src="https://www.shutterstock.com/image-vector/growing-bar-graph-icon-black-600nw-653567311.jpg" 
              alt="No data available" 
              className="empty-chart-image"
            />
            <p>No data available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="progress-widget">
        <div className="stacked-progress">
          {widget.data.map((item, index) => {
            const percentage = totalValue === 0 ? 0 : (item.value / totalValue) * 100;
            return (
              <div
                key={index}
                className="stacked-segment"
                style={{
                  width: `${percentage}%`,
                  background: CHART_COLORS[item.name] || "#94a3b8",
                }}
              />
            );
          })}
        </div>
        <ul className="legend-vertical">
          {widget.data.map((item, idx) => (
            <li key={idx} className="legend-item">
              <span
                className="legend-dot"
                style={{ background: CHART_COLORS[item.name] || "#94a3b8" }}
              />
              <div className="legend-text">
                <span className="legend-label">{item.name}</span>
                <span className="legend-value">({item.value})</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Text content visualization
  const renderTextContent = () => {
    return (
      <div className="text-content">
        {widget.text || "No content available"}
      </div>
    );
  };

  return (
    <div className="widget-card wide">
      <div className="widget-header">
        <h4>{widget.name}</h4>
        <button 
          className="icon-btn" 
          onClick={handleRemove}
          aria-label={`Remove ${widget.name} widget`}
        >
          ✕
        </button>
      </div>

      <div className="widget-body">
        {renderWidgetContent()}
      </div>
    </div>
  );
}

export default WidgetCard;