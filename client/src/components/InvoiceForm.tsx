import React, { ReactNode } from "react";
import { Formik, Field, FieldArray, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Invoice, Item } from "@/app/interfaces/interface";

interface AddInvoiceModalProps {
  show: boolean;
  handleClose: () => void;
  initialData: Invoice | null;
  onSubmit: (invoice: Invoice) => Promise<void>;
}

const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({
  show,
  handleClose,
  initialData,
  onSubmit,
}) => {
  const initialValues = {
    items: initialData?.items || [{ description: "", quantity: 1, price: 0 }],
    totalAmount: initialData?.totalAmount || 0,
    dueDate: initialData?.dueDate ? initialData.dueDate.split("T")[0] : "",
  };

  const validationSchema = Yup.object({
    items: Yup.array().of(
      Yup.object({
        description: Yup.string().required("Required"),
        quantity: Yup.number()
          .required("Required")
          .min(1, "Must be at least 1"),
        price: Yup.number().required("Required").min(0, "Must be at least 0"),
      })
    ),
    totalAmount: Yup.number().required("Required").min(1, "Must be at least 1"),
    dueDate: Yup.date().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    await onSubmit(values);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Update Invoice" : "Add Invoice"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <FormikForm>
              <FieldArray name="items">
                {({ push, remove }) => (
                  <>
                    {values.items.map((item: Item[], index: number) => (
                      <div key={index} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Item Description
                        </label>
                        <Field
                          name={`items.${index}.description`}
                          placeholder="Item Description"
                          className="border border-gray-300 text-black rounded p-2 w-full mb-2"
                        />
                        {errors.items?.[index]?.description &&
                          touched.items?.[index]?.description && (
                            <div className="text-red-500 text-sm">
                              {errors.items[index].description as ReactNode}
                            </div>
                          )}

                        <label className="block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <Field
                          name={`items.${index}.quantity`}
                          type="number"
                          placeholder="Quantity"
                          className="border border-gray-300 text-black rounded p-2 w-full mb-2"
                        />
                        {errors.items?.[index]?.quantity &&
                          touched.items?.[index]?.quantity && (
                            <div className="text-red-500 text-sm">
                              {errors.items[index].quantity as ReactNode}
                            </div>
                          )}

                        <label className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <Field
                          name={`items.${index}.price`}
                          type="number"
                          placeholder="Price"
                          className="border border-gray-300 text-black rounded p-2 w-full mb-2"
                        />
                        {errors.items?.[index]?.price &&
                          touched.items?.[index]?.price && (
                            <div className="text-red-500 text-sm">
                              {errors.items[index].price as ReactNode}
                            </div>
                          )}

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({ description: "", quantity: 1, price: 0 })
                      }
                      className="bg-indigo-600 text-white rounded px-4 py-2 mb-4"
                    >
                      Add Item
                    </button>
                  </>
                )}
              </FieldArray>
              <label className="block text-sm font-medium text-gray-700">
                Total Amount
              </label>
              <Field
                name="totalAmount"
                type="number"
                placeholder="Total Amount"
                className="border border-gray-300 text-black rounded p-2 w-full mb-4"
              />
              {errors.totalAmount && touched.totalAmount && (
                <div className="text-red-500 text-sm">
                  {errors.totalAmount as ReactNode}
                </div>
              )}

              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <Field
                name="dueDate"
                type="date"
                className="border border-gray-300 text-black rounded p-2 w-full mb-4"
              />
              {errors.dueDate && touched.dueDate && (
                <div className="text-red-500 text-sm">
                  {errors.dueDate as ReactNode}
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleClose}
                  className="border border-gray-300 text-black rounded px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded px-4 py-2"
                >
                  Submit
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
