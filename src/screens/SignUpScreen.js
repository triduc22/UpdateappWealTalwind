import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../theme';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {getCurrentLanguage, setLanguage} from '../local/i18n';
import {useTranslation} from 'react-i18next';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // Function to check if the password meets your requirements.
  const isPasswordValid = password => {
    // Process to make at least 8 characters {8,} and contains at least one digit, one uppercase letter, and one special character.
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    if (email && password) {
      if (isPasswordValid(password)) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
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

  const {t} = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, backgroundColor: themeColors.bg}}>
        <View className="flex">
          {/* Process for icon "ArrowLeft" */}
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
              <ArrowLeftIcon size={20} color="black" />
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
                height: wp(10),
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
              source={require('../../assets/images/signup.png')}
              style={{width: 238, height: 155}}
            />
          </View>
        </View>

        {/* Process for white frame below */}

        <View
          style={{
            marginTop: hp(3),
            flex: 1,
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

            {/* Process for TextInput */}
            <TextInput
              style={{
                padding: 15,
                backgroundColor: 'rgb(243, 244, 246)',
                color: 'rgb(55, 65, 81)',
                borderRadius: 12,
                marginBottom: 15,
                marginVertical: 10,
              }}
              value={email}
              onChangeText={value => setEmail(value)}
              placeholder={t('enter-Email')}
            />

            <Text style={{color: 'rgb(55, 65, 81)', marginLeft: 15}}>
              {t('password')}
            </Text>

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
                onChangeText={value => setPassword(value)}
                placeholder={t('enter-Password')}
              />

              {/* Process show/hide for Password */}
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

            {/* Process function Box Sign Up */}
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
                {t('sign-Up')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Process for the "Login" button */}
          <View style={{flex: 2, marginTop: 3.5}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: 'rgb(107, 114, 128)', fontWeight: '600'}}>
                {t('title-Alreadyhaveanaccount?')}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: 'rgb(234, 179, 8)',
                    marginHorizontal: 1,
                  }}>
                  {t('title-LoginIn')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
