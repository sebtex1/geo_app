import React from "react";
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@rneui/base';
import accountHelper from "../static/accountHelper";

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Button title="Log out" onPress={() => accountHelper.SignOut()}/>
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