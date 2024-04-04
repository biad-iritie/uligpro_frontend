import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { displayMonthDay } from "./../../utils/helpers";
const initialState = {
  status: "idle",
  error: null,
  events: [],
  eventSelected: {},
  listEventsName: [],
  ticketsDesired: {},
  message: "",
  tickets: [],
};

export const getEvents = createAsyncThunk("events/getAll", async (data) => {
  //console.log(data);
  const response = await data.getEventsFunc();
  //console.log(response);
  return response;
});
export const getUserTickets = createAsyncThunk(
  "events/getUserTickets",
  async (data) => {
    //console.log(data);
    const response = await data.getUserTicketsFunc();
    //console.log(response);
    return response;
  }
);
export const buyTickets = createAsyncThunk(
  "events/buyTickets",
  async (data) => {
    //console.log(data);
    const response = await data.buyTicketsFunc({
      variables: {
        tickets: data.tickets,
        transaction: data.transaction,
      },
    });
    //console.log(response);
    return response;
  }
);

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
    setTicketsDesired: (state, action) => {
      state.ticketsDesired = action.payload;
    },
    getTicketsDesired: (state) => state.ticketsDesired,
    setStatusToIdle: (state) => {
      state.status = "idle";
    },
    cleanState: (state) => {
      state.status = "idle";
      state.error = null;
      state.events = [];
      state.eventSelected = {};
      state.listEventsName = [];
      state.ticketsDesired = {};
      state.message = "";
      state.tickets = [];
    },
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
            //console.log(displayMonthDay(event.date));
            result.push({
              label: displayMonthDay(event.date),
              value: event.id,
            });
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
      })

      //BUY TICKETS
      .addCase(buyTickets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(buyTickets.fulfilled, (state, action) => {
        console.log(action);
        // Add any fetched posts to the array

        state.status = "succeeded";
        state.message = action.payload.data.buyTickets.message;
      })
      .addCase(buyTickets.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      })

      // FETCH USER TICKETS
      .addCase(getUserTickets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.tickets = action.payload.data.getUserTickets.tickets;
        state.status = "succeeded";
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectEventById,
  getEventsName,
  setTicketsDesired,
  getTicketsDesired,
  setStatusToIdle,
  cleanState,
} = Event.actions;
export default Event.reducer;

export const selectAllEvents = (state) => state.events.events;
//export const resetStatus = (state) => {state.events.message=};

/* export const selectEventById = (state, eventId) => {
  console.log(state);
  state.events.events.find((event) => event.id === eventId);
}; */
