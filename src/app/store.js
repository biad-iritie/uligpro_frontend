import { configureStore } from "@reduxjs/toolkit";
import TodosReducer from "../features/todos/todosSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    todos: TodosReducer,
    auth: userReducer,
  },
});
