import { atom } from "recoil";
import persistAtom from '../persistRecoil';

const adminAtom = atom({
  key: 'adminAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export default adminAtom;