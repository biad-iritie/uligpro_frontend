// components
import PasswordInput from "@components/PasswordInput";
import BasicCheckbox from "@ui/BasicCheckbox";
import ResetPasswordPopup from "@components/ResetPasswordPopup";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// utils
import classNames from "classnames";

import { addLoggedUser } from "./../features/user/userSlice";

import { gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(userInput: { email: $email, password: $password }) {
      user {
        name
        email
        tel
      }
      accessToken
      refreshToken
      error {
        code
        message
      }
    }
  }
`;

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
  const [login, { data, loading }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const onSubmit = async (credentials, e) => {
    console.log(credentials);
    e.preventDefault();
    try {
      await dispatch(
        addLoggedUser({
          loginFunc: login,
          email: credentials.email,
          password: credentials.password,
        })
      ).unwrap();

      navigate("/");
    } catch (error) {
      console.log(" Error", error);
    }
  };
  useEffect(() => {
    //console.log(loginStatus);
    if (loginStatus === "failed") {
      toast.error(error);
    }
  }, [dispatch, loginStatus]);
  const handleResetPassword = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="d-flex flex-column g-10"
          style={{ margin: "20px 0 30px" }}
        >
          <div className="d-flex flex-column g-20">
            <input
              className={classNames("field", { "field--error": errors.email })}
              type="text"
              placeholder="E-mail"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true, minLength: 8 }}
              render={({
                field: { ref, onChange, value },
                fieldState: { error },
              }) => (
                <PasswordInput
                  className={classNames("field", { "field--error": error })}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Mot de passe (minimum 8 charactères)"
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
        {loginStatus === "loading" ? (
          <div className="d-flex justify-content-between align-items-center">
            <CircularProgress color="success" style={{ margin: "auto" }} />
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn--sm" type="submit">
              Connexion
            </button>
            <button
              className="text-button text-button--sm"
              onClick={handleResetPassword}
            >
              Oublié mot de passe
            </button>
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
      <ResetPasswordPopup open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default LoginForm;
