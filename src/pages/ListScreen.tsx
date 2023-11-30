import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {useEffect, useState} from 'react';
import {usePokemon} from '../hooks/usePokemon';
import {IPokeInfo} from '../interfaces/IPokeInfo';
import type {NativeScrollEvent} from 'react-native';
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
function handleInfinityScroll({
  layoutMeasurement,
  contentSize,
  contentOffset,
}: NativeScrollEvent) {
  let mHeight = layoutMeasurement.height;
  let cSize = contentSize.height;
  let Y = contentOffset.y;
  if (Math.ceil(mHeight + Y) >= cSize) return true;
  return false;
}

type ItemProps = {
  title: string;
  id: string;
  theme: boolean;
  navigation: ProfileScreenNavigationProp;
};

const Item = ({title, id, theme, navigation}: ItemProps) => {
  return (
    <View style={styles.item} key={title + 'view'}>
      <Text
        style={[styles.id, {color: theme ? '#AFCCFC' : Colors.darker}]}
        key={title + ' id'}>
        {id}
      </Text>
      <TouchableHighlight
        key={title + 'toychable'}
        touchSoundDisabled
        onPress={() => navigation.navigate('Detail', {id: id, name: title})}
        style={[
          styles.profileImgContainer,
          {
            borderColor: '#3C7BF5',
            borderWidth: 0.5,
            backgroundColor: theme ? '#AFCCFC' : '#DDF7F6',
          },
        ]}>
        <Image
          key={title + 'img'}
          source={{
            uri:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
              id +
              '.png',
          }}
          style={styles.profileImg}
        />
      </TouchableHighlight>
      <Text key={title + 'name'} style={styles.name}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </Text>
    </View>
  );
};
const Title = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Pokedex</Text>
  </View>
);

function ListScreen({navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const {getPokemon} = usePokemon();
  const [data, setData] = useState<IPokeInfo[]>([]);
  const [index, setIndex] = useState(0);
  const result = async () => {
    const data1 = await getPokemon(index);
    setData(data.concat(data1));
  };
  useEffect(() => {
    result();
  }, [index]);
  return (
    <SafeAreaView
      style={{backgroundColor: isDarkMode ? Colors.darker : '#AFCCFC'}}>
      <FlatList
        scrollEnabled={true}
        data={data}
        ListHeaderComponent={() => <Title />}
        renderItem={({item, index}) => (
          <Item
            key={index + 'item'}
            title={item.name}
            id={(index + 1).toString()}
            theme={isDarkMode}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.name}
        onScroll={({nativeEvent}) => {
          if (handleInfinityScroll(nativeEvent)) {
            setIndex(index + 1);
          }
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 50,
  },
  item: {
    ///backgroundColor: '#f9c2ff',
    padding: 20,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  name: {
    fontSize: 25,
    fontFamily: 'NovaMono-Regular',
    color: '#fff',
  },
  id: {
    fontSize: 20,
    fontFamily: 'NovaMono-Regular',
  },
  title: {
    fontSize: 50,
    fontFamily: 'RubikMonoOne-Regular',
    color: '#fff',
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 90,
    width: 90,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});

export default ListScreen;
