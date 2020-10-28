import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class DetailScreen extends Component {
    render() {
        const item = this.props.navigation.state.params.item;
        console.log(item.name);
        return (
            <View style={styles.container}>
                <Text style={styles.name_style}>{item.name}</Text>
                <View style={styles.row_style}>
                    <Text style={styles.label_style}>Locality: </Text>
                    <Text style={styles.desc_style}>{item.locality}</Text>
                </View>
                <View style={styles.row_style}>
                    <Text style={styles.label_style}>Date of Birth: </Text>
                    <Text style={styles.desc_style}>{item.dob}</Text>
                </View>
                <View style={styles.row_style}>
                    <Text style={styles.label_style}>Age: </Text>
                    <Text style={styles.desc_style}>{item.age} years old</Text>
                </View>
                <View style={styles.row_style}>
                    <Text style={styles.label_style}>Address: </Text>
                    <Text style={styles.desc_style}>{item.address}</Text>
                </View>
                <View style={styles.row_style}>
                    <Text style={styles.label_style}>Profession: </Text>
                    <Text style={styles.desc_style}>{item.profession}</Text>
                </View>
                <View style={styles.row_style}>
                    <Text style={styles.label_style}>Guests: </Text>
                    <Text style={styles.desc_style}>{item.guests}</Text>
                </View>
            </View>
        );
    }
}
export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    name_style: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 20,
        marginStart: 20,
        marginBottom: 20,
        alignSelf: 'center'
    },
    row_style: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    label_style: {
        fontSize: 20,
        marginStart: 20,
        flex: 2
    },
    desc_style: {
        fontSize: 25,
        fontWeight: '700',
        flex: 3
    },
});