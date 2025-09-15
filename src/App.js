import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import AddWidgetDrawer from "./components/AddWidgetDrawer";
import SearchBar from "./components/SearchBar";
import CategoriesManager from "./components/CategoriesManager";
import { useDispatch } from "react-redux";
import { resetToInitial } from "./store/dashboardSlice";

// Main app component - handles the overall layout and state
function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showManager, setShowManager] = useState(false);
  const dispatch = useDispatch();

  // Open the widget drawer for a specific category
  const openDrawerForCategory = (catId = null) => {
    setSelectedCategory(catId);
    setDrawerOpen(true);
  };

  // Reset the dashboard - might want to add a confirmation later
  const handleReset = () => {
    if (window.confirm("This will reset all changes. Continue?")) {
      dispatch(resetToInitial());
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="left">
          <SearchBar />
        </div>

        <div className="right">
          {/* Reset button - need to make this more obvious maybe */}
          <button
            className="icon-button"
            title="Reset to default"
            onClick={handleReset}
          >
            ⟳
          </button>

          {/* Main add widget button */}
          <button
            className="btn"
            onClick={() => openDrawerForCategory(null)}
            title="Add a new widget"
          >
            + Add Widget
          </button>

          {/* Toggle manager visibility */}
          <button 
            className="btn ghost" 
            onClick={() => setShowManager(!showManager)}
          >
            {showManager ? 'Hide Manager' : 'Manage'}
          </button>
        </div>
      </header>

      <main>
        <h1 className="title">CNAPP Dashboard</h1>

        <div className="content">
          <Dashboard openDrawer={openDrawerForCategory} />
          
          {/* Sidebar manager - only show when toggled */}
          {showManager && (
            <aside className="side-manager">
              <CategoriesManager onClose={() => setShowManager(false)} />
            </aside>
          )}
        </div>
      </main>

      {/* Widget drawer overlay */}
      {isDrawerOpen && (
        <AddWidgetDrawer
          categoryId={selectedCategory}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

