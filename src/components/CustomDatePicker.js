import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import DatePicker from 'react-native-datepicker'

const CustomDatePicker = ({ label, date, today, onDateChange }) => (
    <View style={styles.container}>
        <Text style={{ fontSize: 16 }}>{label}</Text>
        <DatePicker
            style={styles.pickerStyle}
            date={date}
            mode="date"
            format="DD-MM-YYYY"
            minDate="02-01-1900"
            maxDate={today}
            showIcon={false}
            onDateChange={onDateChange}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
        />
    </View>
)
export default CustomDatePicker;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 36,
        marginTop: 40,
        marginBottom: 10
    },
    pickerStyle: {
        marginLeft: 20
    }
});