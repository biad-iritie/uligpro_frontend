// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import ScrollContainer from "@components/ScrollContainer";
import Popup from "@components/Popup";
import TruncatedText from "@components/TruncatedText";
import IconButton from "@ui/IconButton";
import CompareButton from "@ui/CompareButton";
import Like from "@ui/Like";

// hooks
import useMeasure from "react-use-measure";

// assets
import img1 from "@assets/cart/1.webp";
import img2 from "@assets/cart/2.webp";
import img3 from "@assets/cart/3.webp";
import img4 from "@assets/cart/4.webp";
import img5 from "@assets/cart/5.webp";
import img6 from "@assets/cart/6.webp";

import { getTicketsDesired } from "./../../features/event/eventSlide";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const MyRecapTicket = () => {
  //const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const [nameRef, { width }] = useMeasure();

  const ticketsDesired = useSelector((state) => state.events.ticketsDesired);
  const [tickets, setTickets] = useState([]);
  const [main_total, setTotal] = useState(0);

  useEffect(() => {
    //console.log("Effect");
    if (tickets.length === 0 && Object.keys(ticketsDesired).length > 0) {
      let mappingTicket = [];
      let sum_totals = 0;
      Object.entries(ticketsDesired).forEach(([key, value]) => {
        mappingTicket.push(value);
        sum_totals += value.quantity * value.price;
      });
      setTotal(sum_totals);
      setTickets(mappingTicket);
      console.log(tickets.length);
    }
  }, [ticketsDesired]);
  return (
    <Spring className={`${styles.card} card card-padded`}>
      <h3 className={styles.title}>Recapitulatif</h3>

      <div className="track d-flex flex-column flex-1">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => {
            const name = ticket.name;
            const price = `${ticket.price} FCFA`;
            const quantity = ticket.quantity;
            const total_price = `${ticket.price * ticket.quantity} FCFA`;

            return (
              <div
                style={{ paddingBottom: "10px" }}
                className={`${styles.item} d-flex align-items-center justify-content-between g-20`}
                key={index}
              >
                <div className="d-flex align-items-center flex-1 g-10">
                  <div className="d-flex flex-column flex-1" ref={nameRef}>
                    <TruncatedText
                      className="h4"
                      text={name}
                      width={width}
                      lines={1}
                    />

                    <span className={`label label--store h5`}>
                      {`${price} x ${quantity}`}
                    </span>
                  </div>
                </div>

                <h3 className="text-highlight">{total_price}</h3>
              </div>
            );
          })
        ) : (
          /* Object.entries(tickets).forEach(([key, value]) => {
            const name = value.name;
            const price = `${value.price} FCFA`;
            const total_price = `${value.price * value.quantity} FCFA`;
            return (
              <div
                style={{ paddingBottom: "10px" }}
                className={`${styles.item} d-flex align-items-center justify-content-between g-20`}
                key={key}
              >
                <div className="d-flex align-items-center flex-1 g-10">
                  <div className="d-flex flex-column flex-1" ref={nameRef}>
                    <TruncatedText
                      className="h4"
                      text={name}
                      width={width}
                      lines={1}
                    />

                    <span className={`label label--store h5`}>{price}</span>
                  </div>
                </div>

                <h3 className="text-highlight">{total_price}</h3>
              </div>
            );
          }) */
          <></>
        )}

        {/* {data.map((item) => {
          const price = `${item.price} FCFA`;
          const total_price = `${item.price * item.quantity} FCFA`;
          return (
            <div
              style={{ paddingBottom: "10px" }}
              className={`${styles.item} d-flex align-items-center justify-content-between g-20`}
              key={item.id}
            >
              <div className="d-flex align-items-center flex-1 g-10">
                <div className="d-flex flex-column flex-1" ref={nameRef}>
                  <TruncatedText
                    className="h4"
                    text={item.title}
                    width={width}
                    lines={1}
                  />

                  <span className={`label label--store h5`}>{price}</span>
                </div>
              </div>

              <h3 className="text-highlight">{total_price}</h3>
            </div>
          );
        })} */}
      </div>

      <div className="card-padded d-flex flex-column g-20" ref={footerRef}>
        <p className="d-flex justify-content-between h3">
          Total: <span>{`${main_total} FCFA`}</span>
        </p>
      </div>
    </Spring>
  );
};

export default MyRecapTicket;
