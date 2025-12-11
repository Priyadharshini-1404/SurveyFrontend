import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function UsersList({ navigation }) {
  const { user, authHeaders } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`, authHeaders());
      setUsers(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(()=>{ fetchUsers(); }, []);

  const promote = async (id) => {
    try {
      await axios.put(`${API_URL}/users/role/${id}`, { role: 'admin' }, authHeaders());
      fetchUsers();
    } catch (err) { console.log(err); }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`, authHeaders());
      fetchUsers();
    } catch (err) { console.log(err); }
  };

  return (
    <SafeAreaView style={{flex:1,padding:16}}>
      <Button title="Add User" onPress={()=>navigation.navigate('AddUser')} />
      <FlatList data={users} keyExtractor={i=>i.id.toString()}
        renderItem={({item})=>(
          <View style={{padding:12, borderBottomWidth:1, borderColor:'#eee'}}>
            <Text>{item.name} — {item.email}</Text>
            <Text>Role: {item.role}</Text>
            <View style={{flexDirection:'row', marginTop:8}}>
              {item.role !== 'admin' && <TouchableOpacity onPress={()=>promote(item.id)} style={{marginRight:10}}>
                <Text style={{color:'blue'}}>Promote to Admin</Text>
              </TouchableOpacity>}
              <TouchableOpacity onPress={()=>remove(item.id)}>
                <Text style={{color:'red'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )} />
    </SafeAreaView>
  );
}
