// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// hooks
import { useThemeProvider } from "@contexts/themeContext";
import { gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

// utils
import { actionAfterPayment } from "../../features/event/eventSlide";

import { scanTicket } from "./../../features/event/eventSlide";

// assets
import successScan from "@assets/successScan.json";
import failledScan from "@assets/failledScan.json";
import { useEffect } from "react";

const SCAN_TICKET = gql`
  mutation GetTicketScanned($code: String!) {
    getTicketScanned(code: $code) {
      status
      error {
        code
        message
      }
    }
  }
`;

const CheckingTicket = () => {
  const { theme } = useThemeProvider();
  const dispatch = useDispatch();
  const [reqScanTicket, { data, loading }] = useMutation(SCAN_TICKET);

  const status = useSelector((state) => state.events.status.ticket);
  const error = useSelector((state) => state.events.error);
  const message = useSelector((state) => state.events.message);

  let { code } = useParams();

  const checkTicket = async (code) => {
    try {
      await dispatch(
        scanTicket({
          scanTicketsFunc: reqScanTicket,
          code: code,
        })
      ).unwrap();
    } catch (error) {
      //console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (code !== "" && code !== null) {
      //console.log(paymentId);
      checkTicket(code);
    }
  }, [code]);
  return (
    <Spring
      className={`${styles.container} card d-flex align-items-center flex-1`}
    >
      <div>
        {status === "failled" && "Ce code n'existe pas ou CONNECTEZ-VOUS"}
        {status === "loading" && "LOADING"}
      </div>
      {status === "succeeded" && (
        <>
          <div className={styles.media}>
            <Spring className="d-flex align-items-center justify-content-center flex-2 w-500 h-500">
              <Lottie
                animationData={error === null ? successScan : failledScan}
              />
              {/* <Lottie animationData={failledScan} /> */}
            </Spring>
          </div>
          <div className={styles.main}>
            <h2 className={styles.main_title}>
              {error === null ? (
                <span>{message}</span>
              ) : (
                <span>Ticket déjà scanné</span>
              )}
            </h2>
            {error !== null && <p className={styles.main_text}>{error}</p>}
            <NavLink
              className="btn"
              style={{ marginTop: "15px" }}
              onClick={() => {
                window.close();
              }}
            >
              Fermer
            </NavLink>
          </div>
        </>
      )}
    </Spring>
  );
};

export default CheckingTicket;
