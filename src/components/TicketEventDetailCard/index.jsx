// styling
import styles from "./styles.module.scss";
import Price from "@ui/Price";
import IconButton from "@ui/IconButton";

const TicketsEventDetailCard = ({}) => {
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
          <span className="text-600">Category:</span> VVIP
        </p>
        <p className="heading-font">
          <span className="text-600">Disponible:</span> 10
        </p>
      </div>

      <Price price={90.99} />
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

export default TicketsEventDetailCard;
