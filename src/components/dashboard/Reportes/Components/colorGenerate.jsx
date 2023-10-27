import React from 'react';

function ColorGenerator({ count }) {
  const generatePastelColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 156 + 100); // Red component
      const g = Math.floor(Math.random() * 156 + 100); // Green component
      const b = Math.floor(Math.random() * 156 + 100); // Blue component
      const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`; // Convert RGB to Hex
      colors.push(color);
    }
    return colors;
  };

  const pastelColors = generatePastelColors(count);

  return pastelColors;
}

export default ColorGenerator;