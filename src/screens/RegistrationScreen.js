import React, { Component } from "react";
import { View, StyleSheet, Text, BackHandler, Alert, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Slider } from 'react-native-elements'
import { SafeAreaView } from "react-navigation";
import CustomTextInputLayout from "../components/CustomTextInputLayout";
import CustomDatePicker from "../components/CustomDatePicker";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CustomRadioCard from "../components/CustomRadioCard";
import CustomButton from "../components/CustomButton";
import * as firebase from 'firebase'
import moment from 'moment';

const profession = { Student: 'Student', Employed: 'Employed' };

class RegistrationScreen extends Component {
    constructor() {
        super()
        var date = this.getCurrentDate();
        this.state = {
            name: "",
            dob: date,
            today: date,
            profession: profession.Student,
            locality: "",
            guests: 0,
            address: "",
            backButtonClickCount: 0,
            isLoading: false
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            Alert.alert("Exit App", "Are you sure you want to miss out on the best event of the millenium?",
                [{ text: "Stay", onPress: () => { } },
                { text: "Exit", onPress: () => BackHandler.exitApp() }], { cancelable: true });
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    getCurrentDate() {
        var today = new Date();
        var date = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        return date + "/" + month + "/" + year;
    }

    getSelectedProfession(profession) {
        return this.state.profession == profession
    }

    professionSelected(profession) {
        this.setState({
            profession: profession
        })
    }

    onRegisterPress = async () => {
        if (this.state.name && this.state.locality) {
            this.setState({ isLoading: true })
            let dateDob = moment(this.state.dob, 'DD/MM/YYYY').toDate();
            let age = this.getAge(dateDob.toString())

            const ref = await firebase.database().ref('/registrations').push({
                name: this.state.name,
                dob: this.state.dob,
                age: age,
                profession: this.state.profession,
                locality: this.state.locality,
                guests: this.state.guests,
                address: this.state.address
            }).then(() => {
                this.setState({
                    name: "",
                    dob: this.state.today,
                    profession: "",
                    locality: "",
                    guests: 0,
                    address: "",
                    isLoading: false
                });
                Alert.alert("Successful", "Registered successfully, see you soon.");
            }).catch(function (error) {
                this.setState({ isLoading: false });
                alert("Something went wrong, unable to register");
            }).bind(this);
        } else {
            alert("Name and Locality are required");
        }
    }

    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    render() {
        return (
            <View>
                <SafeAreaView style={{ backgroundColor: 'green' }} />
                {this.state.isLoading ?
                    <View style={[StyleSheet.absoluteFill, styles.loader_style]}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                    : null}
                <View style={styles.logo_container}>
                    <FontAwesome name="meetup" size={100} color="white" />
                    <Text style={styles.app_name_style}>React Meetup</Text>
                </View>
                <View style={styles.hamburger_style}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.openDrawer() }}>
                        <MaterialIcons name="menu" size={36} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title_style}>When we get together and do the things that matter to us, we're at our BEST.{"\n\n"}Book your seat now:</Text>
                        <CustomTextInputLayout
                            placeholder="Name"
                            value={this.state.name}
                            onTextChange={(text) => { this.setState({ name: text }) }}
                        />
                        <CustomTextInputLayout
                            placeholder="Locality"
                            value={this.state.locality}
                            onTextChange={(text) => { this.setState({ locality: text }) }}
                        />
                        <CustomDatePicker
                            label="Date of Birth: "
                            date={this.state.dob}
                            today={this.state.today}
                            onDateChange={(date) => {
                                this.setState({ dob: date })
                            }} />
                        <Text style={styles.label_style}>Profession: </Text>
                        <View style={styles.radio_style}>
                            <CustomRadioCard
                                title={profession.Student}
                                isSelected={this.getSelectedProfession(profession.Student)}
                                onClicked={() => this.professionSelected(profession.Student)}>
                                <FontAwesome name="book" size={40} color="purple" />
                            </CustomRadioCard>
                            <CustomRadioCard
                                title={profession.Employed}
                                isSelected={this.getSelectedProfession(profession.Employed)}
                                onClicked={() => this.professionSelected(profession.Employed)}>
                                <MaterialIcons name="work" size={40} color="purple" />
                            </CustomRadioCard>
                        </View>
                        <Text style={[styles.label_style, { marginTop: 40 }]}>Number of Guests: {this.state.guests}</Text>
                        <Slider
                            style={styles.slider_style}
                            maximumValue={2}
                            minimumValue={0}
                            step={1}
                            thumbStyle={{ height: 20, width: 20, backgroundColor: 'green' }}
                            value={this.state.guests}
                            onValueChange={(value) => this.setState({ guests: value })}
                        />
                        <CustomTextInputLayout
                            placeholder="Address"
                            value={this.state.address}
                            onTextChange={(text) => { this.setState({ address: text }) }}
                            multiline={true}
                        />
                        <CustomButton
                            style={styles.button_style}
                            title="Register"
                            onButtonPress={() => {
                                this.onRegisterPress()
                            }}
                        />
                    </View>
                </ScrollView>
            </View >
        );
    }
}
export default RegistrationScreen;

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
        alignItems: 'stretch',
        paddingBottom: 400
    },
    hamburger_style: {
        position: 'absolute',
        top: 50,
        left: 20,
        elevation: 1000
    },
    logo_container: {
        height: 250,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    app_name_style: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'white'
    },
    title_style: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        marginHorizontal: 20,
        marginTop: 20
    },
    label_style: {
        fontSize: 16,
        marginHorizontal: 36,
        marginTop: 20,
        marginBottom: 10
    },
    radio_style: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 50
    },
    slider_style: {
        marginHorizontal: 36
    },
    button_style: {
        marginTop: 40
    }
});