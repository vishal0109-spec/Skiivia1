import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList, Swipeable} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

//user-define imports
import Button from '../../../Components/CustomButton';
import {deleteIcon, drawer, save} from '../../../Utils/img';
import TopTabs from '../../../Navigation/TopTabNav';

interface NotificationItem {
  id: string;
  text: string;
}
const todoList: NotificationItem[] = [
  {id: '1', text: 'Notification 1'},
  {id: '2', text: 'Notification 2'},
  {id: '3', text: 'Notification 3'},
  {id: '4', text: 'Notification 4'},
  {id: '5', text: 'Notification 5'},
  {id: '6', text: 'Notification 6'},
  {id: '7', text: 'Notification 7'},
];

const Separator = () => <View style={Styles.itemSeparator} />;
const LeftSwipeActions = () => {
  return (
    <View style={Styles.lsAction}>
      <Button
        icon={save}
        iconStyle={Styles.icon}
        style={Styles.saveBtn}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};
const rightSwipeActions = () => {
  return (
    <View style={Styles.rsAction}>
      <Button
        icon={deleteIcon}
        iconStyle={Styles.icon}
        style={Styles.dltBtn}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};
const swipeFromLeftOpen = () => {
  Alert.alert('Swipe from left');
};

const ListItem = ({
  id,
  text,
  onDelete,
}: {
  id: string;
  text: string;
  onDelete: (id: string) => void;
}) => (
  <Swipeable
    renderLeftActions={LeftSwipeActions}
    renderRightActions={rightSwipeActions}
    onSwipeableRightOpen={() => onDelete(id)}
    onSwipeableLeftOpen={swipeFromLeftOpen}>
    <View
      style={Styles.swipeContainer}>
      <Text style={Styles.ntfTxt}>{text}</Text>
    </View>
  </Swipeable>
);

const Notification = () => {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState(todoList);

  const handleDelete = (id: string) => {
    const updatedNotifications = notifications.filter(item => item.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <>
      <SafeAreaView style={Styles.container}>
        <View style={Styles.nsContainer}>
          <Button
            icon={drawer}
            iconStyle={Styles.drawerIcon}
            onPress={() => navigation.openDrawer()}
          />
          <Text style={Styles.nsTxt}>Notification Screen</Text>
        </View>

        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ListItem {...item} onDelete={handleDelete} />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />

        <View style={Styles.topTabContainer}>
          <Button
            style={Styles.button}
            onPress={() => navigation.navigate('TopTabs')}
            title="Top Tabs"
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Notification;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ntfTxt:{
   fontSize:hp(3),
   fontFamily:'Roboto-Regular'
  },
  swipeContainer: {
    paddingHorizontal: wp(8),
    paddingVertical: hp(3),
    backgroundColor: 'white',
  },
  lsAction: {
    flex: 1,
    backgroundColor: '#ccffbd',
    justifyContent: 'center',
  },
  rsAction: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  nsContainer: {
    flexDirection: 'row',
  },
  nsTxt: {
    marginVertical: hp(2),
    fontSize: hp(2.6),
    justifyContent: 'center',
    marginLeft: wp(10),
  },
  topTabContainer: {alignItems: 'center', marginBottom: hp(5)},
  icon: {
    width: wp(10),
    height: hp(5),
  },
  dltBtn: {
    marginRight: wp(4),
  },
  saveBtn: {
    marginLeft: wp(4),
  },
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  drawerIcon: {
    tintColor: 'gray',
    width: wp(10),
    height: hp(5),
    left: wp(2),
    top: hp(1.8),
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#f3b232',
    height: 30,
    shadowOpacity: 0.2,
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 20,
    shadowOffset: {
      width: -2,
      height: 4,
    },
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
});
