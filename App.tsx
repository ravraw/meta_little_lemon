import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./navigators/BottomNavigator";
import { Text } from "react-native-paper";

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
  );
}