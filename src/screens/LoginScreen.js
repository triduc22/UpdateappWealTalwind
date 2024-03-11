import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../theme';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
// Import Firebase auth function for password reset
import {sendPasswordResetEmail} from 'firebase/auth';
import {getCurrentLanguage, setLanguage} from '../local/i18n';
import {useTranslation} from 'react-i18next';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function LoginScreen() {
  /*Process for change between page */
  const navigation = useNavigation();

  /*Process to add Firebase Authentication */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Process show red text
  const [isEmailFilled, setIsEmailFilled] = useState(true);
  const [isPasswordFilled, setIsPasswordFilled] = useState(true);

  /*Process for show/hide password */
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  {
    /*Process password with character */
  }
  const handleSubmit = async () => {
    if (email && password) {
      // Check if the password meets your criteria (e.g., at least 6 characters)
      if (isPasswordValid(password)) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
          console.log('Error:', err.message);
        }
      } else {
        Alert.alert(
          'Password Requirements',
          'Password must be at least 6 characters long.',
        );
      }
    } else {
      Alert.alert(
        'Missing Information',
        'Please provide both email and password.',
      );
    }
  };

  // Function to check if the password meets your requirements.
  const isPasswordValid = password => {
    // Process to make at least 8 characters {8,} and contains at least one digit, one uppercase letter, and one special character.
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  {
    /*Process for forgot password */
  }
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailModalVisible, setResetEmailModalVisible] = useState(false); // State variable for the modal

  // Function to reset the password
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert(
        'Password Reset',
        'Your password reset email has been sent to your email address.',
      );
      setResetEmail('');
      setResetEmailModalVisible(false);
    } catch (error) {
      Alert.alert('Password Reset Error', error.message);
    }
  };

  const {t} = useTranslation();

  return (
    // <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, backgroundColor: themeColors.bg}}>
        <View className="flex">
          {/*Process for icon "ArrowLeft"*/}
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: 'rgb(250, 204, 21)',
                padding: 6,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 12,
                marginLeft: 10,
                marginTop: 10,
              }}>
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop: 20,
                // marginHorizontal: 45,
                marginHorizontal: wp(50),
                // width: 470,
                width: wp(40),
                // height: 55,
                height: wp(11),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 21,
                  fontWeight: '700',
                  paddingTop: 10,
                  // marginLeft: 178,
                  // marginLeft: wp(40),
                }}>
                {t('title-Language')}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  getCurrentLanguage() === 'vi'
                    ? setLanguage('en')
                    : setLanguage('vi')
                }>
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgb(253,224, 71)',
                    fontSize: 20,
                    fontWeight: '700',
                    // marginHorizontal: 11,
                    marginHorizontal: wp(1),
                    // marginTop: 14,
                    marginTop: hp(1.75),
                  }}>
                  {getCurrentLanguage() === 'vi' ? 'EN' : 'VN'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Process insert image */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp(5),
            }}>
            <Image
              source={require('../../assets/images/login.png')}
              style={{width: 195, height: 170}}
            />
          </View>
        </View>

        {/*Process for khung trắng dưới */}

        <View
          style={{
            flex: 1,
            marginTop: hp(3),
            backgroundColor: 'white',
            paddingLeft: 5,
            paddingTop: 28,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
          <View style={{padding: 20}}>
            <Text style={{color: 'rgb(55, 65, 81)', marginLeft: 15}}>
              {t('email-Address')}
            </Text>

            {/*Process for TextInput */}
            {/*Process for Email */}
            <TextInput
              style={{
                padding: 15,
                backgroundColor: 'rgb(243, 244, 246)',
                color: 'rgb(55, 65, 81)',
                borderRadius: 12,
                marginBottom: 15,
                marginVertical: 10,
              }}
              /*Process before to add Firebase Authentication */
              /* value="duc@gmail.com" */

              /*Process to add Firebase Authentication */
              value={email}
              // onChangeText={value => setEmail(value)}
              onChangeText={value => {
                setEmail(value);
                setIsEmailFilled(value.trim() !== '');
              }}
              placeholder={t('enter-Email')}
            />

            {/* Process show red text */}
            {!isEmailFilled && (
              <View
                style={{
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                  // paddingTop: 0.5,
                  paddingTop: hp(1),
                  paddingBottom: hp(3),
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 13,
                  }}>
                  {t('redtext')}
                </Text>
              </View>
            )}

            <Text style={{color: 'rgb(55, 65, 81)', marginLeft: 15}}>
              {t('password')}
            </Text>

            {/*Process for Password */}
            <View>
              <TextInput
                style={{
                  padding: 15,
                  backgroundColor: 'rgb(243, 244, 246)',
                  color: 'rgb(55, 65, 81)',
                  borderRadius: 12,
                  marginBottom: 45,
                  marginVertical: 10,
                }}
                secureTextEntry={!showPassword}
                value={password}
                // onChangeText={value => setPassword(value)}
                onChangeText={value => {
                  setPassword(value);
                  setIsPasswordFilled(value.trim() !== '');
                }}
                placeholder={t('enter-Password')}
              />

              {/* Process show red text */}
              {!isPasswordFilled && (
                <View
                  style={{
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    justifyContent: 'flex-start',
                    alignItems: 'baseline',
                    fontSize: 10,
                    // marginTop: -25,
                    marginTop: hp(-2.5),
                  }}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 13,
                    }}>
                    {t('redtextpass')}
                  </Text>
                </View>
              )}

              {/*Process show/hide for Password */}
              <TouchableOpacity
                style={{position: 'absolute', right: 16, marginVertical: 20}}
                onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={
                    showPassword
                      ? require('../../assets/images/show.png')
                      : require('../../assets/images/hide.png')
                  }
                  style={{flex: 1, marginTop: 9, width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>

            {/*Process for forgot password */}
            <TouchableOpacity
              // className="flex items-end mb-5">
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: hp(3),
              }}
              onPress={() => setResetEmailModalVisible(true)}>
              <Text
                style={{
                  color: 'rgb(55, 65, 81)',
                  marginVertical: hp(-2.5),
                }}>
                {t('forgot-Password')}
              </Text>
            </TouchableOpacity>

            {/* Modal for Reset Password */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={resetEmailModalVisible}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                    width: '80%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}>
                    Reset Password
                  </Text>
                  <TextInput
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      marginBottom: 10,
                    }}
                    placeholder="Enter your email"
                    onChangeText={text => setResetEmail(text)}
                    value={resetEmail}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'blue',
                      padding: 10,
                      borderRadius: 5,
                    }}
                    onPress={resetPassword}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Reset Password
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'gray',
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => setResetEmailModalVisible(false)}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/*Process function Box Login */}
            <TouchableOpacity
              style={{
                padding: 12,
                backgroundColor: 'rgb(250, 204, 21)',
                borderRadius: 12,
              }}
              onPress={handleSubmit}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'rgb(55, 65, 81)',
                }}>
                {t('log-In')}
              </Text>
            </TouchableOpacity>
          </View>

          {/*Process for make button choose method "Sign Up" */}
          <View style={{flex: 2, marginTop: 3.5}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: 'rgb(107, 114, 128)', fontWeight: '600'}}>
                {t('title-do not Account')}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: 'rgb(234, 179, 8)',
                    marginHorizontal: wp(1),
                  }}>
                  {t('sign-Up')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
