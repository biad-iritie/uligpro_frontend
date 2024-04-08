import { QRCode } from "react-qr-code";
// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
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
  PDFViewer,
} from "@react-pdf/renderer";

// hooks
import React, { useState, useEffect } from "react";

// utils
import { messagesByDateHour, displayFullDate } from "./../../utils/helpers";
// constants
import { gql, useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserTickets,
  setStatusToIdle,
} from "./../../features/event/eventSlide";

const GET_TICKETS = gql`
  query GetUserTickets {
    getUserTickets {
      tickets {
        code
        event {
          name
          date
          matches {
            team1 {
              name
              logo
            }
            team2 {
              name
              logo
            }
          }
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
  const dispatch = useDispatch();
  //dispatch(setStatusToIdle());
  //const [selected, setSelected] = useState(FINALS_OPTIONS[0].value);
  const [selected, setSelected] = useState();
  const [fetched, setFetched] = useState(false);
  const [getUserTicketsQuery] = useLazyQuery(GET_TICKETS);
  //const queryTicket = useQuery(GET_TICKETS)
  const ticketSelected = useSelector((state) => state.events.ticketSelected);

  const status = useSelector((state) => state.events.status.ticket);

  const reduxGetUserTicket = useSelector((state) => state.events.tickets);

  const Ticket = () => {
    //console.log(selected);
    const styles = StyleSheet.create({
      page: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        padding: 50,
      },
      header: {
        alignItems: "center",
      },
      body: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      info: {
        fontSize: 15,
        marginBottom: 10,
      },
      qrCode: {
        height: "200px",
        width: "200px",
        alignSelf: "flex-center",
      },
      notice: {
        fontSize: 10,
        marginTop: 10,
      },
    });
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>E-Ticket ULIGPRO</Text>

            <Text style={styles.info}> {selected.event.name}</Text>
            <Text style={styles.info}>
              Categorie : {selected.ticket_category.name}
            </Text>
            <Text style={styles.info}>
              Date: {displayFullDate(selected.event.date)}
            </Text>
          </View>

          {/* <Text style={styles.info}>Venue: {selected.event.venue.name}</Text> */}

          {/* {selected.event.matches.map((match) => {
            console.log(match.team1.name);
            <Text>{`${match.team1.name} VS ${match.team2.name}`}</Text>;
          })} */}

          {/* <Image
            src="soccer_ball.png"
            style={{ width: 50, height: 50, marginBottom: 20 }}
          /> */}
          <View style={styles.qrCode}>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                selected.code
              )}&size=250x500`}
            />
          </View>
          <View>
            <Text style={styles.notice}>
              Nous vous rappellons que, seul le premier ticket scanné sera
              accepté à entrer. Si un billet a été photocopié, il ne pourra pas
              entrer dans la salle . Aucune exception ne sera faite, même le
              ticket est a vôtre nom.
            </Text>
          </View>
        </Page>
      </Document>
    );
  };
  const submenuActions = [
    /*  {
      label: "Print",
      icon: "print",
    }, */
    {
      label: "Telecharger",
      icon: "pdf",
      //onClick: download,
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
  //fetchTickets();
  useEffect(() => {
    //|| (reduxGetUserTicket.length === 0 && status === "succeeded")

    if (status === "idle") {
      console.log(status);
      fetchTickets();
    }
    reduxGetUserTicket.length > 0 && setSelected(reduxGetUserTicket[0]);
    //console.log(selected);
  }, [dispatch, reduxGetUserTicket, status]);

  return (
    <Spring className="card">
      {status === "loading" && (
        <>
          <LinearProgress color="success" />
        </>
      )}

      {status === "succeeded" &&
      reduxGetUserTicket.length > 0 &&
      selected !== undefined ? (
        <>
          {/* <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Ticket />
          </PDFViewer> */}
          <SelectionListTickets
            options={reduxGetUserTicket}
            active={selected}
            setActive={setSelected}
          />

          <div className={styles.header}>
            <h3>E-ticket</h3>
            {/* <button aria-label="Ticket actions" onClick={handleClick}>
              <i className="icon icon-ticket-light" />
            </button>
            <Submenu
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
              actions={submenuActions}
            /> */}
          </div>

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
                  {messagesByDateHour(selected.event.date)}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column g-12 card-padded">
              {/* <span className="h6 label">{selected.code}</span> */}
              <div style={{ margin: "0 auto" }}>
                <QRCode value={selected.code} />
              </div>
            </div>
            <button className="btn w-100">
              <PDFDownloadLink
                document={<Ticket />}
                fileName={`${selected.code}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Telecharger"
                }
              </PDFDownloadLink>
            </button>
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
