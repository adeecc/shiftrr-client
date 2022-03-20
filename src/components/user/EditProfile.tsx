import React, { useState } from 'react';
import NextImage from 'next/image';
import cn from 'classnames';

import { Formik, Field, Form } from 'formik';

import { IUser, ISeller } from '@shiftrr/types/models';

import Container from 'components/common/Container';
import { client } from 'lib/api/axiosClient';

interface PersonalProfileFormProps {
  name: string;
  username: string;
  email: string;
  contactNumber?: string;
  bio?: string;
}

const PersonalProfileForm: React.FC<PersonalProfileFormProps> = ({
  name,
  username,
  email,
  contactNumber,
  bio,
}) => {
  return (
    <Formik
      initialValues={{
        name,
        username,
        email,
        contactNumber,
        bio,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await client.put('/api/user/me', values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-white rounded-lg shadow">
            {/* name */}
            <div className="col-span-full md:col-span-2 flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-semibold text-sm text-gray-700"
              >
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
              />
            </div>

            {/* username */}
            <div className="col-span-full md:col-span-2 flex flex-col gap-1">
              <label
                htmlFor="username"
                className="font-semibold text-sm text-gray-700"
              >
                Username
              </label>
              <Field
                name="username"
                type="text"
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
              />
            </div>

            {/* Email Address */}
            <div className="col-span-full md:col-span-2 flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-semibold text-sm text-gray-700"
              >
                Email Address
              </label>
              <Field
                name="email"
                type="text"
                disabled
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm bg-gray-100  border-gray-300 rounded-md"
              />
            </div>

            {/* phone */}
            <div className="col-span-full md:col-span-2 flex flex-col gap-1">
              <label
                htmlFor="contactNumber"
                className="font-semibold text-sm text-gray-700"
              >
                Phone
              </label>
              <Field
                name="contactNumber"
                type="text"
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
              />
            </div>

            {/* bio */}
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="bio"
                className="font-semibold text-sm text-gray-700"
              >
                Bio
              </label>
              <Field
                as="textarea"
                name="bio"
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-full flex justify-end gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={(e) => {
                  resetForm();
                }}
                className="text-accent-100 border-2 border-accent-100 px-3 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent-100 text-white px-3 py-2 rounded-md"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

type SkillProfileFormProps = {
  sellerProfile: ISeller;
};

const SkillProfileForm: React.FC<SkillProfileFormProps> = ({
  sellerProfile,
}) => {
  const [currentSkill, setCurrentSkill] = useState('');

  return (
    <Formik
      initialValues={{
        domain: sellerProfile.domain,
        skills: sellerProfile.skills,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        client.put('/api/user/me', {
          sellerProfile: {
            domain: values.domain,
            skills: values.skills,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm, values, setFieldValue }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-white rounded-lg shadow">
            {/* domain */}
            <div className="col-span-full md:col-span-2 flex flex-col gap-1">
              <label
                htmlFor="domain"
                className="font-semibold text-sm text-gray-700"
              >
                Domain
              </label>
              <Field
                name="domain"
                type="text"
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
              />
            </div>

            {/* skills */}
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="skills"
                className="font-semibold text-sm text-gray-700"
              >
                Skills
              </label>

              <div className="flex flex-col gap-y-3">
                <ul className="flex gap-x-1 flex-wrap">
                  {values.skills?.map((value, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        className="px-3 py-1 text-xs text-gray-600 rounded-3xl border border-accent-100"
                        onClick={() => {
                          setFieldValue(
                            'skills',
                            values.skills?.filter((item) => item !== value)
                          );
                        }}
                      >
                        {value}
                      </button>
                    </li>
                  ))}
                </ul>
                <input
                  name="domain"
                  type="text"
                  value={currentSkill}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setCurrentSkill(e.target.value);

                    if (e.target.value.at(-1) === ' ') {
                      setFieldValue(
                        'skills',
                        (values.skills || []).concat(currentSkill.trim())
                      );
                      setCurrentSkill('');
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setFieldValue(
                        'skills',
                        (values.skills || []).concat(currentSkill.trim())
                      );
                      setCurrentSkill('');
                    }
                  }}
                  className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="col-span-full flex justify-end gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => resetForm()}
                className="text-accent-100 border-2 border-accent-100 px-3 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent-100 text-white px-3 py-2 rounded-md"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

interface Props extends IUser {}

const EditProfile: React.FC<Props> = (props) => {
  return (
    <Container>
      <div className="flex flex-col w-full gap-x-4 auto-rows-max">
        {/* Header Section */}
        <div className="border-b py-6 border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="font-semibold text-4xl">Edit Profile</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-4 py-6 border-b border-gray-300">
          {/* Information and Bio */}
          <div className="col-span-full md:col-span-2 flex flex-col gap-y-2">
            <h3 className="font-semibold text-3xl">Personal Information</h3>
            <span className="text-gray-600">
              Edit your personal information
            </span>
          </div>

          <div className="col-span-full md:col-span-4 flex flex-col gap-y-2">
            <PersonalProfileForm {...props} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-4 py-6 border-b border-gray-300">
          {/* Experience and Skills */}
          <div className="col-span-full md:col-span-2 flex flex-col gap-y-2">
            <h3 className="font-semibold text-3xl">Experience and Skills</h3>
            <span className="text-gray-600">Edit your skills</span>
          </div>

          <div className="col-span-full md:col-span-4 flex flex-col gap-y-2">
            <SkillProfileForm {...props} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditProfile;
