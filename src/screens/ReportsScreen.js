import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { calculateAgeData, calculateLocalityData, getLocalityChart, getAgeChart, calculateProfessionData, getProfessionChart } from "../utils/ChartsUtils";
import { MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { ScrollView } from "react-native-gesture-handler";

class ReportsScreen extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            ageRangeData: [],
            localityData: {},
            guestsCountData: {},
            professionData: {}
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.fetchRegistrations();
    }

    fetchRegistrations() {
        var that = this;
        firebase.database().ref("registrations").on('value', function (snapshot) {
            var registrations = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                registrations.push(childData);
            });
            that.calculateData(registrations)
        });
    }

    calculateData(registrations) {
        this.setState({
            ageRangeData: calculateAgeData(registrations),
            localityData: calculateLocalityData(registrations),
            professionData: calculateProfessionData(registrations),
            isLoading: false
        })
    }

    render() {
        return (
            <View style={styles.container} >
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
                    <View style={{ flex: 1, justifyContent: 'center', marginStart: 20 }}>
                        <Text style={styles.header_title}>Reports</Text>
                    </View>
                </View>
                {(!this.state.isLoading) ?
                    <ScrollView style={{ paddingBottom: 50 }}>
                        <Text style={styles.label_style}>What are the age groups for the guests:</Text>
                        {getAgeChart(this.state.ageRangeData)}
                        <Text style={styles.label_style}>Where are the guests coming from:</Text>
                        {getLocalityChart(this.state.localityData)}
                        <Text style={styles.label_style}>How many guests are employed or studying:</Text>
                        {getProfessionChart(this.state.professionData)}
                    </ScrollView>
                    : null}
            </View>
        );
    }
}
export default ReportsScreen;

const styles = StyleSheet.create({
    loader_style: {
        backgroundColor: '#00000035',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        elevation: 1000
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        height: 100,
        backgroundColor: 'green',
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    header_title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    label_style: {
        fontSize: 16,
        marginTop: 20,
    }
});