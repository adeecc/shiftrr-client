import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useUserProfileStore } from 'lib/store/user';
import { client } from 'lib/api/axiosClient';
import { IService, IUser } from 'types';

type Props = {
  service: IService;
  seller: IUser;
};

const CreateRequestForm: React.FC<Props> = ({ service, seller }) => {
  const user = useUserProfileStore((state) => state.profile);
  return (
    <Formik
      initialValues={{
        serviceName: service.name,
        sellerName: seller.name,
        information: '',
        price: service.startingPrice,
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const res = await client.post('/api/requests', {
          service: service._id,
          price: values.price,
          information: values.information,
        });
        setSubmitting(false);
        resetForm();
      }}
      validate={(values) => {
        const errors: {
          name?: string;
          description?: string;
          startingPrice?: string;
        } = {};
        if (!values.information) errors.description = 'Required';
        if (values.price < service.startingPrice)
          errors.startingPrice = `Price must be greater than ${service.startingPrice}`;

        return errors;
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <div className="grid grid-cols-1 gap-4 w-[18em] sm:w-[30em]">
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="serviceName"
                className="font-semibold text-sm text-gray-700"
              >
                Service
              </label>
              <Field
                name="serviceName"
                type="text"
                disabled
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm bg-gray-300 border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="sellerName"
                className="font-semibold text-sm text-gray-700"
              >
                Seller
              </label>
              <Field
                name="sellerName"
                type="text"
                disabled
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm bg-gray-300 border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="information"
                className="font-semibold text-sm text-gray-700"
              >
                Describe your Requirements
              </label>
              <Field
                name="information"
                type="text"
                as="textarea"
                placeholder="Please make it..."
                className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm  border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-full flex flex-col gap-1">
              <label
                htmlFor="price"
                className="font-semibold text-sm text-gray-700"
              >
                What are you willing to pay?
              </label>
              <Field
                name="price"
                type="text"
                placeholder="Please make it..."
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

export default CreateRequestForm;
