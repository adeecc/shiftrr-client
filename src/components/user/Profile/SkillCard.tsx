import React from 'react';
import { ISeller } from 'types';

type Props = {
  sellerProfile: ISeller;
};

const SkillCard: React.FC<Props> = ({ sellerProfile }) => {
  return (
    <div className="col-span-full md:col-span-2">
      <div className="w-full p-6 flex flex-col gap-4 border bg-white rounded-lg shadow">
        <div className="">
          <h4 className="font-semibold text-2xl">Skills</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {sellerProfile.skills?.map((value) => (
            <div
              key={value}
              className="px-3 py-1 text-xs text-gray-600 rounded-3xl border border-accent-100"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
