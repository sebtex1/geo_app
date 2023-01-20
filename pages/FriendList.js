import { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    FlatList, 
} from 'react-native';
import User from '../components/User';
import UserHelper from '../static/UserHelper'
import SearchBar from '../components/SearchBar';
import { auth } from '../config/FirebaseConfig'

const FriendList = ({navigation}) => {
    const [searchText, setSearchText] = useState('')
    const [users, setUsers] = useState(null)
    const [friends, setFriends] = useState(null)
    const [friendsList, setFriendsList] = useState(null)

    useEffect(() => {
        if (users == null){
            UserHelper.get(setUsers) 
        } 
        else{
            //Get my object
            const me = Object.values(users).filter((item, index) => Object.keys(users)[index] == auth.currentUser.uid)
            //Get my friends uid
            const myFriendsId = me.map(y => y.friends)[0]
            //Get my friends objects in the user list
            const myFriendsList = Object.values(users)
                .map((item, t) => {return {...item, key: Object.keys(users)[t]}})
                .filter((item, index) => myFriendsId.find(i => i == Object.keys(users)[index]))
            
            setFriends(myFriendsList)
            setFriendsList(myFriendsList)
        }

    }, [users]);

    useEffect(() => {
        //Filter results with the search bar
        if(friends != null){
            setFriendsList(Object.values(friends).filter(item => item.pseudo.includes(searchText)))
        }
        else{
            setFriendsList(friends)
        }
    }, [searchText]);
    return (
        <SearchBar 
            searchText={searchText} 
            setSearchText={setSearchText} 
            addFriendIcon={true}
            navigation={navigation} 
            friendsList={friends != null ? Object.values(users).filter((item, index) => Object.keys(users)[index] == auth.currentUser.uid).map(y => y.friends)[0] : null}>
            <FlatList
                style={styles.flatList}
                data={friendsList}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => {
                    return (<User uid={item.key} pseudo={item?.pseudo} addFriendIcon={false} />)
                }}/>
        </SearchBar>
    );
};

const styles = StyleSheet.create({
    flatList: {
        marginTop: 5,
        marginBottom: 65,
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 10,
    }
})

export default FriendList;
