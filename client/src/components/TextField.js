import React from "react";
import { ErrorMessage, useField } from "formik";
export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={field.name}
        className="block text-sm font-semibold text-gray-600 mb-1"
      >
        {label}
      </label>
      <input
        className={`${meta.touched && meta.error && "is-invalid"}`}
        autoComplete="off"
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error-message"
      />
    </div>
  );
};
