import { SearchBar } from "react-native-elements";

const SearchBarCustom = (props) => {
    return (
        <>
            <SearchBar
                placeholder="Rechercher..."
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
