import { Fragment, useRef, useState } from 'react';
import { Formik, Form, Field, FastField, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { useRecoilValue } from 'recoil';
import { withAllAppointmentsQuery } from '../../../Store/adminAppointments';
import { ThreeDots } from 'react-loading-icons';
import _, { isEmpty } from 'lodash';
import DateObject from "react-date-object";
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import NoEntity from '../../NoEntity';
import { catchAxiosErrors, postRequest, getToken, toFormData } from '../../../Utils';
import { TextField } from '../../FormFields';
import FormLabel from '../../FormLabel';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { adminAppointmentsAtom } from '../../../Store/adminAppointments';
import Modal from '../../Modal';
import 'animate.css';
import './AppointmentList.css';

const initialFormValues = (data) => {
  return {
    company_name: (data?.company_name === null) ? '' : data?.company_name,
    subject: data?.subject,
    appointment_date: data?.appointment_date,
    appointment_time: data?.appointment_time,
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

const AppointmentActions = ({ appointment, modalId }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [appointments, setAppointments] = useRecoilState(adminAppointmentsAtom);

  const handleRemove = (uid) => {
    setAppointments(appointments.filter(item => item.id !== uid));
  }

  const deleteAppointment = async (aId) => {
    try {
      setIsDeleting(true);
      const { data, status, statusText } = await postRequest(`/admin/delete-appointment/${aId}`, null, {
        headers: { authorization: `Bearer ${await getToken()}` }
      });

      if (data) {
        setAppointments({});
        setIsDeleting(false);
        toast.success(`Deleted Successfully!`);
        console.log(data, status, statusText)
      }
    } catch (err) {
      catchAxiosErrors(err, setIsDeleting, null);
    }
  }

  const updateAppointment = () => {
    try {
      setIsLoading(true);

    } catch (err) {
      catchAxiosErrors(err, setIsLoading, null);
    }
  }

  return (
    <Fragment>
      <BiEdit onClick={() => setIsOpen(!isOpen)} id={modalId} className="text-brand-black cursor-pointer transform hover:scale-105 mr-4" size={20} />
      {/* Modal */}
        <Modal
          isOpen={isOpen}
          ref={useRef(null)}
        >
          <div className="modal bg-white-pure w-full rounded-xl overflow-hidden">

            <div className="modal__header flex justify-between items-center py-2 px-6 border-b">
              <h5 className="text-brand-black font-medium text-lg">Book an Appointment</h5>
              <div onClick={() => setIsOpen(!isOpen)} className="p-1.5 transition-all rounded-full cursor-pointer hover:bg-gray-200">
                <CgClose className="text-brand-black" size="22px" />
              </div>
            </div>
            
            <div className="modal__body p-6">
              <Formik
                initialValues={initialFormValues(appointment)}
                validationSchema={appointmentSchema}
                onSubmit={async (values, { resetForm }) => {
                  console.log(values);
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
      {/* Modal */}
      
      { !isDeleting
        ? <div className="m-0 p-0">
            <MdDelete onClick={() => deleteAppointment(_.get(appointment, 'id', null))} id={modalId} className="text-brand-black cursor-pointer transform hover:scale-105 hover:text-red-500" size={20} />
          </div>
        : <div class="text-sm text-red-500">Deleting...</div>
      }
    </Fragment>
  );
}

const AppointmentList = () => {
  const appointments = useRecoilValue(withAllAppointmentsQuery);
  console.log('Appointments');
  
  return (
    <Fragment>
      <div className="min-w-full">
        {(!isEmpty(appointments))
          ? <table className="w-full grid grid-cols-12 overflow-hidden rounded-xl">
              <thead className="col-span-12 bg-primary-black">
                <tr className="text-primary-light w-full grid grid-cols-12 py-3 px-4">
                  <th className="text-left font-medium text-sm tracking-wide col-span-1">S/N</th>
                  <th className="text-left font-medium text-sm tracking-wide col-span-2">Company Name</th>
                  <th className="text-left font-medium text-sm tracking-wide col-span-2">Subject</th>
                  <th className="text-left font-medium text-sm tracking-wide col-span-2">Appointment Date</th>
                  <th className="text-left font-medium text-sm tracking-wide col-span-2 md:pl-4">Appoint Time</th>
                  <th className="text-left font-medium text-sm tracking-wide col-span-3">Actions</th>
                </tr>
              </thead>
              <tbody className="col-span-12 bg-white-pure w-full">
                {appointments.map((appointment, index) => (
                  <tr key={_.get(appointment, 'id', null)} className="py-2.5 w-full grid grid-cols-12 px-6 hover:bg-white-dark transition-colors">
                    <td className="col-span-1 text-left text-sm text-brand-black font-medium">{index+1}</td>
                    <td className="col-span-2 text-left text-sm text-brand-black font-medium">{
                      (_.get(appointment, 'company_name', null) !== null)
                      ? _.get(appointment, 'company_name', null)
                      : `Not Available`
                    }</td>
                    <td className="col-span-2 text-left text-xs text-brand-black font-medium">{_.get(appointment, 'subject', null)}</td>
                    <td className="col-span-2 text-left text-sm text-brand-black font-medium">{new DateObject(new Date(_.get(appointment, 'appointment_date', null))).format("dddd DD MMMM")}</td>
                    <td className="col-span-2 md:pl-4 text-left text-sm text-brand-black font-medium">{_.get(appointment, 'appointment_time', null)}</td>
                    <td className="col-span-3 text-left text-sm text-brand-black font-medium">
                    <div className="flex items-center">
                      <AppointmentActions 
                        modalId={`delete_btn${_.get(appointment, 'id', null)}`}
                        appointment={appointment}
                      />
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          : <NoEntity 
              heading={`No Appointments At The Moment!`}
              copy={`Once clients book appointments, they will appear here.`}
            />
        }
      </div>
    </Fragment>
  );
}

export default AppointmentList;
