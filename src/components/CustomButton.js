import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

const CustomButton = ({ title, onButtonPress, style }) => (
    <TouchableOpacity
        style={style}
        onPress={onButtonPress}>
        <View style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>{title}</Text>
        </View>
    </TouchableOpacity>
)
export default CustomButton;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: 'green',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 36,
        marginVertical: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 5
    },
    buttonTextStyle: {
        fontSize: 20,
        color: 'white',
    }
});