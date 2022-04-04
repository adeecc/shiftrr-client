import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useProfileStore } from 'lib/hooks/useProfileStore';
import { client } from 'lib/api/axiosClient';

type Props = {};

const CreateServiceForm: React.FC<Props> = (props: Props) => {
  const user = useProfileStore((state) => state.profile);
  return (
    <Formik
      initialValues={{ name: '', description: '', startingPrice: 0, image: '' }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const res = await client.post('/api/service', {
          ...values,
        });
        console.log(res);
        setSubmitting(false);
        resetForm();
      }}
      validate={(values) => {
        const errors: {
          name?: string;
          description?: string;
          startingPrice?: string;
        } = {};
        if (!values.name) errors.name = 'Required';
        if (!values.description) errors.description = 'Required';
        if (values.startingPrice <= 0)
          errors.startingPrice = 'Starting Price must be greater than 0';

        return errors;
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <div className="grid grid-cols-1 gap-4 w-[18em] sm:w-[30em]">
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-semibold text-sm text-gray-700"
              >
                What will you do?
              </label>
              <Field
                name="name"
                type="text"
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="description"
                className="font-semibold text-sm text-gray-700"
              >
                A bit more detail
              </label>
              <Field
                name="description"
                type="text"
                as="textarea"
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="startingPrice"
                className="font-semibold text-sm text-gray-700"
              >
                Starting Price
              </label>
              <Field
                name="startingPrice"
                type="text"
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

export default CreateServiceForm;
