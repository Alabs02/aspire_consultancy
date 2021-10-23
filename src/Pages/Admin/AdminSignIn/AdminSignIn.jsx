import { Fragment, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import { AuthLayout } from '../../../Layouts';
import { TextField, PasswordField } from '../../../Components/FormFields';
import { BlockBtn, TextBtn } from '../../../Components/AppBtn';
import FormLabel from '../../../Components/FormLabel';
import FormikErrorMsg from '../../../Components/FormikErrorMsg';

const initialFormValues = () => {
  return {
    email: '',
    password: '',
  }
}

const loginSchema = object().shape({
  email: string()
    .email('Invalid Email Address')
    .required('Required!'),
  password: string()
    .min(8, 'Invalid Password!')
    .required('Required!'),
});

const AdminSignIn = () => {
  return (
    <Fragment>
      <AuthLayout
        ref={useRef(null)}
        title={`Admin Login`}
        copy={`👋 Hello Admin! Welcome Back`}
      >
        <Formik
          initialValues={initialFormValues()}
          validationSchema={loginSchema}
          onSubmit={async (values, { resetForm }) => {
            console.log(values);
          }}
        >
          {props => (
            <Form>
              <div className="form mt-5 grid grid-cols-12">

                <div className="md:col-span-10 sm:col-span-12 grid mb-4">
                  <FormLabel htmlFor={`email`} copy={`Email*`} mb={`mb-1`} />
                  <Field name="email" type="email" as={TextField} placeholder="mail@website.com" />
                  <FormikErrorMsg name="email" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 sm:col-span-12 grid mb-4">
                  <FormLabel htmlFor={`password`} copy={`Password*`} mb={`mb-1`} />
                  <Field name="password" as={PasswordField} placeholder="Min. 8 characters" />
                  <FormikErrorMsg name="password" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 sm:col-span-12 flex justify-between">
                  <div>
                    <input type="checkbox" className="form-checkbox rounded text-primary" />
                    <span className="ml-2 text-xs font-medium text-brand-black antialiased">Remember me</span>
                  </div>
                  <TextBtn title={`Forget password?`} type={"button"} classes={'text-sm font-medium text-primary hover:text-primary-dark'} />
                </div>

                <div className="md:col-span-10 sm:col-span-12 mt-5 mb-20">
                  <BlockBtn title={`Go to Dashboard`} type={"submit"} />
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </Fragment>
  );
}

export default AdminSignIn;
