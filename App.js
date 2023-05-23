import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";

/* 
Contents: 
> Expo 
> React-Native Elements 
> Firebase (authentication & database)
*/

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
