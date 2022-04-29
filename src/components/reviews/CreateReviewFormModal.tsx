import React, { Fragment, useMemo, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Dialog, Transition } from '@headlessui/react';

import { client } from 'lib/api/axiosClient';
import { IRequest, ReviewFor } from 'types';
import Rating from './Rating';

type Props = {
  request: IRequest;
  reviewFor: ReviewFor;

  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const CreateReviewFormModal: React.FC<Props> = ({
  request,
  reviewFor,
  isOpen,
  setIsOpen,
}) => {
  const [showSubmitted, setShowSubmitted] = useState(false);

  const ReviewTitle = useMemo(() => {
    switch (reviewFor) {
      case ReviewFor.buyer:
        return 'Buyer Review';

      case ReviewFor.seller:
        return 'Seller Review';

      case ReviewFor.request:
        return 'Request Review';

      default:
        return '';
    }
  }, [reviewFor]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setIsOpen}
      >
        <div className="grid place-content-center min-h-screen pt-4 px-4 pb-20 sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="flex flex-col gap-10 p-10 bg-white rounded-lg shadow-xl transform transition-all">
              <Dialog.Title className="text-3xl font-semibold">
                {ReviewTitle}
              </Dialog.Title>
              <Formik
                initialValues={{
                  serviceName: request.service.name,
                  buyerName: request.buyer.name,
                  sellerName: request.seller.name,
                  comment: '',
                  rating: 5,
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  await client.post(`/api/reviews/${reviewFor}`, {
                    request_id: request._id,
                    comment: values.comment,
                    rating: values.rating,
                  });
                  setSubmitting(false);
                  resetForm();

                  setShowSubmitted(true);
                  setTimeout(() => {
                    setShowSubmitted(false);
                    setIsOpen(false);
                  }, 1500);
                }}
                validate={(values) => {
                  const errors: {
                    comment?: string;
                    description?: string;
                    startingPrice?: string;
                  } = {};
                  if (!values.comment)
                    errors.comment = 'This field is required';

                  return errors;
                }}
              >
                {({ isSubmitting, resetForm, values, setFieldValue }) => (
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
                          htmlFor="buyerName"
                          className="font-semibold text-sm text-gray-700"
                        >
                          Buyer
                        </label>
                        <Field
                          name="buyerName"
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
                          htmlFor="comment"
                          className="font-semibold text-sm text-gray-700"
                        >
                          Review*
                        </label>
                        <Field
                          name="comment"
                          type="text"
                          as="textarea"
                          placeholder="Please make it..."
                          className="focus:ring-accent-300 focus:border-accent-300 w-full h-36 shadow-sm h- border-gray-300 rounded-md"
                        />
                        <div className="text-rose-500 text-xs">
                          <ErrorMessage name="comment" />
                        </div>
                      </div>
                      <div className="col-span-full flex flex-col gap-1">
                        <Rating
                          value={values.rating}
                          setValue={(val) => {
                            setFieldValue('rating', val);
                          }}
                        />
                      </div>

                      <div className="col-span-fulll flex justify-between">
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={(e) => {
                              e.preventDefault();
                              resetForm();
                              setIsOpen(false);
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

                        {showSubmitted && (
                          <span className="text-semibold text-gray-500">
                            Saved!
                          </span>
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateReviewFormModal;
