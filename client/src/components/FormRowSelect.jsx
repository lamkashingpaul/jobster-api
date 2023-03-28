import React from 'react'

const FormRowSelect = ({ name, value, handleChange, labelText, options }) => {
  return <div className="form-row">
    <label htmlFor={name} className="form-label">{labelText || name}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className="form-input"
    >
      {options.map((option, i) => {
        return <option key={i} value={option}>{option}</option>
      })}
    </select>
  </div>
}

export default FormRowSelect
