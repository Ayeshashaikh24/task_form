import React, { useState } from 'react';
import axios from 'axios';

const LandingPageForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_name: '',
    phone_number: '',
    requirement: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.company_name.trim()) {
      errors.company_name = 'Company Name is required';
      isValid = false;
    }

    if (!formData.phone_number.trim()) {
      errors.phone_number = 'Phone Number is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      const apiUrl = 'https://dashboard.omnisellcrm.com/api/store';

      try {
        const response = await axios.post(apiUrl, {
          ...formData,
          lead_types_id: 'sandbox',
        });

        console.log(response.data); // You can handle the API response here

        setSubmissionStatus('success');

        // Reset the form after successful submission
        setFormData({
          name: '',
          email: '',
          company_name: '',
          phone_number: '',
          requirement: '',
        });
      } catch (error) {
        console.error(error);
        setSubmissionStatus('failure');
      
      }
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      {errors.email && <div className="error">{errors.email}</div>}
      <br />
      <label>
        Company Name:
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />
      </label>
      {errors.company_name && <div className="error">{errors. company_name}</div>}
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </label>
      {errors.phone_number && <div className="error">{errors.phone_number}</div>}
      <br />
      <label>
        Requirement:
        <textarea
          name="requirement"
          value={formData.requirement}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      {submissionStatus === 'success' && (
        <div className="alert success">Form submitted successfully!</div>
      )}

      {submissionStatus === 'failure' && (
        <div className="alert failure">Form submission failed. Please try again.</div>
      )}
    </form>
    </div>
  );
};

export default LandingPageForm;
