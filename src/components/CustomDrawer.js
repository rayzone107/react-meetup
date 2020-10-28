import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView
} from "react-native";
import { DrawerItems } from 'react-navigation-drawer'
import { FontAwesome } from '@expo/vector-icons';

class CustomDrawer extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView style={{ backgroundColor: "green" }} />
                <View style={styles.container}>
                    <FontAwesome name="meetup" size={100} color="white" />
                    <Text style={styles.labelStyle}>React Meetup</Text>
                </View>
                <DrawerItems {...this.props} />
            </ScrollView>
        );
    }
}
export default CustomDrawer;

const styles = StyleSheet.create({
    container: {
        height: 200,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelStyle: {
        fontSize: 20,
        marginTop: 20,
        color: 'white'
    }
});