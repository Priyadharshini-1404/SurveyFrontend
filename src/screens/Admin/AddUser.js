import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios';

export default function AddUser({ navigation }) {
  const { authHeaders } = useAuth();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('user');

  const submit = async () => {
    try {
      await axios.post('http://192.168.1.7:5000/api/users/admin/add',
        { name, email, password, role }, authHeaders());
      Alert.alert('Added');
      navigation.goBack();
    } catch (err) { Alert.alert('Error', err.response?.data?.message || err.message); }
  };

  return (
    <View style={{padding:16}}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{borderWidth:1, marginBottom:8}} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{borderWidth:1, marginBottom:8}} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{borderWidth:1, marginBottom:8}} />
      <TextInput placeholder="role (admin/user)" value={role} onChangeText={setRole} style={{borderWidth:1, marginBottom:8}} />
      <Button title="Add" onPress={submit} />
    </View>
  );
}
