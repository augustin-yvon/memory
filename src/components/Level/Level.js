import React from 'react';

const Level = ({ id, setLevel }) => {
  return (
    <li className='level' id={id} onClick={() => setLevel(id)}>
      {id}
    </li>
  );
};

export default Level;