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

const ActivateAccountPopup = ({ open, onClose, onActivate }) => {
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
    onActivate(data);
    //handleClose();
  };

  return (
    <Popup open={open} onClose={handleClose}>
      <div className="d-flex flex-column g-20">
        <div className="d-flex flex-column g-10">
          <h2>Finaliser votre Inscription</h2>

          <p>Un code a été envoyé à votre email, renseigné le ici.</p>
        </div>
        <div className="d-flex flex-column g-16">
          <form className="d-flex g-10" onSubmit={handleSubmit(onSubmit)}>
            <input
              className={classNames("field", { "field--error": errors.email })}
              type="text"
              placeholder="Entrer le code"
              {...register("code", { required: true, minLength: 3 })}
            />

            {reqStatus === "loading" ? (
              <CircularProgress color="success" style={{ margin: "auto" }} />
            ) : (
              <button className="btn" type="submit">
                Activer
              </button>
            )}
          </form>
          <p className="text-12">
            Si vous ne recevez pas d'e-mail dans les minutes qui suivent,
            veuillez vérifier votre dossier de courrier indésirable.
          </p>
        </div>
      </div>
    </Popup>
  );
};

ActivateAccountPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
};

export default ActivateAccountPopup;
