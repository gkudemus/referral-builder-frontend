import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_REFERRAL } from "../graphql/queriesAndMutations";

const ReferralForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    givenName: "",
    surname: "",
    email: "",
    phone: "",
    address: {
      homeNameOrNumber: "",
      street: "",
      suburb: "",
      state: "",
      postcode: "",
      country: "",
    },
  });

  const [createReferral, { loading, error }] = useMutation(CREATE_REFERRAL, {
    onCompleted: () => {
      onSuccess();
      setFormData({
        givenName: "",
        surname: "",
        email: "",
        phone: "",
        address: {
          homeNameOrNumber: "",
          street: "",
          suburb: "",
          state: "",
          postcode: "",
          country: "",
        },
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReferral({ variables: { input: formData } });
  };

  return (
    <form className="referral-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create Referral</h2>

      {/* Personal Details */}
      <h3 className="address-title">Personal Details</h3>
      <div className="two-column-layout">
        <div className="form-group">
          <label htmlFor="givenName">
            Given Name:
            <input
              type="text"
              name="givenName"
              value={formData.givenName}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="surname">
            Surname:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
      </div>

      {/* Address Details */}
      <h3 className="address-title">Address</h3>
      <div className="two-column-layout">
        <div className="form-group">
          <label htmlFor="homeNameOrNumber">
            Home Name/Num:
            <input
              type="text"
              name="address.homeNameOrNumber"
              value={formData.address.homeNameOrNumber}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="street">
            Street:
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="suburb">
            Suburb:
            <input
              type="text"
              name="address.suburb"
              value={formData.address.suburb}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="state">
            State:
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="postcode">
            Postcode:
            <input
              type="text"
              name="address.postcode"
              value={formData.address.postcode}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="country">
            Country:
            <input
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "Creating..." : "Create Referral"}
      </button>

      {/* Error Message */}
      {error && <p className="error-message">Error: {error.message}</p>}
    </form>
  );
};

export default ReferralForm;
