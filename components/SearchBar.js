import { 
    SafeAreaView, 
    StyleSheet, 
    View,
    Alert, 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar } from "react-native-elements";

const Friends = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <SearchBar
                    containerStyle={styles.searchBar}
                    placeholder="Rechercher..."
                    lightTheme
                    round
                    value={props.searchText}
                    onChangeText={(text) => {props.setSearchText(text)}}
                    />
                { props.addFriendIcon ? <MaterialCommunityIcons 
                    style={styles.icon}
                    name="account-plus" 
                    size={35} 
                    onPress={() => { props.navigation.navigate('UserList', { friendsList: props.friendsList}) }}/>
                : null
                }
            </View>
            {props.children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0B221',
        paddingVertical: 8,
        flex: 1,
        flexBasis: 10,
        flexShrink: 0,
        flexGrow: 1,
    },
    searchBar:{
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 1,
        flexGrow: 9,
        backgroundColor: '#F0B221',
        borderColor: '#fff', 
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    icon: {
        flex: 1,
        flexBasis: 10,
        flexShrink: 1,
        flexGrow: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    }
})

export default Friends;