import React, { useContext, useRef, useState, useEffect } from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { AuthContext } from './AuthProvider';
import faker from 'faker'

const Stack = createStackNavigator()

function Feed({ navigation, route }) {
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        renderItem={({ item }) => {
          return (
            <Button color="lightgrey" title={item} onPress={() => {
              //clicking on this button navigates you to a different a product scree
              // with the name of that porduct
              navigation.navigate("Product", {
                name: item
              })
            }} />
          )
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
      <Text>Feed</Text>
    </View>
  )
}

function Product({ route, navigation }) {
  //this gives you the name of the product when the button in Feed is clicked
  console.log(route.params)
  return (
    <View style={styles.container}>
      <Text>{route.params.name}
      </Text>
      <Button
        title="Edit This Product"
        onPress={() => (
          console.log(route.params),
          navigation.navigate("EditProduct", {
            name: route.params.name
          })
        )}
      />
    </View>
  )
}

function apiCall(x) {
  return x
}

function EditProduct({ route, navigation }) {
  const [formState] = useState()
  const submit = useRef(() => { });

  submit.current = () => {
    apiCall(formState)
    navigation.goBack()
  }

  useEffect(() => {
    navigation.setParams({ submit });
  }, [])

  return (
    <View style={styles.container}>
      <Text>Editing {route.params.name}...</Text>
    </View>
  )
}

export const HomeStack = () => {
  const { logout } = useContext(AuthContext)

  return (
    <Stack.Navigator initialRouteName="Feed" screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="Product" component={Product} options={({ route }) => ({
        headerTitle: `Product: ${route.params.name}`
      })} />
      <Stack.Screen name="EditProduct" component={EditProduct} options={({ route }) => ({
        headerTitle: `Edit: ${route.params.name}`,
        headerRight: () => (
          <TouchableOpacity style={{ paddingRight: 8 }}
            onPress={() => {
              if (route.params.submit) {
                route.params.submit.current()
              }
            }}
          >
            <Text style={{ color: 'red' }}>Done</Text>
          </TouchableOpacity>
        )
      })} />
      <Stack.Screen name="Feed" component={Feed} options={{
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => { logout(); }}>
              <Text>Logout</Text>
            </TouchableOpacity>
          )
        }
      }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});