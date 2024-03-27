import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  events: [],
};

export const getEvents = createAsyncThunk("events/getAll", async (data) => {
  //console.log(data);
  const response = await data.getEventsFunc();
  //console.log(response);
  return response;
});

const Event = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEvents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        //console.log(action.payload.data.getComingEvents.events);
        // Add any fetched posts to the array
        if (action.payload.data.getComingEvents.events[0].id) {
          state.events = state.events.concat(
            action.payload.data.getComingEvents.events
          );

          state.status = "succeeded";
        } else {
          state.status = "failed";
          state.error = action.payload.error.message;
        }
      })
      .addCase(getEvents.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = Event.actions;
export default Event.reducer;

export const selectAllEvents = (state) => state.events.events;
