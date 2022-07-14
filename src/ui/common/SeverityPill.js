import React from 'react';

const severityMap = {
  critical: 'danger',
  high: 'warning',
  low: 'info',
  other: 'dark',
};

const SeverityPill = ({ severity }) => {
  return (
    <span
      className={`badge rounded-pill bg-${
        severityMap[severity] ?? severityMap.other
      } p-2`}
    >
      {severity}
    </span>
  );
};

export default SeverityPill;
