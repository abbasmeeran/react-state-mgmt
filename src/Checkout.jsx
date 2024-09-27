import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED",
};

const emptyAddress = {
  country: "",
  city: "",
};
export default function Checkout({ cart, emptyCart }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

  //Derived state
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        setStatus(STATUS.COMPLETED);
        emptyCart();
      } catch (e) {
        setSaveError(e);
        console.log(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function handleOnChange(event) {
    event.persist();
    setAddress((curr) => {
      return { ...curr, [event.target.id]: event.target.value };
    });
  }

  function handleOnBlur(event) {
    event.persist();
    setTouched((curr) => {
      return { ...curr, [event.target.id]: true };
    });
  }

  function getErrors(address) {
    const res = {};
    if (!address.city) res.city = "City is required";
    if (!address.country) res.country = "Country is required";
    return res;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) return <h1> Thanks for shopping.</h1>;

  return (
    <>
      <h1>Shipping info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors.</p>
          <ul>
            {Object.keys(errors).map((key) => (
              <li>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            type="text"
            id="city"
            value={address.city}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          <p role="alert">
            {(touched.city || status === STATUS.COMPLETED) && errors.city}
          </p>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            type="text"
            id="country"
            value={address.country}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="United Kingdom">USA</option>
            <option value="">United Kingdom</option>
          </select>
          <p role="alert">
            {(touched.country || status === STATUS.COMPLETED) && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
