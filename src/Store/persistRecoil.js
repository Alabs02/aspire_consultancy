import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: 'aspire-recoil-persist',
  storage: localStorage,
});

export default persistAtom;