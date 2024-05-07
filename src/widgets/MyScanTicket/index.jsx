import QrScanner from "qr-scanner";
// styling
import styles from "./styles.module.scss";

// components
import LazyImage from "@components/LazyImage";
import Spring from "@components/Spring";
import Submenu from "@ui/Submenu";
import SelectionListTickets from "@ui/SelectionListTickets";
import { CircularProgress } from "@mui/material";
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
import React, { useEffect, useState, useRef } from "react";

import { gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import QrFrame from "./qr-frame.svg";
import { toast } from "react-toastify";
import { scanTicket } from "./../../features/event/eventSlide";

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
const MyScanTicket = () => {
  const { theme } = useThemeProvider();
  const [reqScanTicket, { data, loading }] = useMutation(SCAN_TICKET);

  const videoEl = useRef(HTMLVideoElement);
  const qrBoxEl = useRef(HTMLDivElement);

  let scanner = useRef(QrScanner);
  const [qrOn, setQrOn] = useState(true);
  // Result
  const [scanned, setScanned] = useState(false);
  //const [selected, setSelected] = useState(FINALS_OPTIONS[0].value);

  //const queryTicket = useQuery(GET_TICKETS)
  const status = useSelector((state) => state.events.status.ticket);
  const error = useSelector((state) => state.events.error);
  const message = useSelector((state) => state.events.message);

  const [code, setCode] = useState("No result");

  const dispatch = useDispatch();

  const startScanning = () => {
    // 🚀 Start QR Scanner
    scanner?.current
      ?.start()
      .then(() => setQrOn(true))
      .catch((err) => {
        console.log(err);
        if (err) setQrOn(false);
      });
  };
  // Success
  const onScanSuccess = async (result) => {
    // 🖨 Print the "result" to browser console.
    console.log(result);
    scanner?.current?.stop();
    setScanned(true);
    try {
      await dispatch(
        scanTicket({
          scanTicketsFunc: reqScanTicket,
          code: result.data,
        })
      ).unwarp();
      //toast.success("Ticket scanné");
    } catch (error) {
      console.log(error);
    }

    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    //setScannedResult(result?.data);
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    //console.log(!scanner.current);
    if (videoEl?.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });
    }

    //startScanning();
    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
    //console.log(selected);
  }, []);
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
    if (status === "failed") {
      toast.error(error);
    }
    if (status === "succeeded" && scanned) {
      message !== "" ? toast.success(message) : toast.error(error);
      setScanned(false);
    }
  }, [qrOn, status]);

  return (
    <Spring className="card">
      <div className="qr-reader">
        <div ref={qrBoxEl} className="qr-box">
          <img
            src={QrFrame}
            alt="Qr Frame"
            width={256}
            height={256}
            className="qr-frame"
          />
        </div>
        <video ref={videoEl}></video>
      </div>
      <div
        style={{
          marginLeft: "41%",
          marginTop: "25%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 99999,
        }}
      >
        {status === "loading" && (
          <>
            <CircularProgress color="success" />
          </>
        )}
      </div>

      {/* Show Data Result if scan is success */}
      {/* {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )} */}
      <div>
        <div className="d-flex flex-column g-12 card-padded"></div>
        <button
          className="btn w-100"
          onClick={() => {
            startScanning();
          }}
        >
          Scanner
        </button>
      </div>
    </Spring>
  );
};

export default MyScanTicket;
