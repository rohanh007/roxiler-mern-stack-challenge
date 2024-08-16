import React from 'react';
import '../css/dropdown.css'; 

const Dropdown = ({ selectedMonth, setSelectedMonth }) => {
  const monthMap = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMonth(selectedValue); 
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="month-dropdown" className="dropdown-label">Select Month:</label>
      <select
        id="month-dropdown"
        value={selectedMonth} 
        onChange={handleChange} 
        className="dropdown-select" 
      >
        <option value=''>All</option> 
        {Object.keys(monthMap).map((key) => (
          <option key={key} value={key}>
            {monthMap[key]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
