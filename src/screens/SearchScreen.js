import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import * as firebase from 'firebase';
import CustomSearchBar from "../components/CustomSearchBar";
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";
import RegistrationTile from "../components/RegistrationTile";

class SearchScreen extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: false,
            term: '',
            registrationsList: [],
            filteredList: []
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        var that = this;
        firebase.database().ref("registrations").on('value', function (snapshot) {
            var registrations = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                registrations.push(childData)
            })
            that.setState({
                registrationsList: registrations,
                filteredList: registrations,
                isLoading: false
            })
        })
    }

    componentWillUnmount() {
        firebase.database().ref("registrations").off('value');
    }

    searchRegistrations(term) {
        if (term) {
            var updatedList = this.state.registrationsList.filter(function (item) {
                const name = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const locality = item.locality ? item.locality.toUpperCase() : ''.toUpperCase();
                const termData = term.toUpperCase();
                return name.indexOf(termData) > -1 || locality.indexOf(termData) > -1;
            })
            this.setState({
                term: term,
                filteredList: updatedList,
            })
        } else {
            this.setState({
                term: term,
                filteredList: this.state.registrationsList
            })
        }
    }

    onItemClick(item) {
        this.props.navigation.navigate('DetailScreen', { item });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View style={[StyleSheet.absoluteFill, styles.loader_style]}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                    : null}
                <View style={styles.header}>
                    <View style={{ justifyContent: 'center', marginStart: 10 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.openDrawer() }}>
                            <MaterialIcons name="menu" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomSearchBar
                            term={this.state.term}
                            onTermChange={newTerm => {
                                this.searchRegistrations(newTerm)
                            }}
                        />

                    </View>
                </View>
                <FlatList
                    data={this.state.filteredList}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 40 }}
                    renderItem={({ item }) => {
                        return <RegistrationTile person={item} onClick={() => this.onItemClick(item)} />
                    }}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No such registrations yet</Text>
                        </View>
                    }
                />
            </View>
        );
    }
}
export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'green',
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    loader_style: {
        backgroundColor: '#00000035',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        elevation: 1000
    },
});