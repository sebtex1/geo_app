import { View } from 'react-native';
import { Input, Button } from '@rneui/base';

const Login = ({navigation}) => {
    return (
      <View>
        <Input placeholder='' label="Login"/>
        <Input placeholder='' label="Password"/>
        <Button
          title="Log"
          onPress={() =>
            navigation.navigate('Map', {name: 'MapPerso'})
          }
          />
      </View>
    );
  };

export default Login