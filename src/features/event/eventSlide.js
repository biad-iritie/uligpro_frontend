import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  events: [],
  eventSelected: {},
  listEventsName: [],
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
  reducers: {
    selectEventById: (state, action) => {
      state.eventSelected = state.events.find(
        (event) => event.id === action.payload
      );
      /*  state.events.eventSelected = state.events.events.find(
        (event) => event.id === action.payload
      ); */
    },
    /* setEventsName: (state) => {
      let result = [];
      state.events.map((event, index) => {
        result.push({ label: event.name, value: event.id });
      });
      state.listEventsName = result;
    }, */
    getEventsName: (state) => state.listEventsName,
  },
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
          //console.log(state.events);
          //Get name of event
          let result = [];
          state.events.map((event, index) => {
            result.push({ label: event.name, value: event.id });
          });
          state.listEventsName = result;

          //select the first journey
          state.eventSelected = state.events[0];
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

export const { selectEventById, getEventsName } = Event.actions;
export default Event.reducer;

export const selectAllEvents = (state) => state.events.events;
/* export const selectEventById = (state, eventId) => {
  console.log(state);
  state.events.events.find((event) => event.id === eventId);
}; */
