import { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from "react-native-elements";
import Friend from '../components/friend';

const FriendList = () => {
    const [value, setValue] = useState()
    
    return (
        <View>
            <SearchBar
                placeholder="Search Here..."
                lightTheme
                round
                value={value}
                onChangeText={(text) => {
                    setValue(text)
                    console.log(text)
                }}
                />
                <FlatList
                    style={styles.container}
                    data={friends}
                    renderItem={({item}) => <Friend lastName={item.lastName} firstName={item.firstName} />}
                    keyExtractor={item => item.id}
                    />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 65
    }
})

const friends = [
    {
        id: '1',
        lastName: 'Coujandassamy',
        firstName: 'Olivier',
    },
    {
        id: '2',
        lastName: 'Texier',
        firstName: 'Sébastien',
    },
    {
        id: '3',
        lastName: 'Strohl',
        firstName: 'Lucas',
    },
    {
        id: '4',
        lastName: 'Coujandassamy',
        firstName: 'Olivier',
    },
    {
        id: '5',
        lastName: 'Texier',
        firstName: 'Sébastien',
    },
    {
        id: '6',
        lastName: 'Strohl',
        firstName: 'Lucas',
    },
    {
        id: '7',
        lastName: 'Coujandassamy',
        firstName: 'Olivier',
    },
    {
        id: '8',
        lastName: 'Texier',
        firstName: 'Sébastien',
    },
    {
        id: '9',
        lastName: 'Strohl',
        firstName: 'Lucas',
    },
    {
        id: '10',
        lastName: 'Coujandassamy',
        firstName: 'Olivier',
    },
    {
        id: '11',
        lastName: 'Texier',
        firstName: 'Sébastien',
    },
    {
        id: '12',
        lastName: 'Strohl',
        firstName: 'Lucas',
    },
    {
        id: '13',
        lastName: 'Coujandassamy',
        firstName: 'Olivier',
    },
    {
        id: '14',
        lastName: 'Texier',
        firstName: 'Sébastien',
    },
    {
        id: '15',
        lastName: 'Strohl',
        firstName: 'Lucas',
    },
];

export default FriendList;