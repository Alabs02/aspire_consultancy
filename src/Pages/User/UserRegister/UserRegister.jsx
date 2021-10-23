import { Fragment, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import { AuthLayout } from '../../../Layouts';
import { TextField, PasswordField } from '../../../Components/FormFields';
import FormLabel from '../../../Components/FormLabel';
import { TextBtn, BlockBtn } from '../../../Components/AppBtn';
import FormikErrorMsg from '../../../Components/FormikErrorMsg';
import { Link } from 'react-router-dom';

const initialFormValues = () => {
  return {
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmation_password: '',
  }
}

const registerSchema = object().shape({
  name: string()
    .min(3, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required!'),
  email: string()
    .email('Invalid Email Adress')
    .required('Requried!'),
  contact: string()
    .min(11, 'Too Short!')
    .max(14, 'Too Long!')
    .required('Required!'),
  password: string()
    .min(8, 'Too Short!')
    .required('Required!'),
  confirmation_password: string()
    .min(8, 'Too Short!')
    .required('Required!'),
});

const UserRegister = () => {
  return (
    <Fragment>
      <AuthLayout
        ref={useRef(null)}
        title={`Sign Up`}
        copy={`See your growth and get consulting support!`}
      >
        <Formik
          initialValues={initialFormValues()}
          validationSchema={registerSchema}
          onSubmit={async (values, { resetForm }) => {
            console.log(values);
          }}
        >
          {props => (
            <Form>
              <div className="form mt-5 grid grid-cols-12">
              
                <div className="md:col-span-10 sm:col-span-12 grid mb-4">
                  <FormLabel htmlFor={`name`} copy={`Name*`} mb={`mb-1`} />
                  <Field name="name" type="text" as={TextField} placeholder="Name" />
                  <FormikErrorMsg name="name" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 sm:col-span-12 grid mb-4">
                  <FormLabel htmlFor={`email`} copy={`Email*`} mb={`mb-1`} />
                  <Field name="email" type="email" as={TextField} placeholder="mail@website.com" />
                  <FormikErrorMsg name="email" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 sm:col-span-12 grid mb-4">
                  <FormLabel htmlFor={`contact`} copy={`Contact*`} mb={`mb-1`} />
                  <Field name="contact" type="tel" as={TextField} placeholder="09012345678" />
                  <FormikErrorMsg name="contact" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 sm:col-span-12 grid mb-4">
                  <FormLabel htmlFor={`password`} copy={`Password*`} mb={`mb-1`} />
                  <Field name="password" as={PasswordField} placeholder="Min. 8 characters" />
                  <FormikErrorMsg name="password" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 sm:col-span-12 grid mb-4">
                  <FormLabel htmlFor={`confirmation_password`} copy={`Confirm Password*`} mb={`mb-1`} />
                  <Field name="confirmation_password" as={PasswordField} placeholder="Min. 8 characters" />
                  <FormikErrorMsg name="confirmation_password" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 sm:col-span-12 flex justify-between">
                  <div>
                    <input type="checkbox" className="form-checkbox rounded text-primary" />
                    <span className="ml-2 text-xs font-medium text-brand-black antialiased">I agree to the <Link to="/" className="text-primary font-semibold">Terms & Conditions</Link></span>
                  </div>
                </div>

                <div className="md:col-span-10 sm:col-span-12 mt-5">
                  <BlockBtn title={`Sign Me Up`} type={"submit"} />
                </div>

                <div className="md:col-span-10 sm:col-span-12 flex mt-5 mb-8 items-center">
                  <p className="m-0 text-xs font-semibold text-brand-black antialiased mr-1">Already have an Account?</p>
                  <button className="text-xs text-primary hover:text-primary-dark transition-all transform hover:scale-105 hover:ml-2 font-semibold antialiased">Sign in</button>
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </Fragment>
  );
}

export default UserRegister;
