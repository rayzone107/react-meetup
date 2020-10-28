
import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from 'react-native-shadow-cards';


const RegistrationTile = ({ person, onClick }) => (
    <Card
        elevation={2}
        style={styles.card_style}>
        <TouchableOpacity
            onPress={onClick}>
            <View style={styles.background_style}>
                <View style={styles.row1_style}>
                    <Text style={styles.name_style}>{person.name}</Text>
                    <Text> ({person.profession})</Text>
                </View>
                <View style={styles.row2_style}>
                    <Text style={styles.locality_label_style}>Locality:</Text>
                    <Text style={[styles.locality_style]}> {person.locality}</Text>
                    <Text style={styles.guests_style}>Guests: {person.guests}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </Card>
)
export default RegistrationTile;

const styles = StyleSheet.create({
    card_style: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    background_style: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    row1_style: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name_style: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    row2_style: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    locality_label_style: {
        fontSize: 16,
    },
    locality_style: {
        fontSize: 16,
        flex: 2,
        fontWeight: 'bold'
    },
    guests_style: {
        fontSize: 16,
        flex: 1
    }
});