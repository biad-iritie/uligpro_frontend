// styling
import styles from "./styles.module.scss";

// components
import { CircularProgress } from "@mui/material";
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// hooks
import { useThemeProvider } from "@contexts/themeContext";
import { gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

// utils
import { actionAfterPayment } from "../../features/event/eventSlide";
import classNames from "classnames";
import { scanTicket } from "../../features/event/eventSlide";

// assets
import successScan from "@assets/successScan.json";
import failledScan from "@assets/failledScan.json";
import { useEffect } from "react";
import { useState } from "react";

const CHECK_PAYMENT = gql`
  mutation ActionAfterPayment($idTransaction: String!) {
    actionAfterPayment(idTransaction: $idTransaction) {
      message
    }
  }
`;

const VerifyPayment = () => {
  const { theme } = useThemeProvider();
  const dispatch = useDispatch();
  const [checkPayment] = useMutation(CHECK_PAYMENT);

  const status = useSelector((state) => state.events.status.ticket);
  const error = useSelector((state) => state.events.error);
  const message = useSelector((state) => state.events.message);
  const [isFilling, setIsFilling] = useState(true);
  //let { code } = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      id_transaction: "",
      //rememberMe: false,
    },
  });
  const onSubmit = async (data, e) => {
    //console.log(data.id_transaction);
    e.preventDefault();
    try {
      setIsFilling(false);
      await dispatch(
        actionAfterPayment({
          actionAfterPaymentFunc: checkPayment,
          idTransaction: data.id_transaction,
        })
      ).unwrap();
    } catch (error) {
      //console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Spring
      className={`${styles.container} card d-flex align-items-center flex-1`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="d-flex flex-column g-20"
          style={{ margin: "20px 0 30px", width: "340px" }}
        >
          {isFilling ? (
            <div className="d-flex flex-column g-20">
              <input
                className={classNames("field", { "field--error": errors })}
                type="text"
                placeholder="Entrer le numero de la transaction"
                disabled={status === "loading" ? true : false}
                {...register("id_transaction", { required: true })}
              />
            </div>
          ) : (
            <>
              <div className={styles.media}>
                <Spring className="d-flex align-items-center justify-content-center flex-1 w-100 h-100">
                  <Lottie
                    animationData={
                      (status === "succeeded" &&
                        message === "SUCCESS" &&
                        successScan) ||
                      (status === "succeeded" &&
                        message === "FAILLED" &&
                        failledScan)
                    }
                  />
                </Spring>
              </div>
              <div className={styles.main}>
                <h2 className={styles.main_title}>
                  <span>
                    {message === "SUCCESS" && "Paiement effectué avec succès"}
                    {message === "FAILLED" && "Paiement n'a pas été effectué"}
                    {status === "failed" &&
                      "Le numero de paiment n'existe pas "}
                  </span>
                </h2>
              </div>
            </>
          )}
        </div>
        {status === "loading" ? (
          <div className="d-flex justify-content-between align-items-center">
            <CircularProgress color="success" style={{ margin: "auto" }} />
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            {isFilling ? (
              <button
                className="btn btn--sm"
                type="submit"
                style={{ marginLeft: "120px" }}
              >
                Verifier
              </button>
            ) : (
              <NavLink
                className="btn"
                style={{ marginLeft: "120px" }}
                onClick={() => {
                  reset({ id_transaction: "" });
                  setIsFilling(true);
                }}
              >
                Nouveau
              </NavLink>
            )}
          </div>
        )}

        {/* <button
            className="btn btn--sm"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Connexion
          </button>
          <button
            className="text-button text-button--sm"
            onClick={handleResetPassword}
          >
            Oublié mot de passe
          </button> */}
      </form>
    </Spring>
  );
};

export default VerifyPayment;
