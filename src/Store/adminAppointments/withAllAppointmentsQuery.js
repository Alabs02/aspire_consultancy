import { selector } from 'recoil';
import { catchAxiosErrors, getToken, getRequest } from '../../Utils';
import adminAppointmentsAtom from './atom';

const withAllAppointmentsQuery = selector({
  key: 'withAllAppointmentsQuery',
  get: async ({get}) => {
    try {
      const { data, status, statusText } = await getRequest(`/admin/all-appointments`, {
        headers: { authorization: `Bearer ${await getToken()}` }
      });

      if (data) {
        console.log(data, status, statusText);
        console.log('Users Appointments: ', get(adminAppointmentsAtom));
        console.log('Actual Data: ', data?.data?.appointments);
        return data?.data?.appointments || [];
      }
    } catch (err) {
      catchAxiosErrors(err, null, null);
    }
  },
  set: ({ set, get }, newAppointment) => {
    set(adminAppointmentsAtom, [...get(adminAppointmentsAtom), newAppointment]);
  },
});

export default withAllAppointmentsQuery;