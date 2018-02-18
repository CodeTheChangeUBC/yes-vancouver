/**
 * Created by joycheng on 2017-10-21.
 */

import Login from '../Login/LoginForm'
import HomeScreen from '../HomeScreen/HomeScreen'
import SignUp from '../SignUp/SignUp'
import ProfileSetupPhoto from '../Profile/ProfileSetupPhoto'
import ProfileSetupSocial from '../Profile/ProfileSetupSocial'
import ProfileSetupWork from '../Profile/ProfileSetupWork'
import ResetPassword from '../ResetPassword/ResetPassword'
import NavBar from './NavBar'
import { StackNavigator } from 'react-navigation'
import Aveda from '../Perks/aveda'
import PerksView from '../Perks/PerksView'
import PerksList from '../Perks/PerksList'

const Navigation = StackNavigator({
    HomeScreen : {screen : HomeScreen},
    Login : {screen : Login},
    NavBar : {screen : NavBar},
    SignUp : {screen : SignUp},
    ProfileSetupPhoto : {screen : ProfileSetupPhoto},
    ProfileSetupSocial : {screen : ProfileSetupSocial},
    ProfileSetupWork : {screen : ProfileSetupWork},
    ResetPassword : {screen : ResetPassword},
    Aveda : {screen : Aveda},
    PerksView: {screen: PerksView},
    PerksList: {screen: PerksList},


},
// {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     }
// }
)

export default Navigation
