import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomRadioCard = ({ children, title, isSelected, onClicked }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={onClicked}>
        <View style={[styles.card, isSelected ? styles.cardSelected : styles.cardUnselected]}>
            <View style={styles.card_child}>
                {children}
                <Text style={styles.title_style}>{title}</Text>
            </View>
        </View>
    </TouchableOpacity>
)
export default CustomRadioCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        borderColor: '#00000055',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: 20,
    },
    cardSelected: {
        backgroundColor: '#d9eeff'
    },
    cardUnselected: {
        backgroundColor: 'white'
    },
    card_child: {
        alignItems: 'center',
    },
    title_style: {
        marginTop: 10
    }
});