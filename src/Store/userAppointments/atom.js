import { atom } from "recoil";
import persistAtom from '../persistRecoil';

const userAppointmentsAtom = atom({
  key: 'userAppointmentsAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default userAppointmentsAtom;