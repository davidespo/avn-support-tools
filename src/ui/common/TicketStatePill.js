import React from 'react';

const stateMap = {
  open: 'light',
  closed: 'dark',
  other: 'warning',
};

const TicketStatePill = ({ ticketState }) => {
  return (
    <span
      className={`badge rounded-pill bg-${
        stateMap[ticketState] ?? stateMap.other
      } p-2`}
    >
      {ticketState}
    </span>
  );
};

export default TicketStatePill;
