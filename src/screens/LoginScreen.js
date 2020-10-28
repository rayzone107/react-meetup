import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import * as firebase from 'firebase'
import 'firebase/auth'
import { FontAwesome } from '@expo/vector-icons';
import CustomTextInputLayout from "../components/CustomTextInputLayout";
import CustomButton from "../components/CustomButton";
import { MaterialIcons } from '@expo/vector-icons';

class LoginScreen extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ isLoggedIn: true })
            } else {
                this.setState({ isLoggedIn: false })
            }
        })
    }

    onLoginPress = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true })
            try {
                const response = await firebase.auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                if (response) {
                    this.setState({ isLoading: false })
                }
            } catch (error) {
                this.setState({ isLoading: false })
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        this.loginUser();
                        break;
                    case 'auth/weak-password':
                        alert('Password must be minimum 6 characters')
                        break;
                    default:
                        alert('Something went wrong, please try again.')
                        break;
                }
            }
        } else {
            alert('Please enter email and password');
        }
    }

    loginUser = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true })
            try {
                const response = await firebase.auth()
                    .signInWithEmailAndPassword(this.state.email, this.state.password)
                if (response) {
                    this.setState({ isLoading: false })
                }
            } catch (error) {
                this.setState({ isLoading: false })
                switch (error.code) {
                    case 'auth/invalid-email':
                        alert('Please enter a valid email address')
                        break;
                    case 'auth/wrong-password':
                        alert('Incorrect password')
                        break;
                    default:
                        alert('Something went wrong, please try again.')
                        break;
                }
            }
        }
    }

    onLogoutPress = async () => {
        this.setState({ isLoading: true })
        try {
            await firebase.auth().signOut()
            this.setState({ isLoggedIn: false, isLoading: false })
        } catch (err) {
            alert('Unable to logout. Please try again')
        }
    }

    showLoginOrLogout() {
        if (!this.state.isLoggedIn) {
            return <View style={styles.containerBottom}>
                <CustomTextInputLayout
                    placeholder="Email"
                    onTextChange={email => this.setState({ email })}
                />
                <CustomTextInputLayout
                    placeholder="Password"
                    secureText={true}
                    onTextChange={password => this.setState({ password })}
                />
                <CustomButton
                    style={styles.button_style}
                    title="Login / Signup"
                    onButtonPress={this.onLoginPress} />
            </View>
        } else {
            return <View style={styles.containerBottom}>
                <CustomButton
                    style={styles.button_style}
                    title="Logout"
                    onButtonPress={this.onLogoutPress} />
            </View>
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ?
                    <View style={[StyleSheet.absoluteFill, styles.loader_style]}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                    : null}
                <View style={styles.containerTop}>
                    <FontAwesome name="meetup" size={200} color="green" />
                    <Text style={styles.labelStyle}>React Meetup</Text>
                </View>
                <View style={styles.hamburger_style}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.openDrawer() }}>
                        <MaterialIcons name="menu" size={36} color="black" />
                    </TouchableOpacity>
                </View>
                {this.showLoginOrLogout()}
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    loader_style: {
        backgroundColor: '#00000035',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        elevation: 1000
    },
    hamburger_style: {
        position: 'absolute',
        top: 50,
        left: 20
    },
    containerTop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBottom: {
        flex: 1,
        alignItems: 'stretch',
    },
    labelStyle: {
        fontSize: 40,
        marginTop: 30,
        fontWeight: 'bold',
        color: 'green'
    },
    button_style: {
        marginTop: 40
    },
});