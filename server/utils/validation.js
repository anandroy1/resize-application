// utils/validation.js
function isValidData(data) {
    return typeof data.width === 'number' && typeof data.height === 'number';
  }
  
  module.exports = {
    isValidData,
  };
  