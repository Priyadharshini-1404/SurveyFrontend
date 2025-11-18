import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/hooks/useAuth";
import { StaffProvider } from "./src/hooks/useStaff"; // ✅ import StaffProvider
import RootNavigation from "./src/navigations/RootNavigation";

export default function App() {
  return (
    <AuthProvider>
      <StaffProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </StaffProvider>
    </AuthProvider>
  );
}
