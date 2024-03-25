import AppGrid from "@layout/AppGrid";

import PageHeader from "@layout/PageHeader";

import MyRecapTicket from "@widgets/MyRecapTicket";
import MyFormPayment from "@widgets/MyFormPayment";

const widgets = {
  recap: <MyRecapTicket />,
  payment: <MyFormPayment />,
};
const MyBuyingTickets = () => {
  return (
    <>
      <PageHeader title="Paiement" />
      <AppGrid id="buying_ticket" widgets={widgets} />
    </>
  );
};

export default MyBuyingTickets;
