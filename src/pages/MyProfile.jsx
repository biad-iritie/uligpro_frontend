// components
import PageHeader from "@layout/PageHeader";
import AppGrid from "@layout/AppGrid";
import ProfileAvatar from "@widgets/ProfileAvatar";
import ProfileInfo from "@widgets/ProfileInfo";
import AccountSettings from "@widgets/AccountSettings";
import ChangePassword from "@widgets/ChangePassword";
import MyTicket from "@widgets/MyTicket";

const widgets = {
  /* avatar: <ProfileAvatar />, */
  info: <ProfileInfo />,
  ticket: <MyTicket />,
  settings: <AccountSettings />,
  password: <ChangePassword />,
};

const MyProfile = () => {
  return (
    <>
      <PageHeader title="Profile" />
      <AppGrid id="myprofile" widgets={widgets} />
    </>
  );
};

export default MyProfile;
