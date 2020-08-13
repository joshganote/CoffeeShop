import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AuthContext } from './AuthProvider';

const Tabs = createBottomTabNavigator()

function Home() {
  const { logout } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  )
}

function Search() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})

export const AppTabs = ({ }) => {
  return (
    <Tabs.Navigator tabBarOptions={
      {
        tabStyle: {

        },
        labelStyle: {
          fontSize: 15,
          alignItems: "center",
          justifyContent: "center",
          flex: .70
        }
      }
    }
    >
      <Tabs.Screen name='Home' component={Home} />
      <Tabs.Screen name='Search' component={Search} />
    </Tabs.Navigator>
  )
}