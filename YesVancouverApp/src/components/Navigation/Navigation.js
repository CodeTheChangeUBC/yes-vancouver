/**
 * Created by joycheng on 2017-10-21.
 */

import Login from '../Login/LoginForm';
import HomeScreen from '../HomeScreen/HomeScreen';
import SignUp from "../SignUp/SignUp"
import ResetPassword from "../ResetPassword/ResetPassword"
import NavBar from './NavBar';
import { StackNavigator } from 'react-navigation';

const Navigation = StackNavigator({
    First:{screen:HomeScreen},
    Second: {screen:Login},
    Third: {screen:NavBar},
    SignUp : {screen : SignUp},
    ResetPassword : {screen : ResetPassword}
});

export default Navigation;
