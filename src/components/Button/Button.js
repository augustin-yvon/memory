import React from 'react';

const Button = ({ text, shuffleCards }) => {
  return (
    <button onClick={shuffleCards}>
        {text}
    </button>
  );
};

export default Button;