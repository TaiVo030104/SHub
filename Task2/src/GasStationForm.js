import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './GasStationForm.css'; // Ensure your CSS is structured as required
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

// Validation schema using Yup
const validationSchema = Yup.object({
  time: Yup.date().required('Please select the time'),
  quantity: Yup.number().required('Please enter the quantity').positive('Quantity must be positive'),
  pump: Yup.string().required('Please select the pump'),
  revenue: Yup.number().required('Please enter the revenue').positive('Revenue must be positive'),
  price: Yup.number().required('Please enter the price per liter').positive('Price must be positive'),
});

const GasStationForm = () => {
  const [submitted, setSubmitted] = useState(false); // State to track if the form has been submitted

  const initialValues = {
    time: '',
    quantity: '',
    pump: '',
    revenue: '',
    price: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert('Transaction submitted successfully: ' + JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
      setSubmitted(false); // Reset the submitted state
    }, 400);
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <button className="close-button">Đóng</button>
        <h2>Nhập giao dịch</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, validateForm, submitForm, setTouched, errors }) => (
          <Form>
            <div className="form-group">
              <div className="input-container">
                <label>Thời gian</label>
                <Field name="time">
                  {({ field }) => (
                    <Datetime
                      value={field.value}
                      onChange={val => setFieldValue('time', val)}
                      dateFormat="DD/MM/YYYY"
                      timeFormat="HH:mm:ss"
                      className="datetime-input"
                    />
                  )}
                </Field>
                <FontAwesomeIcon className="calendar-icon" icon={faCalendarDay} />
                {submitted && errors.time && <ErrorMessage name="time" component="div" className="error-message" />}
              </div>
            </div>
        
            <div className="form-group">
              <div className="input-container">
                <label>Số lượng</label>
                <Field type="number" name="quantity" className="form-input" />
                {submitted && errors.quantity && <ErrorMessage name="quantity" component="div" className="error-message" />}
              </div>
            </div>
        
            <div className="form-group">
              <div className="input-container">
                <label>Trụ</label>
                <Field as="select" name="pump" className="form-select">
                  <option value="">Select</option>
                  <option value="Pump 1">Trụ 1</option>
                  <option value="Pump 2">Trụ 2</option>
                  <option value="Pump 3">Trụ 3</option>
                </Field>
                {submitted && errors.pump && <ErrorMessage name="pump" component="div" className="error-message" />}
              </div>
            </div>
        
            <div className="form-group">
              <div className="input-container">
                <label>Doanh thu</label>
                <Field type="number" name="revenue" className="form-input" />
                {submitted && errors.revenue && <ErrorMessage name="revenue" component="div" className="error-message" />}
              </div>
            </div>
        
            <div className="form-group">
              <div className="input-container">
                <label>Đơn giá</label>
                <Field type="number" name="price" className="form-input" />
                {submitted && errors.price && <ErrorMessage name="price" component="div" className="error-message" />}
              </div>
            </div>

            <div className="form-header">
              <button
                type="button"
                className="submit-button-top"
                onClick={async () => {
                  setSubmitted(true); // Set submitted state to true
                  setTouched({
                    time: true,
                    quantity: true,
                    pump: true,
                    revenue: true,
                    price: true,
                  }); // Mark all fields as touched
                  // Validate the form
                  const validationErrors = await validateForm();
                  if (Object.keys(validationErrors).length === 0) {
                    await submitForm(); // Trigger form submission if no errors
                  }
                }}
                disabled={isSubmitting}
              >
                Cập nhật
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GasStationForm;
