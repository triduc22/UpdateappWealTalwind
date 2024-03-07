import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {getCurrentLanguage, setLanguage} from '../local/i18n';
import {useTranslation} from 'react-i18next';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function WelcomeScreen() {
  // const a = "Let's Get Started!";

  const navigation = useNavigation();

  const {t} = useTranslation();

  return (
    <View style={{flex: 1, backgroundColor: '#176B87'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: 20,
          // marginHorizontal: 45,
          marginHorizontal: wp(10.3),
          width: 270,
          height: 55,
          overflow: 'hidden',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: '700',
            // marginLeft: 40,
            marginLeft: wp(2),
            marginRight: wp(-10)
          }}>
          {t('a')}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: '700',
              paddingTop: 15,
              marginLeft: 10,
            }}>
            {t('title-Language')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            getCurrentLanguage() === 'vi'
              ? setLanguage('en')
              : setLanguage('vi')
          }>
          <Text
            style={{
              // flex: 4,
              color: 'rgb(253,224, 71)',
              fontSize: 20,
              fontWeight: '700',
              marginVertical: -27,
              marginLeft: 147,
              // marginHorizontal: 20,
            }}>
            {getCurrentLanguage() === 'vi' ? 'EN' : 'VN'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
        <Swiper
          autoplay={true}
          dot={
            <View
              style={{
                backgroundColor: 'gray',
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: 'yellow',
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 3,
              }}
            />
          }>
          <View>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450_960_720.jpg',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2019/03/11/00/15/rainbow-4047523_960_720.jpg',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2017/02/21/09/02/clouds-2085112_1280.jpg',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </Swiper>
      </View>

      <View style={{flex: 1, justifyContent: 'center', padding: 10, marginTop: 40}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{padding: 10, backgroundColor: 'rgb(250, 204, 21)', borderRadius: 15}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'rgb(55, 65, 81)',
              textAlign: 'center',
            }}>
            {t('sign-Up')}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 16,}}>
          {t('title-Alreadyhaveanaccount?')}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{fontWeight: '600', fontSize: 16, color: 'rgb(250,204,21)', marginLeft: 5}}>
           {t('title-LoginIn')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
