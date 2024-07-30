import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';


export function AtualizaUsuario({ navigation }) {
 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const idUsuario=118;  

  useEffect(() => {
    async function fetchItem() {
        fetch('https://api-mysql.glitch.me/usuarios/'+idUsuario,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          setNome(resJson[0].usu_nome);
          setEmail(resJson[0].usu_email);
        })
        .catch(e => console.log(e));

  }
      fetchItem();
    }, []);


  const Atualizar = () =>{
    var userObj = {nome:nome, email: email, senha:senha};
    var jsonBody = JSON.stringify(userObj);
      console.log(jsonBody);
    
      fetch('https://api-mysql.glitch.me/usuarios/'+idUsuario, {
      method: 'PUT',
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

  const Deletar = () =>{
      fetch('https://api-mysql.glitch.me/usuarios/'+idUsuario, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
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
        value={nome}
        onChangeText={(event) => setNome(event)}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(event) => setEmail(event)}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(event) => setSenha(event)}
        placeholder="Senha"
      />

      <TouchableOpacity>
      <Text style={styles.botao} onPress={Atualizar} > Atualizar </Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={styles.botao} onPress={Deletar} > Deletar </Text>
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
    margin: 12,
    color: 'blue',
  },
});
