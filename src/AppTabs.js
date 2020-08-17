import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from 'react-native-elements';
import { HomeStack } from './HomeStack';
import { SearchStack } from './SearchStack';


const Tabs = createBottomTabNavigator()

export const AppTabs = ({ }) => {
  return (
    <Tabs.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Icon type="feather" name="home" color={color} />;
          } else if (route.name === 'Search') {
            return <Icon type="feather" name="search" color={color} />;
          }
          // You can return any component that you like here!
          //return <Icon type="feather" name="search" />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        alignItems: "center",
        justifyContent: "center",

      }}
    >
      <Tabs.Screen name='Home' component={HomeStack} />
      <Tabs.Screen name='Search' component={SearchStack} />
    </Tabs.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})