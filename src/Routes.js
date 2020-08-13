import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { View, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';

import { AuthContext } from './AuthProvider';

import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

export const Routes = ({ }) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //check if user is logged in or not
    AsyncStorage.getItem('user').then(userString => {
      console.log(userString)
      if (userString) {
        login();
      }
      setLoading(false);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user ? (
        <AppTabs />
      ) : (
         <AuthStack />
        )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})