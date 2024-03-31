// styling
import styles from "./styles.module.scss";

// components
import LazyImage from "@components/LazyImage";
import Spring from "@components/Spring";
import Submenu from "@ui/Submenu";
import SelectionListTickets from "@ui/SelectionListTickets";
import { LinearProgress } from "@mui/material";
import QRCode from "react-qr-code";
// hooks
import { useThemeProvider } from "@contexts/themeContext";
import useSubmenu from "@hooks/useSubmenu";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// hooks
import React, { useState, useEffect } from "react";
import html2PDF from "jspdf-html2canvas";

// utils
import classNames from "classnames";
import { messagesByDate } from "./../../utils/helpers";
// assets
import barcode from "@assets/tickets/barcode.svg";
// constants
import { FINALS_OPTIONS } from "@constants/selection_options";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { getUserTickets } from "./../../features/event/eventSlide";

const GET_TICKETS = gql`
  query GetUserTickets {
    getUserTickets {
      tickets {
        code
        event {
          name
          date
        }
        ticket_category {
          name
        }
      }
      error {
        message
        code
      }
    }
  }
`;
const MyTicket = () => {
  const { theme } = useThemeProvider();
  const { anchorEl, open, handleClick, handleClose } = useSubmenu();
  //const [selected, setSelected] = useState(FINALS_OPTIONS[0].value);
  const [selected, setSelected] = useState();
  const [getUserTicketsQuery] = useLazyQuery(GET_TICKETS);
  //const queryTicket = useQuery(GET_TICKETS)
  const status = useSelector((state) => state.events.status);

  const reduxGetUserTicket = useSelector((state) => state.events.tickets);
  const dispatch = useDispatch();

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  const download = () => {
    let page = document.getElementById("ticket");
    /* html2PDF(page, {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      output: "./generate.pdf",
    }); */

    console.log("download");
  };
  const submenuActions = [
    /*  {
      label: "Print",
      icon: "print",
    }, */
    {
      label: "Telecharger",
      icon: "pdf",
      onClick: download,
    },
    /*  {
      label: "Sent to E-mail",
      icon: "envelope",
    }, */
  ];

  const fetchTickets = async () => {
    try {
      await dispatch(
        getUserTickets({
          getUserTicketsFunc: getUserTicketsQuery,
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (
      status === "idle" ||
      (reduxGetUserTicket.length === 0 && status === "succeeded")
    ) {
      fetchTickets();
    }
    reduxGetUserTicket.length > 0 && setSelected(reduxGetUserTicket[0]);
    //console.log(selected);
  }, [dispatch, status, reduxGetUserTicket]);

  return (
    <Spring className="card">
      <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      {status === "loading" && (
        <>
          <LinearProgress color="success" />
        </>
      )}

      {status === "succeeded" &&
      reduxGetUserTicket.length > 0 &&
      selected !== undefined ? (
        <>
          <SelectionListTickets
            options={reduxGetUserTicket}
            active={selected}
            setActive={setSelected}
          />
          <div id="ticket">
            <div className={styles.header}>
              <h3>E-ticket</h3>
              <button aria-label="Ticket actions" onClick={handleClick}>
                <i className="icon icon-ticket-light" />
              </button>
              <Submenu
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                actions={submenuActions}
              />
            </div>
            {/*<LazyImage className={styles.cover} src={cover} alt="cover" />
       <div className={styles.teams}>
        <div className={styles.teams_item}>
          <LazyImage className={styles.logo} src={bayern} alt="Bayern Munich" />
          <h3>Bayern</h3>
          <span className="text-12">Munich, Germany</span>
        </div>
        <div className={styles.teams_item}>
          <LazyImage className={styles.logo} src={newcastle} alt="Newcastle" />
          <h3>Newcastle</h3>
          <span className="text-12">London, UK</span>
        </div>
      </div> */}
            <div>
              <div className={styles.details} id="ticket">
                <div className={styles.details_item}>
                  <span className="h6 label">Categorie</span>
                  <span className="h3">{selected.ticket_category.name}</span>
                </div>
                <div className={styles.details_item}>
                  <span className="h6 label">Match(s)</span>
                  <span className="h3">{selected.event.name}</span>
                </div>
                <div className={styles.details_item}>
                  <span className="h6 label">Date</span>
                  <span className="h3">
                    {messagesByDate(selected.event.date)}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column g-12 card-padded">
                {/* <span className="h6 label">{selected.code}</span> */}
                <div>
                  <QRCode value={selected.code} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h3>Pas de ticket</h3>
        </div>
      )}
    </Spring>
  );
};

export default MyTicket;
