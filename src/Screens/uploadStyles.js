import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    uploadImage: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    container2: {
      flexGrow: 1,
    },
    descriptnContainer: {
      flex: 1,
      marginLeft: wp(5),
      marginTop: hp(2),
    },
    uploadTxt: {
      fontSize: hp(3),
      color: 'gray',
    },
    image: {
      width: wp(50),
      height: hp(40),
      tintColor: '#C0C0C0',
      resizeMode: 'contain',
    },
    image2: {
      width: wp(90),
      height: hp(45),
      resizeMode: 'contain',
    },
    imageContainer: {
      margin: wp(5),
      flex: 1,
      backgroundColor: '#DCDCDC',
    },
    btnSubmitTxt: {
      color: 'white',
      textAlign: 'center',
      fontSize: hp(2.2),
    },
    btnSubmit: {
      borderWidth: 1,
      borderColor: '#e8e8e8',
      backgroundColor: '#1877f2',
      shadowOpacity: 0.2,
      shadowColor: '#000000',
      shadowRadius: 3,
      elevation: 20,
      shadowOffset: {
        width: -2,
        height: 4,
      },
      height: hp(6.3),
      justifyContent: 'center',
      width: wp(90),
      marginBottom: hp(1.2),
      flexDirection: 'row',
      padding: wp(3.2),
      borderRadius: hp(1.3),
    },
    disabledButton: {
      backgroundColor: '#D3D3D3',
    },
    buttonContainer: {
      flex: 1,
      marginTop: hp(5),
      marginLeft: wp(5),
    },
    descriptinBox: {
      width: wp(90),
      backgroundColor: '#F9F9F9',
      borderRadius: hp(0.7),
      borderColor: '#E8E8E8',
      borderWidth: 1,
      height: hp(15),
      borderStyle: 'solid',
      marginTop: hp(1),
      paddingLeft: wp(3),
    },
    descriptionTxt: {
      fontSize: hp(2),
    },
    errorText: {
      color: 'red',
      fontSize: hp(1.8),
    },
  });
  