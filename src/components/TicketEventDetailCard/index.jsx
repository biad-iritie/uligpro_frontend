// styling
import styles from "./styles.module.scss";
import Price from "@ui/Price";
import IconButton from "@ui/IconButton";
import PropTypes from "prop-types";

const TicketsEventDetailCard = ({ ticket, willingQuantity, operation }) => {
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
        <div className="d-flex flex-row">
          <p className="heading-font">
            {/* <span className="text-600">Category:</span> */}
            {ticket.ticket_category.name}
          </p>
          <p className="heading-font">
            {/* <span className="text-600">Disponible: </span>
          {ticket.capacity - ticket.ticket_sold} */}
          </p>
        </div>
      </div>
      <Price price={ticket.price} />

      <span
        className="square h4"
        style={iconStyles}
        onClick={() => {
          operation("minus", ticket.ticket_category.id);
        }}
      >
        -
      </span>
      <div className={`${styles.footer_details} d-flex flex-column g-8`}>
        <p className="heading-font">
          <span className="text-600">
            {willingQuantity[ticket.ticket_category.id].quantity}
          </span>
        </p>
      </div>
      <IconButton
        icon={"plus"}
        onClick={() => {
          operation("plus", ticket.ticket_category.id);
        }}
      />
    </div>
  );
};

TicketsEventDetailCard.propTypes = {
  ticket: PropTypes.object.isRequired,
  willingQuantity: PropTypes.object.isRequired,
};
export default TicketsEventDetailCard;
