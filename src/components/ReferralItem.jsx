import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_REFERRAL } from '../graphql/queriesAndMutations';

const ReferralItem = ({ referral, onDelete, onEdit, className }) => {
  const [deleteReferral] = useMutation(DELETE_REFERRAL, {
    onCompleted: () => {
      onDelete(); // Refresh the list on successful deletion
    },
    onError: (error) => {
      console.error("Error deleting referral:", error);
      alert("There was an error deleting the referral.");
    }
  });

  //handle delete
  const handleDelete = async () => {
    console.log(referral.id)
    if (window.confirm("Are you sure you want to delete this referral?")) {
      try {
        const response = await deleteReferral({ variables: { id: referral.id } });
        if (response.data.deleteReferral) {
          onDelete();
        } else {
          alert("There was an error deleting the referral.");
        }
      } catch (error) {
        console.error("Error deleting referral:", error);
        alert("There was an error deleting the referral.");
      }
    }
  };
  
  //handle Edit
  const handleEdit = () => {
    onEdit(referral);
  };

  return (
    <tr className={className}>
      <td>{referral.givenName}</td>
      <td>{referral.surname}</td>
      <td>{referral.email}</td>
      <td>{referral.phone}</td>
      <td>
        <button onClick={() => handleEdit(referral)}>Edit</button>
        <button onClick={() => handleDelete(referral.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ReferralItem;
