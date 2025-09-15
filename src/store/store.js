import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
  // Add middleware for development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [], // Add any actions that might contain non-serializable values
      },
    }),
});

