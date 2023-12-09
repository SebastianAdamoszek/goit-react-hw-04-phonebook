import PropTypes from 'prop-types';
import React from 'react';

const Filter = ({ filter, handleFilterChange }) => (
  <label>
    Filter contacts by name:
    <input 
      type="text" 
      value={filter} 
      onChange={handleFilterChange} 
      placeholder="Search contacts"
      />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};
export default Filter;
