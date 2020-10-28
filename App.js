import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import SearchScreen from './src/screens/SearchScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import DetailScreen from './src/screens/DetailScreen';
import CustomDrawer from './src/components/CustomDrawer';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { firebaseConfig } from './config/config';


class App extends React.Component {
  constructor() {
    super()
    this.initializeFirebase()
  }

  initializeFirebase = () => {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  }

  render() {
    return <AppContainer />;
  }
}

const stackNavigator = createStackNavigator({
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'Search Guests',
      headerShown: false,
      drawerIcon: <MaterialIcons name="people" size={24} color="black" />
    }
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: {
      title: 'Registered User Details'
    }
  }
})

const drawerNavigator = createDrawerNavigator({
  RegistrationScreen: {
    screen: RegistrationScreen,
    navigationOptions: {
      title: 'Register',
      drawerIcon: <MaterialIcons name="person-add" size={24} color="black" />
    }
  },
  SearchScreen: {
    screen: stackNavigator,
    navigationOptions: {
      title: 'Guest List',
      drawerIcon: <MaterialIcons name="people" size={24} color="black" />
    }
  },
  ReportsScreen: {
    screen: ReportsScreen,
    navigationOptions: {
      title: 'Reports',
      drawerIcon: <AntDesign name="piechart" size={24} color="black" />,
      headerShown: false
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
      drawerIcon: <AntDesign name="login" size={24} color="black" />,
    }
  }
}, {
  contentComponent: CustomDrawer
});

const AppContainer = createAppContainer(drawerNavigator);

export default App;
