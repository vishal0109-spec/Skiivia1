import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const tabBarstyles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  drawerIconOpacity: {
    flexDirection: 'row',
  },
  profileTxtContainer:{
   marginLeft:wp(4),
   alignSelf:'center'
  },
  drawerContainer: {
    flex: 1,
    backgroundColor:'transparent'
  },
  profileContainer: {
    backgroundColor: '#3366cc',
    borderTopRightRadius:wp(8),
  },
  profileContainer2: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(6),
    marginBottom:hp(6),
    marginLeft:wp(6),
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  buttonContainer3:{
    marginTop: hp(3),
    marginLeft:wp(6),
    gap:hp(3)
  },
  buttonContainer4:{
    backgroundColor: 'white',
    borderBottomRightRadius:wp(8),
  },
  buttonContainer5:{
    marginLeft:wp(6),
    marginBottom: hp(3),
   
  },
  drawerIcon: {
    height: hp(6),
    width: wp(12),
  },
  profileIcon:{
    height: hp(6),
    width: wp(12),
    borderRadius:wp(5),
  },
  drawerIcon2: {
    height: hp(4),
    width: wp(8),
    tintColor:'#3366cc'
  },
  drawerIcon3: {
    height: hp(4),
    width: wp(8),
    tintColor:'red'
  },
  arrowIcon: {
    height: hp(3.2),
    width: wp(4),
    tintColor: 'white',
    marginTop: hp(1.5),
    marginRight:wp(6),
  },
  arrowIcon2: {
    height: hp(3),
    width: wp(2),
    tintColor: '#666699',
    marginRight:wp(6),
  },
  drawerIconTxt: {
    color: 'white',
    alignSelf: 'stretch',
    fontSize: hp(4),
    fontWeight: '600',
  },
  profileTxt:{
    color: 'white',
    alignSelf: 'center',
    fontSize: hp(1.8),
    fontWeight: '400',
  },
  drawerIconTxt2: {
    marginLeft: wp(3),
    color: '#3366cc',
    alignSelf:'center'
  },
  drawerIconTxt3: {
    marginLeft: wp(1),
    color: 'red',
    alignSelf:'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'none',
  },
  indicator: {
    backgroundColor: '#F3B232',
    height: 3,
  },
});
