import { selector } from "recoil";
import { pick, isEmpty } from "lodash";
import adminAtom from './atom';

const withAdmin = selector({
  key: 'withAdmin',
  get: ({get}) => {
    const data = get(adminAtom);
    if (isEmpty(data)) {
      return {};
    } else {
      return pick(data, ['id', 'admin_id', 'name', 'contact', 'address', 'services']);
    }
  },
  set: ({set}, newValue) => set(adminAtom, newValue),
});

export default withAdmin;