import * as React from 'react';
import { View, Text, Image, useColorScheme, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './src/pages/ListScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DetailScreen from './src/pages/DetailScreen';


export type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Detail: { id: string , name:string}; 
};


const Stack = createStackNavigator<RootStackParamList>();
const arr = [1, 2, 3, 4, 5, 6];

const ActionBarImage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Logo = arr.map(el => {
    const img = el + ".png";
    return (<Image key={el}
      source={{
        uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + img,
      }}
      style={{
        width: 50,
        height: 50,
        borderRadius: 40 / 2,
        marginLeft: 15,
      }}
    />);
  });

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: isDarkMode ? Colors.darker : '#AFCCFC' }}>
      {Logo}
    </View>
  );
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ListScreen} options={{
          header: () => <ActionBarImage />,
        }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{
          header: () =>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: isDarkMode ? Colors.darker : '#AFCCFC', borderBottomColor: "#fff", borderBottomWidth: 1 }}>
              <Text style={{
                fontSize: 30,
                fontFamily: 'NovaMono-Regular',
                color: isDarkMode ?  '#AFCCFC':Colors.darker 
              }}>Detalle</Text>
            </View>
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
