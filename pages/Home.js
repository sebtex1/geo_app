import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/base';

const Home = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
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