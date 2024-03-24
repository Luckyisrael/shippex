import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Scan = () => {
  return (
    <View style={styles.container}>
      <Text>Scan</Text>
    </View>
  )
}

export default Scan

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})