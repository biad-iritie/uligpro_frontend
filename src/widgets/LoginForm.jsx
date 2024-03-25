// components
import PasswordInput from "@components/PasswordInput";
import BasicCheckbox from "@ui/BasicCheckbox";
import ResetPasswordPopup from "@components/ResetPasswordPopup";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";
// hooks
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// utils
import classNames from "classnames";

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      //rememberMe: false,
    },
  });
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <h1>Connexion</h1>
      <form>
        <div
          className="d-flex flex-column g-10"
          style={{ margin: "20px 0 30px" }}
        >
          <div className="d-flex flex-column g-20">
            <input
              className={classNames("field", { "field--error": errors.email })}
              type="text"
              placeholder="Login"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({
                field: { ref, onChange, value },
                fieldState: { error },
              }) => (
                <PasswordInput
                  className={classNames("field", { "field--error": error })}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Mot de passe"
                  innerRef={ref}
                />
              )}
            />
          </div>
          <div className="d-flex align-items-center g-10">
            {/* <Controller control={control}
                                    name="rememberMe"
                                    render={({field: {ref, onChange, value}}) => (
                                        <BasicCheckbox id="rememberMe"
                                                       checked={value}
                                                       onChange={e => onChange(e.target.checked)}
                                                       innerRef={ref}/>
                                    )}
                        /> */}
            <NavLink aria-label="Inscription" to="/sign-up">
              <label htmlFor="rememberMe">Inscrivez-vous</label>
            </NavLink>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <CircularProgress color="success" />
          <button
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
          </button>
        </div>
      </form>
      <ResetPasswordPopup open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default LoginForm;
