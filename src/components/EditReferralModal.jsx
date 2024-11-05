import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_REFERRAL } from '../graphql/queriesAndMutations';

const EditReferralModal = ({ referral, isOpen, onClose, onUpdateSuccess }) => {
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    homeNameOrNumber: '',
    street: '',
    suburb: '',
    state: '',
    postcode: '',
    country: ''
  });

  const [updateReferral] = useMutation(UPDATE_REFERRAL, {
    onCompleted: () => {
      onUpdateSuccess();
      onClose();
    },
    onError: (error) => {
      console.error("Error updating referral:", error);
      alert("There was an error updating the referral.");
    },
  });

  useEffect(() => {
    if (referral) {
      setGivenName(referral.givenName);
      setSurname(referral.surname);
      setEmail(referral.email);
      setPhone(referral.phone);
      setAddress(referral.address || {
        homeNameOrNumber: '',
        street: '',
        suburb: '',
        state: '',
        postcode: '',
        country: ''
      });
    }
  }, [referral]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReferral({
      variables: {
        id: referral.id,
        input: {
          givenName,
          surname,
          email,
          phone,
          address: {
            homeNameOrNumber: address.homeNameOrNumber,
            street: address.street,
            suburb: address.suburb,
            state: address.state,
            postcode: address.postcode,
            country: address.country,
          },
        },
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Referral</h2>
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <h3>Personal Details</h3>
          <div className="two-column-layout">
            <label>
              Given Name:
              <input
                type="text"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                required
              />
            </label>
            <label>
              Surname:
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Address Fields */}
          <h3>Address</h3>
          <div className="two-column-layout">
            <label>
              Home Name or Number:
              <input
                type="text"
                name="homeNameOrNumber"
                value={address.homeNameOrNumber}
                onChange={handleAddressChange}
              />
            </label>
            <label>
              Street:
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
              />
            </label>
            <label>
              Suburb:
              <input
                type="text"
                name="suburb"
                value={address.suburb}
                onChange={handleAddressChange}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
              />
            </label>
            <label>
              Postcode:
              <input
                type="text"
                name="postcode"
                value={address.postcode}
                onChange={handleAddressChange}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleAddressChange}
              />
            </label>
          </div>

          <button type="submit">Update Referral</button>
        </form>
      </div>
    </div>
  );
};

export default EditReferralModal;
