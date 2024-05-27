import React, { useState } from "react";
import Modal from "../../ui/Modal";
import FacilityForm from "../../ui/FacilityForm";
import FacilityTable from "../../ui/FacilityTable";

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-center p-6 space-y-4">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white p-1.5 rounded hover:bg-blue-700"
        >
          Create Facility
        </button>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          Content={<FacilityForm onSuccess={() => setIsOpen(false)}/>}
          toggleModal={handleClose}
        />
      )}
      <FacilityTable />
    </div>
  );
};

export default Dashboard;
