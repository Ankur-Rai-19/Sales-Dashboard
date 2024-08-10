import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ label, selectedDate, onDateChange }) => (
  <div>
    <label>{label}</label>
    <DatePicker
      selected={selectedDate ? new Date(selectedDate) : null}
      onChange={date => onDateChange(date ? date.toISOString().split('T')[0] : '')}
      dateFormat="yyyy-MM-dd"
      isClearable
    />
  </div>
);

export default DatePickerComponent;
