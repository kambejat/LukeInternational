import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { createDistricts, createFacility } from "../api/api";
import useAuth from "../context/useAuth";

interface District {
  id: string;
  district_name: string;
  district_code: any;
}

interface FacilityFormProps {
  onSuccess: () => void;
}

const FacilityForm: React.FC<FacilityFormProps> = ({ onSuccess }) => {
  const [user, token] = useAuth();
  const [formData, setFormData] = useState({
    facility_name: "",
    district_id: "",
    owener_id: user.user_id,
  });

  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    // Fetch districts from API
    axios
      .get("api/v2/districts/")
      .then((response) => {
        setDistricts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const districtsData = districts.map((district) => ({
        // id: district.id,
        district_code: district.district_code,
        district_name: district.district_name,
      }));
      console.log(formData);
      const payload = {
        facility_name: formData.facility_name,
        district_id: parseInt(formData.district_id),
        owner_id: user.user_id,
      }
      console.log(payload);
      // await createDistricts(districtsData, config)
      await createFacility(payload, config);

      alert("Facility created successfully!");

      setFormData({
        facility_name: "",
        district_id: "",
        owener_id: "",
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating facility:", error);
      alert("Error creating facility. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="facility_name">Facility Name:</label>
        <input
          type="text"
          id="facility_name"
          name="facility_name"
          value={formData.facility_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="district_id">District:</label>
        <select
          id="district_id"
          name="district_id"
          value={formData.district_id}
          onChange={handleSelectChange}
          required
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.district_name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create Facility</button>
    </form>
  );
};

export default FacilityForm;
