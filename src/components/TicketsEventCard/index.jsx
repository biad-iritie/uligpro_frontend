// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import TicketsEventDetailCard from "@components/TicketEventDetailCard";

// hooks
import { useThemeProvider } from "@contexts/themeContext";
import { useWindowSize } from "react-use";

// utils
import PropTypes from "prop-types";
import { getClubInfo } from "@utils/helpers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const TicketsEventCard = ({ userName, tickets, index, variant = "basic" }) => {
  const { width } = useWindowSize();
  const { theme } = useThemeProvider();
  //const user = useSelector((state) => state.auth.user);
  let makeTicketWilling = {};
  tickets.map((ticket) => {
    makeTicketWilling[ticket.ticket_category.id] = 0;
  });
  const [ticketWilling, setTicketWilling] = useState(makeTicketWilling);
  const askTologin = () => {
    if (!userName) {
      toast.warning("Connectez vous ou creer un compte afin de pousuivre");
    }
  };

  //useEffect(() => {}, [tickets]);
  //console.log(makeTicketWilling);
  return (
    <Spring
      className={`${styles.container} ${styles[theme]} h-100`}
      type="slideUp"
      index={index}
    >
      <div style={{ margin: "20px" }} className="d-flex flex-column">
        <div className="d-flex flex-column g-30 flex-1">
          <div className="d-flex flex-column g-24">
            <div className="d-flex flex-column g-10">
              <span className="label label--store h6">Tickets</span>
              <div className="d-flex align-items-center justify-content-between">
                <h3 style={{ maxWidth: 240 }}>Tickets disponible</h3>
              </div>
            </div>
          </div>

          {tickets.map((ticket, index) => (
            <TicketsEventDetailCard ticket={ticket} />
          ))}
          <NavLink className="text-button" to={userName ? "/payment" : ""}>
            <button
              onClick={() => {
                !userName && askTologin();
              }}
              className="btn w-100"
            >
              Proceder au paiement
            </button>
          </NavLink>
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
