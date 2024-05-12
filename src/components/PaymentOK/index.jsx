// styling
import styles from "./styles.module.scss";

// components
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// hooks
import { useThemeProvider } from "@contexts/themeContext";
import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
// utils
import { actionAfterPayment } from "./../../features/event/eventSlide";

// assets
import paymentSuccess from "@assets/paymentSuccess.json";
import { useEffect } from "react";

const CHECK_PAYMENT = gql`
  mutation ActionAfterPayment($idTransaction: String!) {
    actionAfterPayment(idTransaction: $idTransaction) {
      message
    }
  }
`;

const PaymentOK = () => {
  const { theme } = useThemeProvider();
  const dispatch = useDispatch();
  const [checkPayment] = useMutation(CHECK_PAYMENT);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const transaction_id = queryParams.get("id");
  let paymentId =
    transaction_id === null
      ? localStorage.getItem("paymentId")
      : transaction_id;
  console.log(paymentId);

  const checkTransaction = async (transaction_id) => {
    transaction_id = transaction_id ? transaction_id.replace(/"/g, "") : "";
    try {
      await dispatch(
        actionAfterPayment({
          actionAfterPaymentFunc: checkPayment,
          idTransaction: transaction_id,
        })
      ).unwrap();
    } catch (error) {
      //console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (paymentId !== "" && paymentId !== null) {
      //console.log(paymentId);
      checkTransaction(paymentId);
    }
  }, [paymentId]);
  return (
    <Spring
      className={`${styles.container} card d-flex align-items-center flex-1`}
    >
      <div className={styles.media}>
        <Spring className="d-flex align-items-center justify-content-center flex-1 w-100 h-100">
          <Lottie animationData={paymentSuccess} />
        </Spring>
      </div>
      <div className={styles.main}>
        <h2 className={styles.main_title}>
          Merci! <span>L'achat a été effectué avec success.</span>
        </h2>
        <p className={styles.main_text}>
          SVP allez dans votre profil afin de le(s) télécharger.
        </p>
        {/* <NavLink className="btn" to="/">
          Go to Home
        </NavLink> */}
      </div>
    </Spring>
  );
};

export default PaymentOK;
