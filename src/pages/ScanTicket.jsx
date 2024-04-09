// components
import PageHeader from "@layout/PageHeader";
import AppGrid from "@layout/AppGrid";
import MyScanTicket from "@widgets/MyScanTicket";
import { useDispatch } from "react-redux";
import { setStatusToIdle } from "./../features/event/eventSlide";

const widgets = {
  /* avatar: <ProfileAvatar />, */
  //info: <ProfileInfo />,
  ticket: <MyScanTicket />,
  //settings: <AccountSettings />,
  //password: <ChangePassword />,
};

const ScanTicket = () => {
  useDispatch(setStatusToIdle);
  return (
    <>
      <PageHeader title="Scanner Tickets" />
      <AppGrid id="scanticket" widgets={widgets} />
    </>
  );
};

export default ScanTicket;
