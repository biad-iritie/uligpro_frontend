// components
import Popup from "@components/Popup";
//import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ConfirmationPopup = ({ open, onClose, onValidation }) => {
  const reqStatus = useSelector((state) => state.auth.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    //toast.info(`New password was sent to ${data.email}`);
    onValidation();
    //handleClose();
  };

  return (
    <Popup open={open} onClose={handleClose}>
      <div className="d-flex flex-column g-20">
        <div className="d-flex flex-column g-10">
          <h2>Êtes-vous sûre ? </h2>
        </div>
        <div className="d-flex flex-column g-16">
          <form className="d-flex g-10" onSubmit={handleSubmit(onSubmit)}>
            <button className="btn btn--outlined" type="reset" onClick={reset}>
              NON
            </button>
            <button className="btn" type="submit">
              OUI
            </button>
          </form>
        </div>
      </div>
    </Popup>
  );
};

ConfirmationPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
};

export default ConfirmationPopup;
