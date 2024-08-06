import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {CadastroUsuario} from './CadastroUsuario'
import {AtualizaUsuario} from './AtualizaUsuario'
import {Login} from './Login'  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="AtualizaUsuario" component={AtualizaUsuario} />
       
       <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}