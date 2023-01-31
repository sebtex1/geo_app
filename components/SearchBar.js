import { SearchBar } from "react-native-elements";
import searchBarStyle from '../styles/SearchBarStyle'

const SearchBarCustom = (props) => {
    return (
        <>
            <SearchBar
                placeholder="Rechercher..."
                inputStyle={[searchBarStyle.backgroundColor, searchBarStyle.textColor]}
                inputContainerStyle={searchBarStyle.backgroundColor}
                containerStyle={[searchBarStyle.backgroundColor, searchBarStyle.containerStyle]}
                searchIcon={searchBarStyle.icon}
                cancelIcon={searchBarStyle.icon}
                lightTheme
                round
                value={props.searchText}
                onChangeText={(text) => {
                    props.setSearchText(text);
                }}
            />
        </>
    );
};

export default SearchBarCustom;
