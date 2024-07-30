import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';


export function CadastroUsuario({ navigation }) {
 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const Cadastrar = () =>{
    var userObj = {nome:nome, email: email, senha:senha};
    var jsonBody = JSON.stringify(userObj);
      console.log(jsonBody);
      fetch('https://api-mysql.glitch.me/usuarios', {
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
      navigation.goBack();
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
        onChangeText={(event) => setNome(event)}
      />
      <TextInput
        style={styles.input}
        onChangeText={(event) => setEmail(event)}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(event) => setSenha(event)}
        placeholder="Senha"
      />

      <TouchableOpacity>
      <Text style={styles.botao} onPress={Cadastrar} > Cadastrar </Text>
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
   botao: {
    height: 40,
    margin: 12,
    color: 'blue',
  },
});
