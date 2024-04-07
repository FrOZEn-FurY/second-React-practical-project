import React from "react";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import messageContext from "../contexts/oneTimeMessages";
import * as yup from "yup";

const Feedback = () => {
  const context = useContext(messageContext);
  const formik = useFormik({
    initialValues: {
      email: handleEmail(),
      feedback: "",
      name: "",
    },
    onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Email address is not valid.")
        .required("Email is required."),
      feedback: yup
        .string()
        .max(200, "Feedback must be at most 200 characters.")
        .required("Feedback is required."),
      name: yup.string().required("You have to write a name."),
    }),
  });

  useEffect(()=>{
    formik.values.email = handleEmail();
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-secondary-subtle p-3"
      >
        <label htmlFor="email">Email Address: </label>
        <input
          id="email"
          {...formik.getFieldProps("email")}
          value={handleEmail()}
          className="form-control-plaintext"
          disabled
          readOnly
          placeholder="You must login so you're email gets shown here."
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="form-text text-danger">{formik.errors.email}</div>
        ) : null}
        <label htmlFor="name">Full Name: </label>
        <input
          id="name"
          {...formik.getFieldProps("name")}
          className="form-control"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="form-text text-danger">{formik.errors.name}</div>
        ) : null}
        <label htmlFor="feedback">Feedback: </label>
        <textarea
          id="feedback"
          {...formik.getFieldProps("feedback")}
          className="form-control"
        />
        {formik.touched.feedback && formik.errors.feedback ? (
          <div className="form-text text-danger">{formik.errors.feedback}</div>
        ) : null}
        <button type="submit" className="btn btn-outline-success mt-3">
          Submit
        </button>
      </form>
    </>
  );

  function handleEmail() {
    if (context.user) {
        console.log('IN')
      return context.user.email;
    }
    console.log('Out')
    return "";
  }
};

export default Feedback;
