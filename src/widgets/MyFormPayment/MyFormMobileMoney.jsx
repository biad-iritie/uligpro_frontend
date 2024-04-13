// styling
import styles from "./styles.module.scss";

// components
import CustomSelect from "@ui/CustomSelect";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

// utils
import classNames from "classnames";
import countryList from "react-select-country-list";
import { City } from "country-state-city";

const MyFormMobileMoney = () => {
  const providers = [
    { label: "Moov", value: "Moov" },
    { label: "Orange", value: "Orange" },
    { label: "MTN", value: "MTN" },
    { label: "Wave", value: "Wave" },
  ];
  const [selectedProvider, setselectedProvider] = useState();

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
      provider: null,
      debitNumber: "",
      otp: "",
    },
  });

  /*   const getCountriesOptions = () => {
    let countries = countryList().getData();
    console.log(countries);
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].value === "RU") {
        countries[i].label = "Russia [terrorist state]";
      }
    }
    return countries;
  }; */

  /*  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    let options = [];
    const rawData = City.getCitiesOfCountry(country.value);
    rawData.map((item) => options.push({ value: item.name, label: item.name }));
    setCities(options);
  }; */
  const handleProviderChange = (provider) => {
    setselectedProvider(provider);
  };

  // do something with the form data
  const onSubmit = (data) => {
    console.log(data);
    toast.success("Your changes have been successfully saved!");
  };
  useEffect(() => {
    //console.log(selectedProvider);
  });

  return (
    <form className="d-flex flex-column g-20" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <Controller
          name="provider"
          control={control}
          render={({ field }) => {
            return (
              <CustomSelect
                options={providers}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  handleProviderChange(value);
                }}
                placeholder="Selectionne ton moyen de paiement SVP"
                isSearchable={true}
                variant="basic"
                innerRef={field.ref}
              />
            );
          }}
        />
        {/* <Controller
          name="city"
          control={control}
          render={({ field }) => {
            return (
              <CustomSelect
                options={cities}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setSelectedCity(value);
                }}
                placeholder="City"
                isSearchable={true}
                variant="basic"
                innerRef={field.ref}
              />
            );
          }}
        /> */}
      </div>
      <div className={styles.row}>
        {/* <Controller
          name="debitNumber"
          control={control}
          render={({ field,onChange }) => (
            <PatternFormat
              required
              className={classNames("field", {
                "field--error": errors.debitNumber,
              })}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Entrer votre numero mpbile money  SVP"
              format="+225 ## ## ## ## ##"
              mask="_"
              getInputRef={field.ref}
            />
          )}
        /> */}
        <Controller
          control={control}
          name="debitNumber"
          render={({ field: { ref, value, onChange } }) => (
            <PatternFormat
              required
              value={value}
              //minLength={19}
              className={classNames("field", {
                "field--error": errors.phone,
              })}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Entrer votre numero mobile money  SVP"
              format="+225 ##########"
              mask="_"
              getInputRef={ref}
            />
          )}
        />
        {selectedProvider?.value === "Orange" ? (
          <input
            name="otp"
            className={classNames("field", { "field--error": errors.otp })}
            type="text"
            placeholder="rentrer votre code OTP"
            {...register("otp", {
              required: selectedProvider?.value === "Orange" ? true : false,
            })}
          />
        ) : (
          ""
        )}
      </div>
      <div className={styles.footer}>
        {selectedProvider && (
          <button className="btn" type="submit">
            Payer
          </button>
        )}

        {/* <button className="btn btn--outlined" type="reset" onClick={reset}>
          Annuler
        </button> */}
      </div>
    </form>
  );
};

export default MyFormMobileMoney;
