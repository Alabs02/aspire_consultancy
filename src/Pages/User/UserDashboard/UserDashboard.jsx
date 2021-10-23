import { Fragment, Suspense, useState, useRef } from 'react';
import { Formik, Form, Field, FastField } from 'formik';
import { object, string } from 'yup';
import MiniHeader from '../../../Components/MiniHeader';
import UserSideBar from '../../../Components/UserSideBar';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { UserAppointmentList } from '../../../Components/UserPartials';
import GridCards from '../../../Components/GridCards';
import Modal from '../../../Components/Modal';
import FormLabel from '../../../Components/FormLabel';
import './UserDashboard.css';
import { TextField } from '../../../Components/FormFields';
import FormikErrorMsg from '../../../Components/FormikErrorMsg';
import { BlockBtn } from '../../../Components/AppBtn';
import ThreeDots from 'react-loading-icons/dist/components/three-dots';

const initialFormValues = () => {
  return {
    subject: '',
    date: '',
    time: '',
  }
}

const appointmentSchema = object().shape({
  subject: string()
    .required('Required!'),
  date: string()
    .required('Required!'),
  time: string()
    .required('Required!'),
});

const UserDashboard = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Fragment>
      <div className="wrapper min-h-screen min-w-full bg-white">
        <div className="p-12 bg-white-pure"></div>
        <div className="main__wrapper min-h-screen min-w-full grid grid-cols-12 -mt-16">
          {/* Side bar */}
          <UserSideBar />
          <div className="main__body h-full w-full col-span-9">
            <MiniHeader />

            <main className="grid mt-5 pr-10 mb-5">
              {/* Body */} 
              <div className="flex sm:flex-col md:flex-row items-center justify-between py-4">
                <h4 className="text-brand-black uppercase tracking-wider font-light">My appointments</h4>

                <button onClick={() => setIsOpen(!isOpen)} className="flex items-center transition-all bg-warning text-brand-black px-6 py-3 rounded-2xl font-medium antialiased shadow hover:shadow-xl">
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
                          console.log(values);
                        }}
                      >
                        {props => (
                          <Form>
                            <div className="grid grid-cols-12">

                              <div className="col-span-12 grid mb-4">
                                <FormLabel htmlFor={`subject`} copy={`Appointment Subject*`} mb={'mb-1'} />
                                <FastField name="subject">
                                  {({ field }) => (
                                    <textarea cols="30" rows="4" className="form-textarea text-secondary text-sm py-3 rounded-3xl shadow-sm border-1 border-white focus:border-primary" {...field}></textarea>
                                  )}
                                </FastField>
                                <FormikErrorMsg name="subject" ref={useRef(null)} />
                              </div>

                              <div className="col-span-12 grid mb-4">
                                <FormLabel htmlFor={`date`} copy={`Appointment Date*`} mb={'mb-1'} />
                                <Field name="date" type="date" as={TextField} />
                                <FormikErrorMsg name="date" ref={useRef(null)} />
                              </div>

                              <div className="col-span-12 grid mb-4">
                                <FormLabel htmlFor={`time`} copy={`Appointment Time*`} mb={'mb-1'} />
                                <Field name="time" type="time" as={TextField} />
                                <FormikErrorMsg name="time" ref={useRef(null)} />
                              </div>

                              <div className="col-span-12 grid place-items-center mt-3 mb-5">
                                { isLoading
                                  ? <ThreeDots className="animate__animated animate__pulse" height="2rem" width="4.5rem" fill={'#5037e9'} />
                                  : <BlockBtn title={`Book Now`} type={"submit"} ref={useRef(null)} />
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
