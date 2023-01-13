import { View, Pressable, Text, StyleSheet, Alert, Image } from 'react-native';

const Friend = ({lastName, firstName}) => {
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
            <Pressable style={styles.button} onPress={() => Alert.alert(lastName + ' ' + firstName)}>
                <Text style={styles.text}>{lastName} {firstName}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#dee0e5',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#93a3af',
        paddingVertical: 10,
        marginHorizontal: 16,
        marginVertical: 4
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 270,
        maxHeight: 50,
        paddingVertical: 10,
        paddingRight: 15
    },
    text: {
        fontSize: 18,
    },
    logo: {
        width: 50,
        height: 50,
        marginHorizontal: 15,
        borderRadius: 50
    }
})

export default Friend;