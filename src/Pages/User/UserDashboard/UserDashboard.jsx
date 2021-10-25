import { Fragment, Suspense, useState, useRef } from 'react';
import { Formik, Form, Field, FastField, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import MiniHeader from '../../../Components/MiniHeader';
import UserSideBar from '../../../Components/UserSideBar';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { UserAppointmentList } from '../../../Components/UserPartials';
import GridCards from '../../../Components/GridCards';
import Modal from '../../../Components/Modal';
import FormLabel from '../../../Components/FormLabel';
import { TextField } from '../../../Components/FormFields';
import { BlockBtn } from '../../../Components/AppBtn';
import { ThreeDots } from 'react-loading-icons';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import { withUser } from '../../../Store/user';
import { catchAxiosErrors, postRequest, toFormData, getToken } from '../../../Utils';
import { useRecoilState } from 'recoil';
import { userAppointmentsAtom } from '../../../Store/userAppointments';
import { toast } from 'react-toastify';
import './UserDashboard.css';
import 'animate.css';

const initialFormValues = () => {
  return {
    subject: '',
    company_name: '',
    appointment_date: '',
    appointment_time: '',
  }
}

const appointmentSchema = object().shape({
  subject: string()
    .required('Required!'),
  appointment_date: string()
    .required('Required!'),
  appointment_time: string()
    .required('Required!'),
});

const UserDashboard = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userProfile = useRecoilValue(withUser);
  const [userAppointments, setUserAppointments] = useRecoilState(userAppointmentsAtom);

  return (
    <Fragment>
      <div className="wrapper min-h-screen min-w-full bg-white">
        <div className="p-12 bg-white-pure"></div>
        <div className="main__wrapper min-h-screen min-w-full grid grid-cols-12 -mt-16">
          {/* Side bar */}
          <UserSideBar />
          <div className="main__body h-full w-full col-span-12 md:col-span-9">
            <MiniHeader />

            <main className="grid mt-5 pr-4 pl-4 md:pl-0 md:pr-10 mb-5">
              {/* Body */} 
              <div className="flex flex-col md:flex-row items-center justify-center w-100 md:justify-between py-4">
                <h4 className="text-brand-black uppercase tracking-wider font-light">My appointments</h4>

                <button onClick={() => setIsOpen(!isOpen)} className="flex items-center transition-all bg-warning text-brand-black mt-3 md:mt-0 px-6 py-3 rounded-2xl font-medium antialiased shadow hover:shadow-xl">
                  <BsFillCalendarPlusFill className="mr-2" />
                  Book an Appointment
                </button>

                <Modal  isOpen={isOpen} ref={useRef(null)} toggleModal={() => setIsOpen(!isOpen)}>
                  <div className="modal bg-white-pure w-full rounded-xl overflow-hidden">
                    <div className="modal__header flex justify-between items-center py-2 px-6 border-b">
                      <h5 className="text-brand-black font-medium text-lg">Book an Appointment</h5>
                      <div onClick={() => setIsOpen(!isOpen)} className="p-1.5 transition-all rounded-full cursor-pointer hover:bg-gray-200">
                        <CgClose className="text-brand-black" size="22px" />
                      </div>
                    </div>

                    <div className="modal__body p-6">
                      <Formik
                        initialValues={initialFormValues()}
                        validationSchema={appointmentSchema}
                        onSubmit={async (values, { resetForm }) => {
                          try {
                            setIsLoading(true);
                            const { data, status, statusText } = await postRequest(`/user/create-appointments`, toFormData(values), {
                              headers: { authorization: `Bearer ${await getToken()}` }
                            });

                            if (data) {
                              console.log(data, status, statusText);
                              setUserAppointments(items => [...items, data?.data?.appointment]);
                              setIsLoading(false);
                              setIsOpen(false);
                              toast.success(`Appointment booked succesfully!`);
                              resetForm();
                            }
                          } catch (err) {
                            catchAxiosErrors(err, setIsLoading, null);
                          }
                        }}
                      >
                        {props => (
                          <Form>
                            <div className="grid grid-cols-12">

                              <div className="col-span-12 grid mb-4">
                                <FormLabel htmlFor={`company_name`} copy={`Company Name(Optional)`} mb={'mb-1'} />
                                <Field name="company_name" type="text" as={TextField} placeholder="e.g Alphabet" />
                                <ErrorMessage name="company_name">
                                  {msg => <div className="text-left text-red-500 font-medium text-sm">{msg}</div>}
                                </ErrorMessage>
                              </div>

                              <div className="col-span-12 grid mb-4">
                                <FormLabel htmlFor={`subject`} copy={`Appointment Subject*`} mb={'mb-1'} />
                                <FastField name="subject">
                                  {({ field }) => (
                                    <textarea cols="30" rows="4" className="form-textarea text-secondary text-sm py-3 rounded-3xl shadow-sm border-1 border-white focus:border-primary" {...field}></textarea>
                                  )}
                                </FastField>
                                <ErrorMessage name="subject">
                                  {msg => <div className="text-left text-red-500 font-medium text-sm">{msg}</div>}
                                </ErrorMessage>
                              </div>

                              <div className="col-span-12 grid mb-4">
                                <FormLabel htmlFor={`appointment_date`} copy={`Appointment Date*`} mb={'mb-1'} />
                                <Field name="appointment_date" type="date" as={TextField} />
                                <ErrorMessage name="appointment_date">
                                  {msg => <div className="text-left text-red-500 font-medium text-sm">{msg}</div>}
                                </ErrorMessage>
                              </div>

                              <div className="col-span-12 grid mb-4">
                                <FormLabel htmlFor={`appointment_time`} copy={`Appointment Time*`} mb={'mb-1'} />
                                <Field name="appointment_time" type="time" as={TextField} />
                                <ErrorMessage name="appointment_time">
                                  {msg => <div className="text-left text-red-500 font-medium text-sm">{msg}</div>}
                                </ErrorMessage>
                              </div>
                              
                              <div className="col-span-12 grid place-items-center mt-2">
                                { !isLoading
                                  ? <button 
                                      className="block w-full antialiased shadow-sm hover:shadow-md text-white py-2.5 text-sm tracking-tight rounded-3xl transition-all bg-primary hover:bg-primary-dark animate__animated animate__pulse" 
                                      type="submit"
                                    >
                                      Book Now
                                    </button>
                                  : <ThreeDots className="animate__animated animate__pulse" height="2rem" width="4.5rem" fill={'#5037e9'} />
                                }
                              </div>

                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </Modal>
              </div>

              <Suspense fallback={<GridCards />}>
                <UserAppointmentList />
              </Suspense>

            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserDashboard;
