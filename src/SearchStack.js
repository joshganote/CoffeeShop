import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { FlatList } from 'react-native-gesture-handler';
import faker from 'faker'

const Stack = createStackNavigator()

function Search({navigation}) {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <Button title="Search Products" onPress={() => {
        setShow(true)
      }} />
      {show ? <FlatList
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
      /> : null}
    </View>
  )
}

export const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="Search" component={Search} />
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