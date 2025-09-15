import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleWidgetVisibility,
  addCategory,
  removeCategory,
  removeWidget,
} from "../store/dashboardSlice";

// Component for managing categories and widgets
function CategoriesManager({ onClose }) {
  const categories = useSelector((s) => s.dashboard.categories);
  const dispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState("");

  // Handle category deletion with confirmation
  const handleDeleteCategory = (categoryId, categoryTitle) => {
    if (window.confirm(`Delete category "${categoryTitle}" and all its widgets?`)) {
      dispatch(removeCategory(categoryId));
    }
  };

  // Handle widget deletion with confirmation
  const handleDeleteWidget = (categoryId, widgetId, widgetName) => {
    if (window.confirm(`Remove widget "${widgetName}"?`)) {
      dispatch(removeWidget({ categoryId, widgetId }));
    }
  };

  // Add a new category
  const handleAddCategory = () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      alert("Please enter a category name");
      return;
    }
    
    dispatch(addCategory({ title: trimmedName }));
    setNewCategoryName(""); // Clear input
  };

  return (
    <div className="categories-manager">
      <div className="mgr-header">
        <h4>Manage Categories & Widgets</h4>
        <button className="icon-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="manager-list">
        {categories.map((cat) => (
          <div className="mgr-cat" key={cat.id}>
            <div className="mgr-cat-top">
              <strong>{cat.title}</strong>
              <button
                className="tiny danger"
                onClick={() => handleDeleteCategory(cat.id, cat.title)}
              >
                Delete
              </button>
            </div>

            <div className="mgr-widgets">
              {cat.widgets.map((widget) => (
                <div className="mgr-widget-row" key={widget.id}>
                  <label className="inline-label">
                    <input
                      type="checkbox"
                      checked={widget.visible !== false}
                      onChange={(e) =>
                        dispatch(
                          toggleWidgetVisibility({
                            categoryId: cat.id,
                            widgetId: widget.id,
                            visible: e.target.checked,
                          })
                        )
                      }
                    />
                    <span className="mgr-widget-name">{widget.name}</span>
                  </label>

                  <button
                    className="tiny"
                    onClick={() => handleDeleteWidget(cat.id, widget.id, widget.name)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add new category section */}
      <div className="add-cat">
        <input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
        />
        <button
          className="btn"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

export default CategoriesManager;

