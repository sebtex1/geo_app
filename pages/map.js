import { View } from 'react-native';
import { Text } from '@rneui/base';

const Map = ({navigation, route}) => {
    return (
      <View>
        <Text>Map {route.params.name}</Text>
      </View>
    );
  };

export default Map