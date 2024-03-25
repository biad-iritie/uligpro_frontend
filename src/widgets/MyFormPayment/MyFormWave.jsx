// styling
import styles from "./styles.module.scss";

// components
import CustomSelect from "@ui/CustomSelect";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";
// hooks
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

// utils
import classNames from "classnames";
import countryList from "react-select-country-list";
import { City } from "country-state-city";

const MyFormWave = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedCountry, setSelectedCountry] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectedCity, setSelectedCity] = useState();
  const [cities, setCities] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: "Lottie Poole",
      phone: "",
      email: "",
      birth: "",
      country: null,
      city: null,
      address: "",
      zip: "",
    },
  });

  const getCountriesOptions = () => {
    let countries = countryList().getData();
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].value === "RU") {
        countries[i].label = "Russia [terrorist state]";
      }
    }
    return countries;
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    let options = [];
    const rawData = City.getCitiesOfCountry(country.value);
    rawData.map((item) => options.push({ value: item.name, label: item.name }));
    setCities(options);
  };

  // do something with the form data
  const onSubmit = (data) => {
    toast.success("Your changes have been successfully saved!");
  };

  return (
    <form className="d-flex flex-column g-20" onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* <input
          className={classNames("field", { "field--error": errors.name })}
          type="text"
          defaultValue="Lottie Poole"
          placeholder="Name"
          {...register("name", { required: true })}
        /> */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PatternFormat
              required
              className={classNames("field", { "field--error": errors.phone })}
              placeholder="Entrer votre numero wave SVP"
              format="+225 ## ## ## ## ##"
              mask="_"
              getInputRef={field.ref}
            />
          )}
        />
      </div>

      <div className={styles.footer}>
        <button className="btn" type="submit">
          Payer
        </button>

        <button className="btn btn--outlined" type="reset" onClick={reset}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default MyFormWave;
