import React, { FC } from 'react';

export const Rating: FC = () => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>*****</p>
        <p className="text-reg ml-3">4.9</p>
      </div>
      <div>
        <p className="text-reg ml-4">600 Reviews</p>
      </div>
    </div>
  );
};
