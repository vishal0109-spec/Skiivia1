import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import moment, {Moment} from 'moment';
import {useNavigation} from '@react-navigation/native';

//user-define imports
import Button from '../../../Components/CustomButton';
import {chat, drawer, heart, send, user} from '../../../Utils/img';
import LoaderScreen from '../../LoaderScreen';

interface PostData {
  name: string;
  timestamp: Moment;
  image: string;
  description: string;
}

const Home = () => {
  const navigation = useNavigation<any>();
  const [postData, setPostData] = useState<PostData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      console.log('Fetching data for page:', page);
      const pageSize = 5;
      const postsRef = firestore().collection('posts');
      const query = postsRef
        .orderBy('timestamp', 'desc')
        .limit(pageSize * page);

      const querySnapshot = await query.get();

      const totalPosts = await postsRef.get().then(snapshot => snapshot.size);
      const totalPages = Math.ceil(totalPosts / pageSize);
      console.log('Total pages:', totalPages);

      const newPostData = querySnapshot.docs.map(doc => {
        const data = doc.data() as PostData;
        return {
          name: data.name,
          timestamp: moment(data.timestamp.toDate()),
          image: data.image,
          description: data.description,
        };
      });

      setPostData(newPostData);

      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (timestamp: Moment) => {
    return timestamp.fromNow();
  };

  const handleLoadMore = async () => {
    if (page < totalPages && !loading) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
      await getData();
    }
  };

  const debounceLoadMore = () => {
    const timer = setTimeout(handleLoadMore, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.topBarContainer}>
        <Button
          icon={drawer}
          iconStyle={Styles.drawerIcon}
          onPress={() => navigation.openDrawer()}
        />
        <Text style={Styles.homeTxt}>Home</Text>
      </View>

      {postData.length > 0 ? (
        <FlatList
          style={Styles.container}
          showsVerticalScrollIndicator={false}
          data={postData}
          renderItem={({item, index}: any) => {
            return (
              <View key={index} style={Styles.postContainer}>
                <View style={Styles.userContainer}>
                  <Image source={user} style={Styles.icon} />
                  <View style={Styles.userInfoContainer}>
                    <Text>{item?.name}</Text>
                    <Text>{getTimeAgo(item?.timestamp)}</Text>
                  </View>
                </View>
                <Image
                  source={{uri: item?.image}}
                  style={Styles.imgContainer}
                />
                <View style={Styles.btnsContainer}>
                  <Image source={heart} style={Styles.icon2} />
                  <Image source={chat} style={Styles.icon2} />
                  <Image source={send} style={Styles.icon2} />
                </View>

                <Text style={{margin: wp(5.6)}}>{item.description}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={debounceLoadMore}
          ListFooterComponent={() =>
            loading && (
              <View style={{height: hp(10)}}>
                <LoaderScreen />
              </View>
            )
          }
          onEndReachedThreshold={0.5}
        />
      ) : (
        <View style={Styles.noPostContainer}>
          <Text>No Post Found</Text>
        </View>
      )}
    </View>
  );
};
export default Home;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noPostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarContainer: {
    width: wp(100),
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: hp(1),
    paddingBottom: hp(1.8),
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginLeft: wp(2),
  },
  postContainer: {
    width: wp(90),
    alignSelf: 'center',
    marginTop: hp(3),
    backgroundColor: '#fff',
    borderRadius: wp(5),
  },
  imgContainer: {
    width: wp(80),
    height: hp(50),
    alignSelf: 'center',
    borderRadius: hp(1.8),
    marginTop: hp(2),
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
  },
  userInfoContainer: {
    marginLeft: wp(4),
  },
  homeTxt: {
    fontSize: hp(2.6),
    color: '#000',
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: hp(1.5),
    marginLeft: wp(3),
  },
  drawerIcon: {
    tintColor: 'gray',
    width: wp(10),
    height: hp(5),
    left: wp(2),
    top: hp(1),
    resizeMode: 'cover',
  },
  icon: {
    width: wp(10),
    height: hp(5),
    left: wp(2.5),
    top: hp(0.5),
    bottom: hp(1),
    resizeMode: 'cover',
  },
  icon2: {
    width: wp(6),
    height: hp(3),
    marginLeft: wp(5),
    top: hp(1),
    resizeMode: 'cover',
  },
});
