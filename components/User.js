import { View, Pressable, Text, StyleSheet, Alert, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const User = (props) => {
    // console.log(props)
    return (
        <View style={styles.container} >
            <Pressable onPress={() => Alert.alert('ICON')}>
                <Image
                style={styles.logo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </Pressable>
            <Pressable style={styles.button} onPress={() => Alert.alert(props.pseudo)}>
                <Text style={styles.text}>{props.pseudo}</Text>
            </Pressable>
            
            <MaterialCommunityIcons 
                style={styles.icon}
                name={ props.addFriendIcon ? "account-plus" : "map-marker" }
                size={26}
                onPress={() => Alert.alert(props.uid)}/>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#dee0e5',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#93a3af',
        paddingVertical: 10,
        marginHorizontal: 16,
        marginVertical: 4
    },
    button: {
        maxWidth: 270,
        maxHeight: 50,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
    },
    logo: {
        width: 50,
        height: 50,
        marginHorizontal: 15,
        borderRadius: 50,
    },
    icon:{
        marginHorizontal: 15
    }
})

export default User;