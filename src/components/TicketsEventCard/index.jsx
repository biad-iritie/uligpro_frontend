// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import TicketsEventDetailCard from "@components/TicketEventDetailCard";

// hooks
import { useThemeProvider } from "@contexts/themeContext";
import { useWindowSize } from "react-use";

// utils
import PropTypes from "prop-types";
//import { getClubInfo } from "@utils/helpers";
//import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { setTicketsDesired } from "./../../features/event/eventSlide";
import { useDispatch } from "react-redux";

const TicketsEventCard = ({
  onSell,
  userName,
  tickets,
  index,
  variant = "basic",
}) => {
  const { width } = useWindowSize();
  const { theme } = useThemeProvider();
  //const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let makeTicketWilling = {};

  tickets.map(async (ticket) => {
    makeTicketWilling[ticket.ticket_category.id] = {
      name: ticket.ticket_category.name,
      price: ticket.price,
      quantity: 0,
    };
  });
  const [ticketsWilling, setTicketWilling] = useState(makeTicketWilling);
  const [nbTicket, setNbTicket] = useState(0);

  const askTologin = () => {
    if (!userName) {
      toast.warning("Connectez vous ou creer un compte afin de pousuivre");
      navigate("/login");
    }
  };

  const modifyQuantity = (how, category) => {
    /* const old = ticketsWilling[category];
    console.log(old); */
    //console.log(ticketsWilling);
    //console.log(ticketsWilling);
    let newValue = {};
    newValue[category] = ticketsWilling[category];

    if (how === "plus") {
      newValue[category].quantity = ticketsWilling[category].quantity + 1;
      setNbTicket(nbTicket + 1);
    } else {
      if (ticketsWilling[category].quantity > 0) {
        newValue[category].quantity = ticketsWilling[category].quantity - 1;
        setNbTicket(nbTicket - 1);
      }
      /* newValue[category].quantity =
        ticketsWilling[category].quantity > 0
          ? ticketsWilling[category].quantity - 1
          : 0; */
    }

    setTicketWilling({
      ...ticketsWilling,
      newValue,
    });

    //console.log(newValue);
  };

  const goPaymentPage = () => {
    let ableToMove = false;
    //console.log(!userName);

    tickets.map((ticket) => {
      if (ticketsWilling[ticket.ticket_category.id].quantity > 0) {
        ableToMove = true;
        return;
      }
    });
    if (ableToMove) {
      delete ticketsWilling.newValue;
      dispatch(setTicketsDesired(ticketsWilling));
      if (!userName) {
        askTologin();
      } else {
        navigate("/payment");
      }
    } else {
      toast.warning("Selectionnez vos tickets !");
    }
  };

  return (
    <Spring
      className={`${styles.container} ${styles[theme]} h-100`}
      type="slideUp"
      index={index}
    >
      <div style={{ margin: "20px" }} className="d-flex flex-column">
        <div className="d-flex flex-column g-30 flex-1">
          {/* <div className="d-flex flex-column g-24">
            <div className="d-flex flex-column g-10">
              <span className="label label--store h6">Tickets</span>
              <div className="d-flex align-items-center justify-content-between">
                <h3 style={{ maxWidth: 240 }}>Pas de ticket disponible</h3>
              </div>
            </div>
          </div> */}

          <p className="heading-font">
            <span className="text-600">Categories</span>
          </p>

          {Object.keys(ticketsWilling).length > 0 &&
            tickets.map((ticket, index) => (
              <TicketsEventDetailCard
                ticket={ticket}
                willingQuantity={ticketsWilling}
                operation={modifyQuantity}
                key={index}
                nbTicket={nbTicket}
              />
            ))}

          <button
            disabled={!onSell}
            className="btn w-100"
            onClick={() => {
              goPaymentPage();
            }}
          >
            Proceder au paiement
          </button>
        </div>
      </div>
    </Spring>
  );
};

TicketsEventCard.propTypes = {
  tickets: PropTypes.array.isRequired,
  index: PropTypes.number,
  variant: PropTypes.oneOf(["basic", "extended"]),
};

export default TicketsEventCard;
