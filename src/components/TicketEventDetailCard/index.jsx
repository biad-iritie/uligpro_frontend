// styling
import styles from "./styles.module.scss";
import Price from "@ui/Price";
import IconButton from "@ui/IconButton";
import PropTypes from "prop-types";

const TicketsEventDetailCard = ({ ticket }) => {
  const iconStyles = {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "var(--grass)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontSize: "1rem",
  };
  return (
    <div
      className={`${styles.footer} d-flex align-items-center justify-content-between border-top`}
    >
      <div className={`${styles.footer_details} d-flex flex-column g-8`}>
        <p className="heading-font">
          <span className="text-600">Category:</span>{" "}
          {ticket.ticket_category.name}
        </p>
        <p className="heading-font">
          <span className="text-600">Disponible:</span>{" "}
          {ticket.capacity - ticket.ticket_sold}
        </p>
      </div>

      <Price price={ticket.price} />
      <span className="square h4" style={iconStyles} onClick={() => {}}>
        -
      </span>
      <div className={`${styles.footer_details} d-flex flex-column g-8`}>
        <p className="heading-font">
          <span className="text-600">0</span>
        </p>
      </div>
      <IconButton icon={"plus"} />
    </div>
  );
};

TicketsEventDetailCard.propTypes = {
  ticket: PropTypes.object.isRequired,
};
export default TicketsEventDetailCard;
