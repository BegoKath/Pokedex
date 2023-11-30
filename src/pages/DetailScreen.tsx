import {RouteProp, useNavigation} from '@react-navigation/native';
import {Button, Card, Icon} from '@rneui/themed';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {usePokemon} from '../hooks/usePokemon';
import {IPokeDetail} from '../interfaces/IPokeDetail';
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;
type ProfileListScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileListScreenRouteProp;
};
function DetailScreen({navigation, route}: Props) {
  const [data, setData] = useState<IPokeDetail>({
    weight: 0,
    types: [],
    abilities: [],
    moves: [],
    sprites:[]
  });
  const [loading, setLoading]=useState(false);
  const itemId = route.params.id;
  const name = route.params.name;
  const isDarkMode = useColorScheme() === 'dark';
  const {getDetailPokemon} = usePokemon();
  const colorType = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  const colorAbilities = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  const colorMove = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  const result = async () => {
    const data1 = await getDetailPokemon(itemId);
    setData(data1);
    setLoading(true);
  };
  useEffect(() => {
    result();
    
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? Colors.darker : '#AFCCFC',
        flex: 1,
        justifyContent: 'center',
      }}>
      {loading?
      <Card
        containerStyle={[
          styles.card,
          {backgroundColor: isDarkMode ? Colors.darker : '#fff'},
        ]}>
        
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems:'center',
            marginBottom: 10,
          }}>
            <Text
            style={{
              fontSize: 20,   
              fontFamily: 'RubikMonoOne-Regular',           
              color: isDarkMode ? '#fff' : Colors.darker,padding:20
            }}>
            {"Nº"+itemId}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'RubikMonoOne-Regular',
              color: isDarkMode ? '#AFCCFC' : Colors.darker,
            }}>
            {name}
          </Text>
          </View>
        
        
        <Card.Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
                itemId +
                '.png',
            }}
            style={styles.profileImg}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              marginHorizontal: 10,
            }}>
            <Text
              style={[
                styles.titleCard,
                {color: isDarkMode ? '#AFCCFC' : Colors.darker},
              ]}>
              Peso:
            </Text>
            <Text
              style={{                
                marginLeft:10,
                fontSize: 13,
                fontFamily: 'NovaMono-Regular',
                color: isDarkMode ? '#AFCCFC' : Colors.darker,
              }}>
              {(data?.weight * 0.1 ).toFixed(2)+ ' Kg'}
            </Text>
           
          </View>
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              marginHorizontal: 10,
            }}>
               <Text
              style={[
                styles.titleCard,
                {color: isDarkMode ? '#AFCCFC' : Colors.darker},
              ]}>
              Tipo:
            </Text>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              {data.types.map((e, index) => (
                <Text
                  key={e + index}
                  style={[styles.type,{color:colorType}]}>
                  {e}
                </Text>
              ))}
            </View>
            <Text
              style={[
                styles.titleCard,
                {color: isDarkMode ? '#AFCCFC' : Colors.darker},
              ]}>
              Habilidades:
            </Text>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              {data.abilities.map((e, index) => (
                <Text key={e + index} style={[styles.type,{color:colorAbilities}]}>
                  {e}
                </Text>
              ))}
            </View>
          </View>
          <Text
            style={[
              styles.titleCard,
              {color: isDarkMode ? '#AFCCFC' : Colors.darker},
            ]}>
            Movimientos:
          </Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <FlatList
              scrollEnabled={true}
              data={data.moves}
              horizontal
              renderItem={({item, index}) => (
                <Text key={item + index} style={[styles.type,{marginRight:5,color: colorMove}]}>
                  {item}
                </Text>
              )}
              keyExtractor={item => item}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <FlatList
              scrollEnabled={true}
              data={data.sprites}
              horizontal
              renderItem={({item, index}) => (
                <Image
                key={index+"image"}
                source={{
                  uri:
                    item,
                }}
                style={styles.profileImg}
                />
              )}
              keyExtractor={item => item}
            />
          </View>
        </View>
        
        <Button
          buttonStyle={{
            backgroundColor: '#76A8F9',
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => navigation.goBack()}
          title="ATRAS"
        />
      </Card>:<><Text style={{textAlign:'center',fontSize: 20,   
              fontFamily: 'RubikMonoOne-Regular',           
              color: isDarkMode ? '#fff' : Colors.darker,padding:20}}>Cargando...</Text></>}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    minHeight: ' 50%',
    margin: 20,
    borderRadius: 30,
  },

  profileImg: {
    height: 150,
    width: 150,
    borderRadius: 40,
  },
  titleCard: {marginBottom: 10, fontSize: 13, fontWeight: 'bold'},
  type: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    padding: 3,
    fontSize: 13,
    fontFamily: 'NovaMono-Regular',    
  },
});
export default DetailScreen;

