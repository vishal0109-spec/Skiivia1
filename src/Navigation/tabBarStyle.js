import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const tabBarstyles = StyleSheet.create({
    tabBar:{
        backgroundColor:"#000",
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    }
});