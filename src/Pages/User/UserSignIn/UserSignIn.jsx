import { Fragment, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import { AuthLayout } from '../../../Layouts';
import { TextField, PasswordField } from '../../../Components/FormFields';
import FormLabel from '../../../Components/FormLabel';
import { TextBtn, BlockBtn } from '../../../Components/AppBtn';
import FormikErrorMsg from '../../../Components/FormikErrorMsg';
import _, { isEmpty } from 'lodash';
import { ThreeDots } from 'react-loading-icons';
import { toFormData, catchAxiosErrors, postRequest, slugify } from '../../../Utils';
import { localForage } from '../../../Services';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userAtom } from '../../../Store/user';
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

const UserSignIn = () => {

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <Fragment>
      <AuthLayout
        ref={useRef(null)}
        title={`Login`} 
        copy={`See your growth and get consulting support!`}
      >
        <Formik
          initialValues={initialFormValues()}
          validationSchema={loginSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              setIsLoading(true);
              const { data, status, statusText } = await postRequest('/user/login', toFormData(values));

              if (data) {
                console.log(data, status, statusText);
                console.log('Signin State', user);
                setUser(_.get(data, 'data.user', {}));

                const forageData = {
                  access_token: data?.data?.access_token,
                  isLoggedIn: true,
                  user_type: data?.data?.user_type,
                  token_type: data?.data?.token_type
                }

                localForage.setItem('userCredentials', forageData).then(() => localForage.getItem('userCredentials'))
                  .then((val) => {
                    console.log('Credentials', val)
                    console.log('In localforage')
                    console.log('new state:', user)
                  }).catch((err) => console.error(err));

                toast.success(`Hey ${_.split(_.get(data, 'data.user.name', null), ' ', 1)}, Welcome Back!`);
                setIsLoading(false);
                if(_.get(data?.data, 'user_type', null) === "user") {
                  setTimeout(() => {
                    resetForm();
                    history.push(`/user/${slugify(_.get(data, 'data.user.name', null))}/dashboard`);
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

                <div className="md:col-span-10 col-span-12 mt-5 grid place-items-center w-full">
                  {isLoading
                    ? <ThreeDots className="animate__animated animate__pulse" height="2rem" width="4.5rem" fill={'#5037e9'} />
                    : <BlockBtn title={`Login`} type={"submit"} />
                  }
                </div>

                <div className="md:col-span-10 col-span-12 flex mt-5 mb-20 items-center">
                  <p className="m-0 text-xs font-semibold text-brand-black antialiased mr-1">Not registered yet?</p>
                  <button className="text-xs text-primary hover:text-primary-dark transition-all transform hover:scale-105 hover:ml-2 font-semibold antialiased">Create an Account</button>
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </Fragment>
  );
}

export default UserSignIn;
