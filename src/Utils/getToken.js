import { localForage } from '../Services';

const getToken = async () => {
  try {
    const userCredentials = await localForage.getItem('userCredentials');
    return userCredentials?.access_token
  } catch (err) {
    console.debug(err)
    throw err
  }
}

export default getToken;