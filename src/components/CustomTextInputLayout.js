import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { TextInputLayout } from 'rn-textinputlayout';
import PropTypes from 'prop-types';

const CustomTextInputLayout = ({ value, placeholder, secureText,
    onTextChange, editable, multiline }) => (
        <TextInputLayout style={styles.inputLayout}>
            <TextInput
                value={value}
                style={styles.textInput}
                placeholder={placeholder}
                secureTextEntry={secureText}
                onChangeText={onTextChange}
                editable={editable}
                multiline={multiline}
                maxLength={50}
                autoCapitalize='none'
                autoCorrect={false}
            />
        </TextInputLayout>
    )

const styles = StyleSheet.create({
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36,
        alignContent: 'stretch',
    },
    textInput: {
        fontSize: 16,
        height: 40
    },
});

CustomTextInputLayout.propTypes = {
    placeholder: PropTypes.string.isRequired,
    secureText: PropTypes.bool,
    multiline: PropTypes.bool
}

CustomTextInputLayout.defaultProps = {
    secureText: false,
    multiline: false
}

export default CustomTextInputLayout;