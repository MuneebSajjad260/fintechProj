import * as Keychain from 'react-native-keychain';
import {setLoginUserName} from '../redux/slices/isadminSlice';
import TouchID from 'react-native-touch-id';
import { AppTheme } from '../theme';

export const KEYCHAIN_BASE_SERVICE = 'fintechAutoLogin';

const getUserKeychainService = userName =>
  `${KEYCHAIN_BASE_SERVICE}_${userName}`;

export const handleSave = async (username, password) => {
  const service = getUserKeychainService(username);
  try {
    //* Check if the user already exists in the Key Chain
    const services = await Keychain.getAllGenericPasswordServices();
    const existingService = services.find(s => s === service);
    if (existingService) {
      console.log('Credentials for user already exist');
      return;
    }

    await Keychain.setGenericPassword(username, password, {
      service,
      // storage: Keychain.STORAGE_TYPE.RSA,
    });
    console.log('Success', 'Credentials saved successfully');
  } catch (error) {
    console.log('Error while saving:', error);
  }
};

export const suggestSavedCredentials = async (
  service,
  onSubmit,
  setUserName,
  setPassword,
  dispatch,
) => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: service,
    });
    if (credentials) {
      // Prompt user to authenticate to retrieve login credentials
      const authenticated = await Keychain.getGenericPassword({
        service,
      });
      if (authenticated) {
        onSubmit({
          username: credentials.username,
          password: credentials.password,
          grant_type: 'password',
        });
        setUserName({value: credentials.username, error: ''});
        setPassword({value: credentials.password, error: ''});
        dispatch(setLoginUserName(credentials.username));
      }
    } else {
      // No saved credentials found
      console.log('No Saved Credentials Found!');
    }
  } catch (error) {
    console.log('Error Occurred while getting:', error);
  }
};

export const getAllSavedUsers = async () => {
  try {
    const services = await Keychain.getAllGenericPasswordServices();
    const users = services
      .filter(service => service.startsWith(KEYCHAIN_BASE_SERVICE))
      .map(service => {
        const username = service.split('_')[1];
        return {
          username,
          service,
        };
      });
    // console.log('Here are the saved users:', users);
    return users.length > 0 ? users : [];
  } catch (error) {
    console.log('Error occurred while getting all saved users:', error);
    return [];
  }
};

export const deleteKeychainItem = async serviceName => {
  try {
    await Keychain.resetGenericPassword({
      service: `${KEYCHAIN_BASE_SERVICE}_${serviceName}`,
    });
    console.log(
      `Successfully deleted keychain item for service: ${serviceName}`,
    );
  } catch (error) {
    console.error(
      `Failed to delete keychain item for service: ${serviceName}, error: ${error}`,
    );
  }
};

export const deleteAllSavedCredentials = async () => {
  try {
    const services = await Keychain.getAllGenericPasswordServices();
    for (let service of services) {
      await Keychain.resetGenericPassword({service});
    }
    console.log('Successfully deleted all saved credentials');
  } catch (error) {
    console.log('Error occurred while deleting all saved credentials:', error);
  }
};


const optionalConfigObject = {
  title: 'Please Authenticate', // Android
  imageColor: AppTheme.COLORS.darkModeBg, // Android
  imageErrorColor: AppTheme.COLORS.error, // Android
  sensorDescription: 'Slightly Touch sensor', // Android
  sensorErrorDescription: "Failed", // Android
  cancelText: "Cancel", // Android
  fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS
};

export const getSavedCredentials = async () => {
  try {
    const biometryType = await TouchID.isSupported();
    if (biometryType === 'FaceID') {
      const users = await getAllSavedUsers();
      if (users.length > 0) {
        const success = await TouchID.authenticate('');
        if (success) {
          console.log('Successfully Logged In: ', users);
          return users;
        }
      } else {
        console.log('No Saved Credentials Found! (iOS)');
        return null;
      }
    } else {
      const users = await getAllSavedUsers();
      if (users.length > 0) {
        const success = await TouchID.authenticate('', optionalConfigObject);
        if (success) {
          console.log('Successfully Logged In: ', users);
          return users;
        }
      } else {
        console.log('No Saved Credentials Found! (Android)');
        return null;
      }
    }
  } catch (error) {
    console.log('Authentication Failed', error.message);
    return null;
  }
};
