// components
import { NavLink } from "react-router-dom";
import PasswordInput from "@components/PasswordInput";
import Spring from "@components/Spring";
import { Fragment } from "react";
import { toast } from "react-toastify";
import ActivateAccountPopup from "@components/ActivateAccountPopup";
import { CircularProgress } from "@mui/material";

// hooks
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// utils
import classNames from "classnames";

import { gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import {
  getActivationToken,
  activateUserAccount,
} from "./../features/user/userSlice";

const ACTIVATION_TOKEN = gql`
  mutation RegisterRegularUser(
    $name: String!
    $email: String!
    $tel: String!
    $password: String!
  ) {
    registerRegularUser(
      UserInput: { name: $name, email: $email, tel: $tel, password: $password }
    ) {
      activationToken
      error {
        code
        message
      }
    }
  }
`;

const ACTIVATE_USER = gql`
  mutation ActivateUser($activationCode: String!, $activationToken: String!) {
    activateUser(
      activationInput: {
        activationCode: $activationCode
        activationToken: $activationToken
      }
    ) {
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

const SignUpForm = ({ standalone = true }) => {
  const [open, setOpen] = useState(false);
  const [registerRegularUser] = useMutation(ACTIVATION_TOKEN);
  const [activateUser] = useMutation(ACTIVATE_USER);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activationToken = useSelector((state) => state.auth.activationToken);
  const error = useSelector((state) => state.auth.error);
  const reqStatus = useSelector((state) => state.auth.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      numero: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const Wrapper = standalone ? Fragment : Spring;
  const wrapperProps = standalone ? {} : { className: "card card-padded" };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      await dispatch(
        getActivationToken({
          getActivationTokenFunc: registerRegularUser,
          email: data.email,
          password: data.password,
          name: data.name,
          tel: data.numero,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
    //console.log(data);
    //
    /* toast.success(
      `Account created! Please check your email ${data.email} to confirm your account.`
    ); */
  };

  const handleActivateUser = async (data, e) => {
    try {
      await dispatch(
        activateUserAccount({
          activateUserFunc: activateUser,
          activationCode: data.code,
          activationToken: activationToken,
        })
      ).unwrap();
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (reqStatus === "failed") {
      toast.error(error);
    }
    if (activationToken !== "") {
      setOpen(true);
    }
  }, [reqStatus, activationToken]);

  return (
    <Wrapper {...wrapperProps}>
      <div className="d-flex flex-column g-4">
        <h3>Crestion de compte</h3>
        <p className="text-12">
          Remplir le formulaire en dessous pour créer un compte
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="d-flex flex-column g-20"
          style={{ margin: "20px 0 30px" }}
        >
          <input
            className={classNames("field", {
              "field--error": errors.name,
            })}
            type="text"
            placeholder="Entrer votre nom"
            {...register("name", { required: true })}
          />
          <Controller
            control={control}
            name="numero"
            render={({ field: { ref, value, onChange } }) => (
              <PatternFormat
                required
                value={value}
                //minLength={19}
                className={classNames("field", {
                  "field--error": errors.phone,
                })}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Entrer votre numero"
                format="+225 ##########"
                mask="_"
                getInputRef={ref}
              />
            )}
          />
          {/* <input
            className={classNames("field", { "field--error": errors.lastName })}
            type="text"
            placeholder="Entrer votre numero"
            {...register("numero", { required: true })}
          /> */}
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
                placeholder="Entrer votre mot de passe (minimum 8 charactères)"
                innerRef={ref}
              />
            )}
          />
          {errors.password && (
            <p role="alert">
              Mot de passe doit atteindre au minimum 8 charactères
            </p>
          )}
          <Controller
            control={control}
            name="passwordConfirm"
            rules={{
              required: true,
              validate: (value) => value === watch("password"),
            }}
            render={({
              field: { ref, onChange, value },
              fieldState: { error },
            }) => (
              <PasswordInput
                className={classNames("field", { "field--error": error })}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Retaper votre mot de passe"
                innerRef={ref}
              />
            )}
          />
        </div>

        {reqStatus === "loading" ? (
          <div className="d-flex justify-content-between align-items-center">
            <CircularProgress color="success" style={{ margin: "auto" }} />
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn--sm">
              Creer compte
            </button>
            <button className="text-button text-button--sm">
              <NavLink aria-label="Inscription" to="/login">
                Connexion
              </NavLink>
            </button>
          </div>
        )}
      </form>
      <ActivateAccountPopup
        open={open}
        onClose={() => setOpen(false)}
        onActivate={handleActivateUser}
      />
    </Wrapper>
  );
};

export default SignUpForm;
