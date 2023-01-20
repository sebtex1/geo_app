import { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    FlatList, 
} from 'react-native';
import User from '../components/User';
import userHelper from '../static/userHelper'
import SearchBar from '../components/SearchBar';
import { getAuth } from "firebase/auth";

const UserList = ({ route }) => {
    const auth = getAuth();
    const [value, setValue] = useState('')
    const [users, setUsers] = useState(null)
    const [addFriends, setAddFriends] = useState(null)
    const [addFriendsList, setAddFriendsList] = useState(null)

    useEffect(() => {
        if (users == null){
            userHelper.get(setUsers) 
        } 
        else {
            const notFriendsUser = Object.values(users)
            .map((item, index) => {return {...item, key: Object.keys(users)[index]}})
            .filter((item, index) => Object.keys(users)[index] != auth.currentUser.uid && !route.params.friendsList.find(i => i == Object.keys(users)[index]))
            setAddFriends(notFriendsUser)
            setAddFriendsList(notFriendsUser)
        }
    }, [users]);

    useEffect(() => {
        if(addFriends != null){
            setAddFriendsList(Object.values(addFriends).filter(item => item.pseudo.includes(value)))
        }
        else{
            setAddFriendsList(addFriends)
        }
    }, [value]);
    
    return (
        <SearchBar 
            searchText={value} 
            setSearchText={setValue} 
            addFriendIcon={false}>
            <FlatList
                style={styles.flatList}
                data={addFriendsList}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => {
                    return (<User uid={item.key} pseudo={item?.pseudo} addFriendIcon={true}/>)}}
                />
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

export default UserList;