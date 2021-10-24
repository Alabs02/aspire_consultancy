import { Fragment, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import { AuthLayout } from '../../../Layouts';
import { TextField, PasswordField } from '../../../Components/FormFields';
import { BlockBtn, TextBtn } from '../../../Components/AppBtn';
import FormLabel from '../../../Components/FormLabel';
import FormikErrorMsg from '../../../Components/FormikErrorMsg';
import { ThreeDots } from 'react-loading-icons';
import { catchAxiosErrors, postRequest, toFormData, slugify } from '../../../Utils';
import { localForage } from '../../../Services';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { adminAtom } from '../../../Store/admin';
import _, { isEmpty } from 'lodash';
import 'animate.css';

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

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useRecoilState(adminAtom);

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
            try {
              console.log(values);
              setIsLoading(true);
              const { data, status, statusText } = await postRequest('/admin/login', toFormData(values));

              if (data) {
                console.log(data, status, statusText);
                console.log('Signin State', admin);
                setAdmin(_.get(data, 'data.admin', {}));

                const forageData = {
                  access_token: _.get(data, 'data.access_token', null),
                  isLoggedIn: true,
                  user_type: _.get(data, 'data.user_type', null),
                  token_type: _.get(data, 'data.token_type', null),
                }

                localForage.setItem('userCredentials', forageData).then(() => localForage.getItem('userCredentials'))
                  .then((val) => {
                    console.log('Credentials', val)
                    console.log('In localforage')
                    console.log('new state:', admin)
                  }).catch((err) => console.error(err));

                toast.success(`Hey ${_.split(_.get(data, 'data.admin.name', null), ' ', 1)}, Welcome Back!`);
                setIsLoading(false);
                if(_.get(data?.data, 'user_type', null) === "admin") {
                  setTimeout(() => {
                    resetForm();
                    history.push(`/admin/${slugify(_.get(data?.data, 'admin.name', null))}/dashboard`);
                  }, 4000);
                }
              }
            } catch(err) {
              catchAxiosErrors(err, setIsLoading, null);
            }
          }}
        >
          {props => (
            <Form>
              <div className="form mt-5 grid grid-cols-12">

                <div className="md:col-span-10 col-span-12 grid mb-4">
                  <FormLabel htmlFor={`email`} copy={`Email*`} mb={`mb-1`} />
                  <Field name="email" type="email" as={TextField} placeholder="mail@website.com" />
                  <FormikErrorMsg name="email" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 col-span-12 grid mb-4">
                  <FormLabel htmlFor={`password`} copy={`Password*`} mb={`mb-1`} />
                  <Field name="password" as={PasswordField} placeholder="Min. 8 characters" />
                  <FormikErrorMsg name="password" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 col-span-12 flex justify-between">
                  <div>
                    <input type="checkbox" className="form-checkbox rounded text-primary" />
                    <span className="ml-2 text-xs font-medium text-brand-black antialiased">Remember me</span>
                  </div>
                  <TextBtn title={`Forget password?`} type={"button"} classes={'text-sm font-medium text-primary hover:text-primary-dark'} />
                </div>
                
                <div className="md:col-span-10 col-span-12 mt-5 mb-10 grid place-items-center w-100">
                  {isLoading
                    ? <ThreeDots className="animate__animated animate__pulse" height="2rem" width="4.5rem" fill={'#5037e9'} />
                    : <BlockBtn title={`Go to Dashboard`} type={"submit"} />
                  }
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
