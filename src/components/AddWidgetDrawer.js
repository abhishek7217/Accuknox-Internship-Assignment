import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, toggleWidgetVisibility } from "../store/dashboardSlice";

// Available sections - might need to update these later
const SECTIONS = [
  { id: "cspm", title: "CSPM" },
  { id: "cwpp", title: "CWPP" },
  { id: "registry", title: "Image" }, // TODO: Check if we should rename this
  { id: "ticket", title: "Ticket" },
];

export default function AddWidgetDrawer({
  categoryId: initialCategory = null,
  onClose,
}) {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.dashboard.categories);
  // Set default section - first category or the one passed in
  const defaultSection = initialCategory || (categories[0] && categories[0].id);
  const [section, setSection] = useState(defaultSection);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [widgetType, setWidgetType] = useState("donut");
  
  // Sometimes this fails on first render, not sure why
  // console.log('Current section:', section);

  // Find the current category
  const currentCat = categories.find((c) => c.id === section);

  // Handle the confirm action
  const handleConfirm = () => {
    if (!name.trim()) {
      alert("Widget needs a name!"); // Simple validation
      return;
    }
    
    let widgetData = [];
    // Generate some random data based on type
    // In a real app, this would come from an API
    if (widgetType === "progress") {
      widgetData = [
        { name: "Critical", value: Math.floor(Math.random() * 20) + 1 },
        { name: "High", value: Math.floor(Math.random() * 50) + 1 },
        { name: "Medium", value: Math.floor(Math.random() * 100) + 1 },
      ];
    } else if (widgetType === "donut") {
      widgetData = [
        { name: "Connected", value: Math.floor(Math.random() * 50) },
        { name: "Not Connected", value: Math.floor(Math.random() * 50) },
      ];
    } else if (widgetType === "bar") {
      widgetData = [
        { name: "A", value: Math.floor(Math.random() * 100) },
        { name: "B", value: Math.floor(Math.random() * 100) },
      ];
    }
    // else if (widgetType === "text") - no data needed
    
    // Dispatch the action to add widget
    dispatch(addWidget({ 
      categoryId: section, 
      name, 
      text: description, 
      type: widgetType, 
      data: widgetData 
    }));
    
    onClose(); // Close the drawer
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <div className="drawer-header">
          <h3>Add New Widget</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          <p className="drawer-desc">
            Add a widget to personalize your dashboard
          </p>

          {/* Section tabs */}
          <div className="section-tabs">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                className={`tab ${section === s.id ? "active" : ""}`}
                onClick={() => setSection(s.id)}
              >
                {s.title}
              </div>
            ))}
          </div>

          {/* Toggle visibility of existing widgets */}
          {currentCat && currentCat.widgets.length > 0 && (
            <>
              <div className="manage-widgets">
                <p className="small-text">Toggle existing widgets:</p>
                {currentCat.widgets.map((w) => (
                  <div key={w.id} className="manage-row">
                    <label className="inline-label">
                      <input
                        type="checkbox"
                        checked={w.visible !== false}
                        onChange={(e) =>
                          dispatch(
                            toggleWidgetVisibility({
                              categoryId: section,
                              widgetId: w.id,
                              visible: e.target.checked,
                            })
                          )
                        }
                      />
                      <span>{w.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}

          {/* Form for new widget */}
          <div className="new-widget-form">
            <div className="form-group">
              <label htmlFor="widget-name">Widget Name *</label>
              <input
                id="widget-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Server Status"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="widget-desc">Description (optional)</label>
              <textarea
                id="widget-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this widget show?"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="widget-type">Widget Type</label>
              <select 
                id="widget-type"
                value={widgetType} 
                onChange={(e) => setWidgetType(e.target.value)}
              >
                <option value="donut">Donut Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="progress">Progress Bars</option>
                <option value="text">Text Only</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="drawer-actions">
            <button className="btn primary" onClick={handleConfirm}>
              Add Widget
            </button>
            <button className="btn secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

