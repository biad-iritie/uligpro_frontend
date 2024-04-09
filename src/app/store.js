import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import eventReducer from "../features/event/eventSlide";

export default configureStore({
  reducer: {
    auth: userReducer,
    events: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "events/getAll/fulfilled",
          "events/getUserTickets/fulfilled",
        ],
      },
    }),
});
