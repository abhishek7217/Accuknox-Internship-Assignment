import { createSlice } from "@reduxjs/toolkit";
import initialJson from "../data/dashboard.json";
import { v4 as uuidv4 } from "uuid";

// Helper to normalize initial data
const normalizeData = (rawData) => {
  try {
    const dataCopy = JSON.parse(JSON.stringify(rawData));
    dataCopy.categories = (dataCopy.categories || []).map((category) => {
      category.widgets = (category.widgets || []).map((widget) => ({
        visible: widget.visible === false ? false : true,
        ...widget,
      }));
      return category;
    });
    dataCopy.searchQuery = "";
    return dataCopy;
  } catch (error) {
    console.error("Error normalizing data:", error);
    return { categories: [], searchQuery: "" };
  }
};

const initialState = normalizeData(initialJson);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Add a new widget to a category
    addWidget: (state, action) => {
      const {
        categoryId,
        name,
        text = "",
        type = "donut",
        data = [],
      } = action.payload;
      
      const category = state.categories.find(cat => cat.id === categoryId) || state.categories[0];
      
      if (category) {
        category.widgets.push({
          id: uuidv4(),
          name,
          text,
          type,
          data,
          visible: true,
        });
      }
    },
    
    // Remove a widget from a category
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    
    // Toggle widget visibility
    toggleWidgetVisibility: (state, action) => {
      const { categoryId, widgetId, visible } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      
      if (category) {
        const widget = category.widgets.find(w => w.id === widgetId);
        if (widget) {
          widget.visible = !!visible;
        }
      }
    },
    
    // Add a new category
    addCategory: (state, action) => {
      const id = action.payload.id || uuidv4();
      state.categories.push({ 
        id, 
        title: action.payload.title, 
        widgets: [] 
      });
    },
    
    // Remove a category
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        category => category.id !== action.payload
      );
    },
    
    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload || "";
    },
    
    // Reset to initial state
    resetToInitial: () => {
      return normalizeData(initialJson);
    },
    
    // Import state (for future use)
    importState: (state, action) => {
      return normalizeData(action.payload);
    },
  },
});

export const {
  addWidget,
  removeWidget,
  toggleWidgetVisibility,
  addCategory,
  removeCategory,
  setSearchQuery,
  resetToInitial,
  importState,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

