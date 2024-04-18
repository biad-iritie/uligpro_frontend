import { useEffect } from "react";

import AppGrid from "@layout/AppGrid";

import PageHeader from "@layout/PageHeader";

import MyRecapTicket from "@widgets/MyRecapTicket";
import MyFormPayment from "@widgets/MyFormPayment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const widgets = {
  recap: <MyRecapTicket />,
  //payment: <MyFormPayment />,
};
const MyBuyingTickets = () => {
  const ticketsDesired = useSelector((state) => state.events.ticketsDesired);
  const navigate = useNavigate();
  /* useEffect(() => {
    if (Object.keys(ticketsDesired).length === 0) {
      navigate("/");
    }
    console.log(Object.keys(ticketsDesired).length);
  }, [ticketsDesired]); */
  return (
    <>
      <PageHeader title="Paiement" />
      <AppGrid id="buying_ticket" widgets={widgets} />
    </>
  );
};

export default MyBuyingTickets;
