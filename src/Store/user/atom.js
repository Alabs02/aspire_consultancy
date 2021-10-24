import { atom } from "recoil";
import persistAtom from '../persistRecoil';

const userAtom = atom({
  key: 'userAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export default userAtom;