// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { LinearProgress } from "@mui/material";
import SelectionList from "@ui/SelectionList";
//import { NavLink } from "react-router-dom";
import MyMatchCard from "@components/MyMatchCard";
import TicketsEventCard from "@components/TicketsEventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import ScrollContainer from "@components/ScrollContainer";
import { toast } from "react-toastify";

// hooks
import { useThemeProvider } from "@contexts/themeContext";
import React, { useState, useEffect } from "react";
// utils
import dayjs from "dayjs";
import { getMonthDays } from "@utils/helpers";
import classNames from "classnames";

// data placeholder
import matches from "@db/matches";
import { gql, useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "./../../features/event/eventSlide";

// constants
import { FINALS_OPTIONS } from "@constants/selection_options";
//import { selectAllEvents } from "./../../features/event/eventSlide";
const GET_EVENT = gql`
  query GetEvent {
    getComingEvents {
      events {
        id
        date
        name
        venue {
          name
        }
        ticket_categoryOnEvent {
          ticket_category {
            id
            name
          }
          price
          capacity
          ticket_sold
        }
        matches {
          time
          team1 {
            name
            university
            logo
          }
          team2 {
            name
            university
            logo
          }
          goal1
          goal2
        }
      }
    }
  }
`;
const Navigator = ({ active, setActive }) => {
  const { theme, direction } = useThemeProvider();
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper) {
      swiper.slideToLoop(parseInt(active) - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper, active]);

  useEffect(() => {
    if (swiper) {
      swiper.changeLanguageDirection(direction);
      swiper.update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper, direction]);

  return (
    <div
      className={`${styles.navigator} ${
        theme === "light" ? styles.light : styles.dark
      }`}
    >
      <Swiper
        className="h-100"
        slidesPerView="auto"
        spaceBetween={10}
        centeredSlides={true}
        onSwiper={setSwiper}
        loop
        initialSlide={+active - 1}
      >
        {getMonthDays().map((day, index) => (
          <SwiperSlide className={styles.slide} key={index}>
            <div
              className={classNames(
                `${styles.navigator_item} ${styles[direction]}`,
                { [styles.active]: active === parseInt(day.date) }
              )}
              onClick={() => setActive(parseInt(day.date))}
            >
              <h4 className={styles.day}>{day.date}</h4>
              <span className="label h6">{day.weekday}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Matches = () => {
  const { direction } = useThemeProvider();
  const [selectedDay, setSelectedDay] = useState(
    parseInt(dayjs().format("DD"))
  );
  const error = useSelector((state) => state.events.error);
  const eventStatus = useSelector((state) => state.events.status);
  const events = useSelector((state) => state.events.events);
  const eventSelected = useSelector((state) => state.events.eventSelected);
  const listEventsName = useSelector((state) => state.events.listEventsName);
  const userName = useSelector((state) => state.auth.user.name);
  const [getEventsQuery] = useLazyQuery(GET_EVENT);
  const [selected, setSelected] = useState(FINALS_OPTIONS[0].value);
  //const [events, setEvents] = useState([]);

  //const [selected, setSelected] = useState();
  const [eventNames, setEventNames] = useState([]);
  //let eventNames = [];

  //let DisplayEvents;
  /*   let EVENTS_NAMES = [];
  let result = useQuery(GET_EVENT);
  console.log(result);
  const EVENTS = result.EVENTS.map((event, index) => {
    EVENTS_NAMES.push({ label: event.name, value: event.id });
  }); */

  //console.log(EVENTS_NAMES);
  const dispatch = useDispatch();

  const fetchEvents = async () => {
    try {
      await dispatch(
        getEvents({
          getEventsFunc: getEventsQuery,
        })
      );
    } catch (error) {
      console.log(error);
      toast.error("Desolé error au niveau du serveur");
    }
  };

  useEffect(() => {
    console.log(events);
    if (
      eventStatus === "idle" ||
      (events.length === 0 && eventStatus === "succeeded")
    ) {
      fetchEvents();
    }

    /*  if (eventStatus === "succeeded") {
      console.log(eventSelected);
      console.log(selected);
      let EVENTS_NAMES = [];
      console.log(events);
      events.map((event, index) => {
        EVENTS_NAMES.push({ label: event.name, value: event.id });
      });
      setEventNames(EVENTS_NAMES);
      setSelected(EVENTS_NAMES[0].value);
    } */
    /* if (events.length > 0) {
      let EVENTS_NAMES = [];
      console.log(events);
      events.map((event, index) => {
        EVENTS_NAMES.push({ label: event.name, value: event.id });
      });
      setEventNames(EVENTS_NAMES);
      setSelected(EVENTS_NAMES[0].value);
      /* events.map((event, index) => {
        eventNames.push({ label: event.name, value: event.id });
      }); 
    }*/

    //console.log(eventStatus);
    /* if (eventSelected !== "") {
      console.log(eventSelected);
      setDetailsSelectedEvent(
        useSelector((state) => state.events.eventSelected)
      );
    } */
  }, [eventStatus, dispatch]);

  let content;

  return (
    <Spring className="card d-flex flex-column">
      {eventStatus === "loading" ? (
        <>
          <LinearProgress color="success" />
        </>
      ) : (
        <></>
      )}

      <div
        className="card_header d-flex flex-column g-10"
        style={{ paddingBottom: 20 }}
      >
        <div className="d-flex justify-content-between align-items-center">
          {/*<h3>{dayjs().format("MMMM")} Matches à venir</h3>
           <NavLink className="text-button" to="/schedule">
            Scheduler
          </NavLink> */}
          <h3>Matchs à venir</h3>
        </div>

        {/* <Navigator active={selectedDay} setActive={setSelectedDay} />  */}
        {/* <SelectionList
          options={FINALS_OPTIONS}
          active={selected}
          setActive={setSelected}
        /> */}
        {eventStatus === "succeeded" && listEventsName.length > 0 ? (
          <>
            <SelectionList
              options={listEventsName}
              active={eventSelected.id}
              setActive={setSelected}
            />

            {/* <SelectionList
              options={eventNames}
              active={eventSelected.id}
              //setActive={setSelected}
            /> */}
            {/* <h3>{eventNames[0].label}</h3> */}
            <div className="d-flex justify-content-between align-items-center">
              <h3>{`Lieu:  ${eventSelected.venue.name} Date: ${new Date(
                eventSelected.date
              )}`}</h3>
            </div>
            <div className={styles.grid}>
              <div className={styles.scroll}>
                <ScrollContainer height={0}>
                  <div
                    className={`${styles.scroll_track} ${styles[direction]} track d-flex flex-column g-20`}
                  >
                    {eventSelected.matches.map((match, index) => (
                      <MyMatchCard match={match} index={index} key={index} />
                    ))}
                  </div>
                </ScrollContainer>
              </div>
              <div className={`${styles.card} ${styles[direction]}`}>
                <TicketsEventCard
                  userName={userName}
                  tickets={eventSelected.ticket_categoryOnEvent}
                  variant="extended"
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Spring>
  );
};

export default Matches;
