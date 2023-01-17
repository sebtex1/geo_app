import React from "react";
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@rneui/base';
import AccountHelper from "../static/AccountHelper";

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Button title="Log out" onPress={() => AccountHelper.SignOut()}/>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Home
