import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AdminDrawer from "./AdminDrawer";
import UserDrawer from "./UserDrawer";
import AuthStack from "./AuthStack"; // your login/register navigation
import { useAuth } from "../../hooks/useAuth";

export default function AppNavigator() {
  const { user } = useContext(AuthContext); // Example: user = { name, email, role: 'admin' }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />
      ) : user.role === "admin" ? (
        <AdminDrawer />
      ) : (
        <UserDrawer />
      )}
    </NavigationContainer>
  );
}
