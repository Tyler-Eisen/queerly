import { useState } from 'react';
import PropTypes from 'prop-types';

// const initialState = {
//   date: '',
// };

function DatePicker({ selectedDate }) {
  const [date, setDate] = useState(selectedDate);

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div>
      <label htmlFor="date-picker">Select a date:</label>
      <input
        type="date"
        id="date-picker"
        name="date-picker"
        value={date}
        onChange={handleChange}
      />
    </div>
  );
}
DatePicker.propTypes = {
  selectedDate: PropTypes.string.isRequired,
};

export default DatePicker;
