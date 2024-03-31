// styling
import styles from "./styles.module.scss";

// components
import CustomSelect from "@ui/CustomSelect";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

// utils
import classNames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { buyTickets } from "./../../features/event/eventSlide";
import { useNavigate } from "react-router-dom";

const MyFormWave = ({ reqBuyTicket }) => {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const ticketsDesired = useSelector((state) => state.events.ticketsDesired);
  const eventSelected = useSelector((state) => state.events.eventSelected);
  const reqError = useSelector((state) => state.events.error);
  const message = useSelector((state) => state.events.message);
  const reqStatus = useSelector((state) => state.events.status);
  const [req_buyTickets, { data, loading }] = useMutation(reqBuyTicket);
  const dispatch = useDispatch();
  const [validate, setValidate] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      tel: "",
    },
  });

  // do something with the form data
  const onSubmit = async (data, e) => {
    e.preventDefault();
    let fixedTickets = [];
    Object.entries(ticketsDesired).forEach(([key, value]) => {
      fixedTickets.push({
        eventId: eventSelected.id,
        ticket_categoryId: key,
        quantity: value.quantity,
      });
    });
    console.log(fixedTickets);
    console.log(data.tel);
    try {
      await dispatch(
        buyTickets({
          buyTicketsFunc: req_buyTickets,
          tickets: fixedTickets,
          transaction: { debitNumber: data.tel, way: "WAVE" },
        })
      ).unwrap();

      //toast.success(message);
      toast.success("Allez dans votre profil pour telecharger vos tickets");

      navigate("/", { replace: true });
    } catch (error) {
      console.log(" Error", error);
    }
  };

  useEffect(() => {
    if (reqStatus === "failed") {
      toast.error(reqError);
    }
    if (Object.keys(ticketsDesired).length === 0) {
      navigate("/");
    }
    console.log(Object.keys(ticketsDesired).length);
  }, [dispatch, reqStatus]);

  return (
    <form className="d-flex flex-column g-20" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="tel"
          control={control}
          render={({ field: { ref, value, onChange } }) => (
            <PatternFormat
              required
              className={classNames("field", { "field--error": errors.tel })}
              placeholder="Entrer votre numero wave SVP"
              format="+225 ##########"
              mask="_"
              onChange={(e) => onChange(e.target.value)}
              value={value}
              getInputRef={ref}
            />
          )}
        />
      </div>

      <div className={styles.footer}>
        {reqStatus === "loading" ? (
          <div className="d-flex justify-content-between align-items-center">
            <CircularProgress color="success" style={{ margin: "auto" }} />
          </div>
        ) : (
          <>
            <button className="btn" type="submit">
              Payer
            </button>
            <button className="btn btn--outlined" type="reset" onClick={reset}>
              Annuler
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default MyFormWave;
