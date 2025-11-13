import React, {useState,useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios';

export default function Profile() {
  const { user, authHeaders, logout } = useAuth();
  const [me, setMe] = useState(null);

  useEffect(()=> {
    (async ()=>{
      // either use stored user or call backend to get up-to-date data
      setMe(user);
    })();
  }, [user]);

  if (!me) return null;
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>{me.name}</Text>
      <Text>{me.email}</Text>
      <Text>Role: {me.role}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
