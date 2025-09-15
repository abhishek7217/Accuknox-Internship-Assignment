import React from "react";
import WidgetCard from "./WidgetCard";

// Component for displaying a category of widgets
function Category({ category, openDrawer, searchQuery }) {
  const query = (searchQuery || "").trim().toLowerCase();
  
  // Get visible widgets
  const visibleWidgets = (category.widgets || []).filter(w => w.visible !== false);
  
  // Filter widgets based on search query
  const filteredWidgets = query
    ? visibleWidgets.filter((widget) => {
        const nameMatch = (widget.name || "").toLowerCase().includes(query);
        const descMatch = (widget.text || "").toLowerCase().includes(query);
        // For chart widgets, check if data values match
        const dataMatch = widget.data 
          ? widget.data.some(item => 
              item.name.toLowerCase().includes(query) || 
              item.value.toString().includes(query)
            )
          : false;
        
        return nameMatch || descMatch || dataMatch;
      })
    : visibleWidgets;

  return (
    <section className="category">
      <div className="category-head">
        <h2>{category.title}</h2>
        {/* Could add category actions here later */}
      </div>

      <div className="widgets-grid">
        {/* Show message if no widgets to display */}
        {filteredWidgets.length === 0 && (
          <div className="empty-card">
            {query ? "No matching widgets" : "No widgets to show"}
          </div>
        )}

        {/* Render all filtered widgets */}
        {filteredWidgets.map((widget) => (
          <WidgetCard 
            key={widget.id} 
            categoryId={category.id} 
            widget={widget} 
          />
        ))}

        {/* Add widget button */}
        <div
          className="widget-card add-widget"
          onClick={() => openDrawer(category.id)}
        >
          <div>+ Add Widget</div>
        </div>
      </div>
    </section>
  );
}

export default Category;

