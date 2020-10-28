import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';

const CustomSearchBar = ({ term, onTermChange, onTermSubmit }) => {
    return (
        <View style={styles.background}>
            <Octicons name="search" size={24} color="black" />
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.searchTextStyle}
                placeholder="Search"
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F0EEEE',
        height: 50,
        marginHorizontal: 15,
        marginVertical: 10,
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchTextStyle: {
        marginHorizontal: 20,
        fontSize: 20,
        flex: 1
    }
});

export default CustomSearchBar;
