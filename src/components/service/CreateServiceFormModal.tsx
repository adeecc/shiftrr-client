import React, { Fragment } from 'react';
import { Formik, Field, Form } from 'formik';
import { Dialog, Transition } from '@headlessui/react';

import { client } from 'lib/api/axiosClient';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const CreateServiceFormModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
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
              <Formik
                initialValues={{
                  name: '',
                  description: '',
                  startingPrice: 0,
                  image: '',
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  const res = await client.post('/api/service', {
                    ...values,
                  });

                  setSubmitting(false);
                  resetForm();
                  setIsOpen(false);
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
                    errors.startingPrice =
                      'Starting Price must be greater than 0';

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
                          className="focus:ring-accent-300 focus:border-accent-300 w-full shadow-sm h-36 border-gray-300 rounded-md"
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

export default CreateServiceFormModal;
