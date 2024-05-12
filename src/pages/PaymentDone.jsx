// components
import PageHeader from "@layout/PageHeader";
import PaymentOK from "@components/PaymentOK";

const PaymentDone = () => {
  return (
    <>
      <PageHeader title="Ticket(s) Acheté(s)" />
      <PaymentOK />
    </>
  );
};

export default PaymentDone;
