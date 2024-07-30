import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';


export function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificarLogin = ()=>{
    console.log("Verificando Login")
    var userObj = {email: email, senha:senha};
    var jsonBody = JSON.stringify(userObj);
        
        fetch('https://api-mysql.glitch.me/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonBody,
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if(json.menssagem=='sucesso!')
          navigation.navigate('AtualizaUsuario')
        
      })
        .catch((err) => {
          console.log(err);
        });
  }
  
  
  return (
    <View>
      <TextInput
        style={styles.input}
       placeholder="Nome"
       onChangeText={(event) => setEmail(event)}
      />
      <TextInput
        style={styles.input}
        
        placeholder="Senha"
        onChangeText={(event) => setSenha(event)}
        
      />

       <TouchableOpacity
            onPress={() => {navigation.navigate('CadastroUsuario', {})}}>
            <Text>Registrar agora!</Text>
       </TouchableOpacity>
        <TouchableOpacity
            onPress={verificarLogin}>
            <Text>Logar</Text>
       </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
