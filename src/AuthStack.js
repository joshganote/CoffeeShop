import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack"
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from './AuthProvider';


export const AuthStack = () => {

  const Stack = createStackNavigator();

function Login({ navigation }) {
  const { login } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text>I am a login screen</Text>
      <Button title="go to register" onPress={() => {
        navigation.navigate("Register")
      }} />
      <Button title="Log me in"
        onPress={() => {
          login();
        }}
      />
    </View>
  )
}

function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>I am a Register screen</Text>
      <Button title="go to Login" onPress={() => {
        navigation.navigate("Login")
      }} />
    </View>
  )
}
  
  return(
    <Stack.Navigator
    screenOptions={{ headerTitleAlign: 'center' }}
    // makes header center of page or takes header out of every route
    screenOptions={{
      header: () => null //or pass in custom component
    }}
    initialRouteName="Login">
    <Stack.Screen
      options={{ headerTitle: "Sign In" }}
      name="Login"
      component={Login}
    />
    <Stack.Screen

      // by default the name will get used on the app 
      // but can change that with options headerTitle
      options={{ headerTitle: "Sign Up" }}
      name="Register"
      component={Register}
    />
  </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});