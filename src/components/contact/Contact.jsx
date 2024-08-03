import React, { useState } from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";
import { BASE_URL } from "../../constants/const";
import Alert from "@mui/material/Alert";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    is_company: false,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await fetch(BASE_URL + '/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setErrorMessage('')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          is_company: false
        });
      } else {
        setSuccess(false)
        // Display error message from backend response
        setErrorMessage(result.message || 'There was an error submitting your request.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccess(false)
      setErrorMessage('There was an error submitting your request, or you already submitted a request.');
    }
  };

  return (
      <>
        <section className='contact mb'>
          <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
          <div className='container'>
            {success && (
                <Alert severity="success" className="w-full">
                  Successfully sent message!
                </Alert>
            )}
            <form className='shadow' onSubmit={handleSubmit}>
              <h4>Fill up the Form</h4> <br />
              <div>
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>
              <input
                  type='text'
                  placeholder='Subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
              />
              <textarea
                  cols='30'
                  rows='10'
                  placeholder='Message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
              ></textarea>
              <FormGroup>
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={formData.is_company}
                          onChange={handleChange}
                          name='is_company'
                      />
                    }
                    label='Is Company'
                />
              </FormGroup>
              <button type='submit'>Submit Request</button>
              {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>
          </div>
        </section>
      </>
  );
};

export default Contact;