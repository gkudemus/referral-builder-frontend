import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { GET_REFERRALS } from '../graphql/queriesAndMutations';
import { setReferrals } from '../redux/referralReducer';
import ReferralItem from './ReferralItem';
import ReferralForm from './ReferralForm';
import EditReferralModal from './EditReferralModal';

const ReferralList = () => {
  const dispatch = useDispatch();
  const { loading, error, data, refetch } = useQuery(GET_REFERRALS);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(setReferrals(data.referrals));
    }
  }, [data, dispatch]);

  const refreshReferrals = async () => {
    await refetch(); // This will re-fetch the referrals from the server
  };

  const handleEdit = (referral) => {
    setSelectedReferral(referral);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedReferral(null); // Clear the selected referral
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="flex-container">
        <div className="form-container">
          <ReferralForm onSuccess={refreshReferrals} />
        </div>
        <div className="list-container">
          {data.referrals.length === 0 ? (
            <div>No referrals available.</div>
          ) : (
            <table className="referral-table">
              <thead>
                <tr>
                  <th>Given Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.referrals.map((referral, index) => (
                  <ReferralItem 
                    key={referral.id}
                    referral={referral} 
                    onDelete={refreshReferrals} 
                    onEdit={handleEdit}
                    className={index % 2 === 0 ? 'even-row' : 'odd-row'} // Apply alternating row colors
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Render the modal for editing */}
      {isModalOpen && (
        <EditReferralModal
          referral={selectedReferral}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onUpdateSuccess={refreshReferrals}
        />
      )}
    </div>
  );
};

export default ReferralList;
