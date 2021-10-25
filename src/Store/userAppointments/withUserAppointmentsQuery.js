import { selector } from "recoil";
import userAppointmentsAtom from "./atom";
import { catchAxiosErrors, getRequest, getToken } from "../../Utils";

const withUserAppointmentsQuery = selector({
  key: 'withUserAppointmentsQuery',
  get: async ({get}) => {
    try {
      const { data, status, statusText } = await getRequest(`/user/appointments`, {
        headers: { authorization: `Bearer ${await getToken()}` }
      });

      if (data) {
        console.log(data, status, statusText);
        console.log('User Appointments: ', get(userAppointmentsAtom));
        console.log('Actual Data: ', data?.data?.appointments);
        return data?.data?.appointments || [];
      }
    } catch (err) {
      catchAxiosErrors(err, null, null);
    }
  },
  set: ({ set, get }, newAppointment) => {
    set(userAppointmentsAtom, [...get(userAppointmentsAtom), newAppointment]);
  },
});

export default withUserAppointmentsQuery;