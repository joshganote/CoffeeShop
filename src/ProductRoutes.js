import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity, View, Button, Text } from "react-native"


function Product({ route, navigation }) {
  //this gives you the name of the product when the button in Feed is clicked
  console.log(route.params)
  return (
    <View style={styles.container}>
      <Text>{route.params.name}
      </Text>
      <Button
        title="Edit This Product"
        onPress={() =>
          navigation.navigate("EditProduct", {
            name: route.params.name
          })
        }
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

export const ProductRoutes = (Stack) => {
  <>
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
  </>
}