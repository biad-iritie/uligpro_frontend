import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { displayMonthDay } from "./../../utils/helpers";
const initialState = {
  status: { event: "idle", buyTicket: "idle", ticket: "idle" },
  error: null,
  events: [],
  eventSelected: {},
  ticketSelected: {},
  listEventsName: [],
  ticketsDesired: {},
  message: "",
  tickets: [],
  paymentUrl: "",
  responseCodeCP: "",
  paymentId: "",
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
        //transaction: data.transaction,
      },
    });
    //console.log(response);
    return response;
  }
);
export const scanTicket = createAsyncThunk(
  "events/scanTickets",
  async (data) => {
    //console.log(data);
    const response = await data.scanTicketsFunc({
      variables: {
        code: data.code,
      },
    });
    //console.log(response);
    return response;
  }
);

export const actionAfterPayment = createAsyncThunk(
  "events/actionAfterPayment",
  async (data) => {
    const response = await data.actionAfterPaymentFunc({
      variables: {
        idTransaction: data.idTransaction,
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
      //console.log(action.payload);
      state.ticketsDesired = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.eventSelected = action.payload;
    },
    getTicketsDesired: (state) => state.ticketsDesired,
    setStatusToIdle: (state) => {
      state.status = "idle";
    },
    resetPaymentUrl: (state) => {
      state.paymentUrl = "";
      state.status.buyTicket = "idle";
    },
    resetMessage: (state) => {
      //console.log("resetMessage");
      state.message = "";
    },
    cleanState: (state) => {
      state.status = { event: "idle", buyTicket: "idle", ticket: "idle" };
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
        state.status.event = "loading";
        state.ticketsDesired = {};
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        //console.log(action.payload.data.getComingEvents.events);
        // Add any fetched posts to the array
        //console.log(action.payload.data.getComingEvents.events.length);
        state.status.event = "succeeded";
        if (action.payload.data.getComingEvents.events.length > 0) {
          state.events = action.payload.data.getComingEvents.events;
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

          //select the first element
          state.eventSelected = state.events[0];
        } /* else {
          state.status = "failed";
          state.error = action.payload.error.message;
        } */
      })
      .addCase(getEvents.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status.event = "failed";
        state.error = action.error.message;
      })

      //BUY TICKETS
      .addCase(buyTickets.pending, (state, action) => {
        state.status.buyTicket = "loading";
      })
      .addCase(buyTickets.fulfilled, (state, action) => {
        //console.log(action);
        // Add any fetched posts to the array

        state.status.buyTicket = "succeeded";
        state.status.ticket = "idle";
        //state.message = action.payload.data.buyTickets.data.message;
        state.ticketsDesired = {};
        localStorage.setItem(
          "paymentId",
          JSON.stringify(action.payload.data.buyTickets.payment_id)
        );
        state.paymentId = action.payload.data.buyTickets.payment_id;
        state.paymentUrl = action.payload.data.buyTickets.payment_url;
        state.responseCodeCP = action.payload.data.buyTickets.code;
      })
      .addCase(buyTickets.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status.buyTicket = "failed";
        state.error = action.error.message;
      })

      // FETCH USER TICKETS
      .addCase(getUserTickets.pending, (state, action) => {
        state.status.ticket = "loading";
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.status.ticket = "succeeded";
        if (action.payload.data.getUserTickets.tickets.length > 0) {
          //console.log("getUserTickets");
          state.tickets = action.payload.data.getUserTickets.tickets;

          state.ticketSelected = state.tickets[0];
        }
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status.ticket = "failed";
        state.error = action.error.message;
      })

      //SCAN TICKETS
      .addCase(scanTicket.pending, (state, action) => {
        state.status.ticket = "loading";
      })
      .addCase(scanTicket.fulfilled, (state, action) => {
        state.status.ticket = "succeeded";
        if (action.payload.data.getTicketScanned.status) {
          state.message = "Ticket scanné";
          state.error = null;
        } else {
          state.error = action.payload.data.getTicketScanned.error.message;
          state.message = "";
        }
      })
      .addCase(scanTicket.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status.ticket = "failled";
        state.error = action.error.message;
      })

      //CHECKING TRansaction statut
      .addCase(actionAfterPayment.pending, (state, action) => {
        state.status.ticket = "loading";
        state.status.message = "";
      })
      .addCase(actionAfterPayment.fulfilled, (state, action) => {
        state.status.ticket = "succeeded";
        state.message = action.payload.data.actionAfterPayment.message;
        ["SUCCESS", "FAILLED"].includes(
          action.payload.data.actionAfterPayment.message
        ) && localStorage.removeItem("paymentId");
      })
      .addCase(actionAfterPayment.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status.ticket = "failed";
        state.error = action.error.message;
        state.message = "";
        //localStorage.removeItem("paymentId");
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
  setSelectedEvent,
  resetPaymentUrl,
  resetMessage,
} = Event.actions;
export default Event.reducer;

export const selectAllEvents = (state) => state.events.events;
//export const resetStatus = (state) => {state.events.message=};

/* export const selectEventById = (state, eventId) => {
  console.log(state);
  state.events.events.find((event) => event.id === eventId);
}; */
