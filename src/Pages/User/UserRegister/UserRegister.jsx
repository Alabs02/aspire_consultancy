import { Fragment, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import { AuthLayout } from '../../../Layouts';
import { TextField, PasswordField } from '../../../Components/FormFields';
import FormLabel from '../../../Components/FormLabel';
import { TextBtn, BlockBtn } from '../../../Components/AppBtn';
import FormikErrorMsg from '../../../Components/FormikErrorMsg';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loading-icons';
import { catchAxiosErrors, postRequest, toFormData, slugify } from '../../../Utils';
import { localForage } from '../../../Services';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../../Store/user';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import 'animate.css';

const initialFormValues = () => {
  return {
    name: '',
    email: '',
    contact: '',
    password: '',
    password_confirmation: '',
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
  password_confirmation: string()
    .min(8, 'Too Short!')
    .required('Required!'),
});

const UserRegister = () => {

  const history =  useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

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
            try {
              setIsLoading(true);
              const { data, status, statusText } = await postRequest('/user/register', toFormData(values));

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

                toast.success(`Registration successfully, cheers 🥂`);
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
                  <FormLabel htmlFor={`name`} copy={`Name*`} mb={`mb-1`} />
                  <Field name="name" type="text" as={TextField} placeholder="Name" />
                  <FormikErrorMsg name="name" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 col-span-12 grid mb-4">
                  <FormLabel htmlFor={`email`} copy={`Email*`} mb={`mb-1`} />
                  <Field name="email" type="email" as={TextField} placeholder="mail@website.com" />
                  <FormikErrorMsg name="email" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 col-span-12 grid mb-4">
                  <FormLabel htmlFor={`contact`} copy={`Contact*`} mb={`mb-1`} />
                  <Field name="contact" type="tel" as={TextField} placeholder="09012345678" />
                  <FormikErrorMsg name="contact" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 col-span-12 grid mb-4">
                  <FormLabel htmlFor={`password`} copy={`Password*`} mb={`mb-1`} />
                  <Field name="password" as={PasswordField} placeholder="Min. 8 characters" />
                  <FormikErrorMsg name="password" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 col-span-12 grid mb-4">
                  <FormLabel htmlFor={`password_confirmation`} copy={`Confirm Password*`} mb={`mb-1`} />
                  <Field name="password_confirmation" as={PasswordField} placeholder="Min. 8 characters" />
                  <FormikErrorMsg name="password_confirmation" ref={useRef(null)}/>
                </div>

                <div className="md:col-span-10 col-span-12 flex justify-between">
                  <div>
                    <input type="checkbox" className="form-checkbox rounded text-primary" />
                    <span className="ml-2 text-xs font-medium text-brand-black antialiased">I agree to the <Link to="/" className="text-primary font-semibold">Terms & Conditions</Link></span>
                  </div>
                </div>

                <div className="md:col-span-10 col-span-12 mt-5 grid place-items-center w-100">
                  {isLoading
                    ? <ThreeDots className="animate__animated animate__pulse" height="2rem" width="4.5rem" fill={'#5037e9'} />
                    : <BlockBtn title={`Sign Me Up`} type={"submit"} />
                  }
                </div>

                <div className="md:col-span-10 col-span-12 flex mt-5 mb-8 items-center">
                  <p className="m-0 text-xs font-semibold text-brand-black antialiased mr-1">Already have an Account?</p>
                  <button type="button" onClick={() => history.push('/user/login')} className="text-xs text-primary hover:text-primary-dark transition-all transform hover:scale-105 hover:ml-2 font-semibold antialiased">Sign in</button>
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
