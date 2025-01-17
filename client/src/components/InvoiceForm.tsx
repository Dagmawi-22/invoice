import React, { ReactNode } from "react";
import { Formik, Field, FieldArray, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Invoice, Item, ItemForm } from "@/app/interfaces/interface";

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
    dueDate:
      typeof initialData?.dueDate === "string"
        ? initialData.dueDate.split("T")[0]
        : initialData?.dueDate,
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
    dueDate: Yup.date().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    await onSubmit(values);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-7000 ease-in-out">
      <div
        className={`bg-white rounded-lg shadow-lg w-96 p-6 transform transition-all duration-300 ease-in-out ${
          show
            ? "translate-y-0 opacity-100 mb-0"
            : "translate-y-4 opacity-0 mb-4"
        }`}
      >
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
                    {values.items.map((item: ItemForm, index: number) => (
                      <div key={index} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Item Description
                        </label>
                        <Field
                          name={`items.${index}.description`}
                          placeholder="Item Description"
                          className="border border-gray-300 text-black rounded p-2 w-full mb-2"
                        />
                        {(errors.items as any)?.[index]?.description &&
                          touched.items?.[index]?.description && (
                            <div className="text-red-500 text-sm">
                              {
                                (errors.items as any)[index]
                                  .description as ReactNode
                              }
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
                        {(errors.items as any)?.[index]?.quantity &&
                          touched.items?.[index]?.quantity && (
                            <div className="text-red-500 text-sm">
                              {
                                (errors.items as any)[index]
                                  .quantity as ReactNode
                              }
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
                        {(errors.items as any)?.[index]?.price &&
                          touched.items?.[index]?.price && (
                            <div className="text-red-500 text-sm">
                              {(errors.items as any)[index].price as ReactNode}
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
                        push({ description: "", quantity: 1, price: 0 } as Item)
                      }
                      className="bg-indigo-600 text-white rounded px-4 py-2 mb-4"
                    >
                      Add Item
                    </button>
                  </>
                )}
              </FieldArray>

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
