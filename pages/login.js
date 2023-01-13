import { StyleSheet, View } from 'react-native';
import { Input, Button } from '@rneui/base';

const Login = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Input placeholder='' label="Login"/>
        <Input placeholder='' label="Password"/>
        <Button
          title="Log"
          onPress={() =>
            navigation.navigate('GeoApp')
          }
          />
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

export default Login