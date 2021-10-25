import { atom } from 'recoil';
import persistAtom from '../persistRecoil';

const adminAppointmentsAtom = atom({
  key: 'adminAppointmentsAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default adminAppointmentsAtom;