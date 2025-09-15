import React from "react";
import { useSelector } from "react-redux";
import Category from "./Category";

// Main dashboard component
function Dashboard({ openDrawer }) {
  const categories = useSelector((s) => s.dashboard.categories);
  const searchQuery = useSelector((s) => s.dashboard.searchQuery);

  // Show message if no categories exist
  if (categories.length === 0) {
    return (
      <div className="dashboard empty">
        <div className="empty-state">
          <h3>No categories yet</h3>
          <p>Add a category to get started</p>
          <button 
            className="btn" 
            onClick={() => openDrawer(null)}
          >
            + Add Widget
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          openDrawer={openDrawer}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

export default Dashboard;

