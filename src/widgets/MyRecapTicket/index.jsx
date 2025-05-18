// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";
import TruncatedText from "@components/TruncatedText";
import { CircularProgress } from "@mui/material";
// hooks
import useMeasure from "react-use-measure";

// assets

import {
  getTicketsDesired,
  resetPaymentUrl,
} from "./../../features/event/eventSlide";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buyTickets } from "./../../features/event/eventSlide";
import { actionAfterPayment } from "./../../features/event/eventSlide";

const BUY_TICKET = gql`
  mutation BuyTickets($tickets: [buyTicketsEventInput!]!) {
    buyTickets(tickets: $tickets) {
      code
      payment_url
      payment_token
      payment_id
      error {
        code
        message
      }
    }
  }
`;
const CHECK_PAYMENT = gql`
  mutation ActionAfterPayment($idTransaction: String!) {
    actionAfterPayment(idTransaction: $idTransaction) {
      message
    }
  }
`;
const MyRecapTicket = () => {
  //const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const [nameRef, { width }] = useMeasure();
  const navigate = useNavigate();
  const ticketsDesired = useSelector((state) => state.events.ticketsDesired);
  const eventSelected = useSelector((state) => state.events.eventSelected);
  const [tickets, setTickets] = useState([]);
  const [main_total, setTotal] = useState(0);
  const reqError = useSelector((state) => state.events.error);
  const status = useSelector((state) => state.events.status.buyTicket);
  const paymentUrl = useSelector((state) => state.events.paymentUrl);
  const payment_id = useSelector((state) => state.events.payment_id);
  const [req_buyTickets, { data, loading }] = useMutation(BUY_TICKET);
  const dispatch = useDispatch();
  const message = useSelector((state) => state.events.message);
  const [checkPayment] = useMutation(CHECK_PAYMENT);

  const proceedPaiement = async () => {
    let fixedTickets = [];
    Object.entries(ticketsDesired).forEach(([key, value]) => {
      fixedTickets.push({
        eventId: eventSelected.id,
        ticket_categoryId: key,
        quantity: value.quantity,
      });
    });

    try {
      await dispatch(
        buyTickets({
          buyTicketsFunc: req_buyTickets,
          tickets: fixedTickets,
          //transaction: { debitNumber: data.tel, way: "WAVE" },
        })
      ).unwrap();

      //toast.success(message);
      //toast.success("Allez dans votre profil pour telecharger vos tickets");

      //navigate("/", { replace: true });
    } catch (error) {
      console.log(" Error", error);
      toast.error(error.message);
    }
  };

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
      //console.log(tickets.length);
    }
    /* console.log(paymentUrl);
    console.log(status); */
    if (paymentUrl !== "" && status === "succeeded") {
      //fixed console.log("redirect");
      console.log("paymentUrl:", paymentUrl);
      window.open(paymentUrl, "_blank", "rel=noopener noreferrer");
      setTimeout(async () => {
        try {
          await dispatch(
            actionAfterPayment({
              actionAfterPaymentFunc: checkPayment,
              idTransaction: payment_id,
            })
          ).unwrap();
        } catch (error) {
          toast.error(error.message);
        }
      }, 120000); // 2 minutes in milliseconds

      dispatch(resetPaymentUrl());
    }
    if (Object.keys(ticketsDesired).length === 0) {
      navigate("/");
    }
  }, [ticketsDesired, status, paymentUrl]);
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
      <div className={styles.footer}>
        {status === "loading" ? (
          <div className="d-flex justify-content-between align-items-center">
            <CircularProgress color="success" style={{ margin: "auto" }} />
          </div>
        ) : (
          <>
            <button
              disabled={tickets.length === 0 ? true : false}
              className="btn w-100"
              onClick={() => {
                proceedPaiement();
              }}
            >
              Proceder au paiement
            </button>
          </>
        )}
      </div>
    </Spring>
  );
};

export default MyRecapTicket;
