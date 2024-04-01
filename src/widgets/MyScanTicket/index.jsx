import QRReader from "react-qr-code";
// styling
import styles from "./styles.module.scss";

// components
import LazyImage from "@components/LazyImage";
import Spring from "@components/Spring";
import Submenu from "@ui/Submenu";
import SelectionListTickets from "@ui/SelectionListTickets";
import { LinearProgress } from "@mui/material";
// hooks
import { useThemeProvider } from "@contexts/themeContext";
import useSubmenu from "@hooks/useSubmenu";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// hooks
import React, { useEffect } from "react";

import { gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

const MyScanTicket = () => {
  const { theme } = useThemeProvider();

  //const [selected, setSelected] = useState(FINALS_OPTIONS[0].value);

  //const queryTicket = useQuery(GET_TICKETS)
  const status = useSelector((state) => state.events.status);

  const dispatch = useDispatch();

  const handleScan = (data) => {
    if (data) {
      console.log("Result: ", data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    //console.log(selected);
  }, [dispatch, status]);

  return (
    <Spring className="card">
      {status === "loading" && (
        <>
          <LinearProgress color="success" />
        </>
      )}

      <div className={styles.header}>
        <h3>Champs de vision</h3>
      </div>
      <QRReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <div>
        <div className="d-flex flex-column g-12 card-padded"></div>
        <button className="btn w-100">Scanner</button>
      </div>
    </Spring>
  );
};

export default MyScanTicket;
