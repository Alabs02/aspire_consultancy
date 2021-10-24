import localForage from "localforage";

localForage.config({
  driver: [
    localForage.INDEXEDDB,
    localForage.LOCALSTORAGE,
    localForage.WEBSQL,
  ],
  name: 'AspireConsultancyDB',
  version: 1.0,
  size: 4980736,
  storeName: 'aspire_db',
  description: 'AspireConsultancy local forage store'
});

export default localForage;