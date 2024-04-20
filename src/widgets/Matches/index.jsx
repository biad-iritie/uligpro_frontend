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
import { useLocation } from "react-router-dom";
// utils
import dayjs from "dayjs";
import { getMonthDays } from "@utils/helpers";
import classNames from "classnames";

// data placeholder
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvents,
  actionAfterPayment,
} from "./../../features/event/eventSlide";

import { setSelectedEvent } from "../../features/event/eventSlide";
// constants
//import { selectAllEvents } from "./../../features/event/eventSlide";
const CHECK_PAYMENT = gql`
  mutation ActionAfterPayment($idTransaction: String!) {
    actionAfterPayment(idTransaction: $idTransaction) {
      message
    }
  }
`;
const GET_EVENT = gql`
  query GetEvent {
    getComingEvents {
      events {
        id
        date
        name
        onSell
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
          createdAt
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
/* const Navigator = ({ active, setActive }) => {
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
}; */

const Matches = () => {
  const { direction } = useThemeProvider();
  /* const [selectedDay, setSelectedDay] = useState(
    parseInt(dayjs().format("DD"))
  ); */
  const dispatch = useDispatch();
  //dispatch(setStatusToIdle);
  const [checkPayment] = useMutation(CHECK_PAYMENT);
  const error = useSelector((state) => state.events.error);
  const eventStatus = useSelector((state) => state.events.status.event);
  const message = useSelector((state) => state.events.message);
  const events = useSelector((state) => state.events.events);
  const userName = useSelector((state) => state.auth.user.name);
  const [getEventsQuery] = useLazyQuery(GET_EVENT);
  const [selected, setSelected] = useState();

  const matches = useQuery(GET_EVENT);

  //let DisplayEvents;
  /*   let EVENTS_NAMES = [];
  let result = useQuery(GET_EVENT);
  console.log(result);
  const EVENTS = result.EVENTS.map((event, index) => {
    EVENTS_NAMES.push({ label: event.name, value: event.id });
  }); */

  //console.log(EVENTS_NAMES);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get("id");
  /* console.log("Check url");
  console.log(value); */
  const checkTransaction = async (transaction_id) => {
    try {
      await dispatch(
        actionAfterPayment({
          actionAfterPaymentFunc: checkPayment,
          idTransaction: transaction_id,
        })
      ).unwrap();
    } catch (error) {
      //console.log(error);
      toast.error(error.message);
    }
  };

  const fetchEvents = async () => {
    try {
      await dispatch(
        getEvents({
          getEventsFunc: getEventsQuery,
        })
      );
    } catch (error) {
      //console.log(error);
      toast.error("Desolé error au niveau du serveur");
    }
  };

  useEffect(() => {
    if (value !== "" && value !== null) {
      checkTransaction(value);
    }

    message === "SUCCESS" &&
      toast.success("Recuperez vos tickets dans votre profil");
    message === "FAILLED" && toast.error("Achat de ticket(s) non effectué");
  }, [value, message]);
  useEffect(() => {
    //console.log(eventStatus);
    if (eventStatus === "idle") {
      fetchEvents();
    }
    const today = new Date();
    let indexSelected = 0;
    if (events.length > 0) {
      let shouldBreak = false;
      events.forEach((event, index) => {
        let eventDate = new Date(event.date);
        /* console.log(eventDate.getTime());
        console.log(today.getTime()); */
        if (shouldBreak) return;
        if (eventDate >= today) {
          //console.log(index);
          indexSelected = index;
          shouldBreak = true;
          return;
        }
        indexSelected = index;
      });
      dispatch(setSelectedEvent(events[indexSelected]));
      setSelected(events[indexSelected]);
      //console.log(indexSelected);
    }
    //events.length > 0 && setSelected(events[0]);
    //console.log(selected);
  }, [eventStatus, dispatch, events]);

  //let content;

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
        {eventStatus === "succeeded" && selected !== undefined ? (
          <>
            <SelectionList
              options={events}
              active={selected.id}
              setActive={setSelected}
            />

            {/* <SelectionList
              options={eventNames}
              active={eventSelected.id}
              //setActive={setSelected}
            /> */}
            {/* <h3>{eventNames[0].label}</h3> */}
            <div className="d-flex justify-content-between align-items-center">
              <h3>{selected.name}</h3>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h3>{`Terrain:  ${selected.venue.name} 
              `}</h3>
              {/* Date: ${new Date(
                eventSelected.date
              )} */}
            </div>
            <div className={styles.grid}>
              <div className={styles.scroll}>
                <ScrollContainer height={0}>
                  <div
                    className={`${styles.scroll_track} ${styles[direction]} track d-flex flex-column g-20`}
                  >
                    {selected.matches.map((match, index) => (
                      <MyMatchCard match={match} index={index} key={index} />
                    ))}
                  </div>
                </ScrollContainer>
              </div>
              <div className={`${styles.card} ${styles[direction]}`}>
                <TicketsEventCard
                  onSell={selected.onSell}
                  userName={userName}
                  tickets={selected.ticket_categoryOnEvent}
                  variant="extended"
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <h3>Pas de matchs programmés</h3>
          </div>
        )}
      </div>
    </Spring>
  );
};

export default Matches;
