import React from 'react';

type PersonalInformationProps = {
  email: string;
  contactNumber: string;
  bio: string;
  credits: number;
  domain: string;
};

const PersonalInformationCard: React.FC<PersonalInformationProps> = ({
  email,
  contactNumber,
  bio,
  credits,
  domain,
}) => {
  return (
    <div className="col-span-full md:col-span-4">
      <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow">
        <div className="border-b border-gray-300 pb-4">
          <h4 className="font-semibold text-2xl">About</h4>
          <span className="text-sm text-gray-500">
            Personal Details and Information
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          <div className="flex flex-col col-span-1">
            <span className="text-gray-500 text-sm">Domain</span>
            <span className="">{domain}</span>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-gray-500 text-sm">Email Address</span>
            <span className="">{email}</span>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-gray-500 text-sm">Credits</span>
            <span className="">{credits}</span>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-gray-500 text-sm">Phone</span>
            <span className="">{contactNumber}</span>
          </div>
          <div className="flex flex-col col-span-full">
            <span className="text-gray-500 text-sm">Bio</span>
            <span className="">{bio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationCard;
