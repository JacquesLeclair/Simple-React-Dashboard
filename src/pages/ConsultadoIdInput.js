// src/pages/ConsultadoIdInput.js
import React, { useState } from 'react';

function ConsultadoIdInput({ onConsultadoIdChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onConsultadoIdChange(Number(inputValue));  // Convert the input to a number and pass it to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label htmlFor="consultadoId" className="block text-sm font-medium text-gray-700">
        Codigo Consultado:
      </label>
      <input
        type="number"
        id="consultadoId"
        value={inputValue}
        onChange={handleInputChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">
        Consultar
      </button>
    </form>
  );
}

export default ConsultadoIdInput;
