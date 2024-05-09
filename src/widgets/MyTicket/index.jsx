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

// assets
import header_ticket from "@assets/tickets/header.png";
import footer_ticket from "@assets/tickets/footer.png";
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
          ticket_categoryOnEvent {
            price
          }
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
        padding: 25,
      },
      header: {
        alignItems: "center",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "#03590f",
        padding: (10, 20, 10, 20),
        color: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 5,
      },
      body: {
        justifyContent: "center",
        marginTop: "20px",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        color: "white",
      },
      qrZone: {
        //position:"absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        height: "200px",
        backgroundColor: "#03590f",
        marginRight: "10px",
        //zIndex: 8,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 5,
      },
      qrCode: {
        //position:"relative",
        width: "100px",
        height: "100px",
        //zIndex: -1,
        //width: "200px",
        //alignSelf: "flex-center",
      },
      scannezMoi: {
        backgroundColor: "#fe6000",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 5,
        padding: "10px",
        fontSize: "10px",
        color: "white",
        marginTop: "10px",
      },
      detailZone: {
        width: "50%",
        height: "200px",
        backgroundColor: "#03590f",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 5,
        padding: "10px",
      },
      eventName: {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 2,
        backgroundColor: "white",
        color: "#03590f",
        width: "100px",
        margin: "auto",
        marginBottom: "20px",
      },
      info: {
        fontSize: 15,
        marginBottom: 10,
      },
      notice: {
        fontSize: 10,
        fontWeight: "bold",
        marginTop: 5,
      },
    });
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={header_ticket} />
            <Text style={styles.title}>E-TICKET</Text>

            <Text style={styles.notice}>
              Nous vous rappellons que, seul le premier ticket scanné sera
              accepté à entrer. Si un billet a été photocopié, il ne pourra pas
              entrer dans la salle . Aucune exception ne sera faite, même le
              ticket est a vôtre nom.
            </Text>
          </View>
          <div style={styles.body}>
            <div style={styles.qrZone}>
              <View>
                <Image
                  style={styles.qrCode}
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                    selected.code
                  )}`}
                />

                <Text style={styles.scannezMoi}>SCANNEZ-MOI</Text>
              </View>
            </div>
            <div style={styles.detailZone}>
              <View>
                <View style={styles.eventName}>
                  <Text> {selected.event.name}</Text>
                </View>
                <View>
                  <Text style={styles.info}>
                    Date : {displayFullDate(selected.event.date)}
                  </Text>

                  <Text style={styles.info}>
                    Categorie : {selected.ticket_category.name}
                  </Text>
                  <Text style={styles.info}>
                    Tarif TTC :
                    {`${selected.ticket_category.ticket_categoryOnEvent[0].price} XOF`}
                  </Text>
                  <Text style={styles.info}>Infoline : (+225) 0777350142</Text>
                </View>
              </View>
            </div>
          </div>
          <Image src={footer_ticket} />
          {/* <Text style={styles.info}>Venue: {selected.event.venue.name}</Text> */}

          {/* {selected.event.matches.map((match) => {
            console.log(match.team1.name);
            <Text>{`${match.team1.name} VS ${match.team2.name}`}</Text>;
          })} */}

          {/* <Image
            src="soccer_ball.png"
            style={{ width: 50, height: 50, marginBottom: 20 }}
          /> */}
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
      //console.log(status);
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
          <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Ticket />
          </PDFViewer>
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
