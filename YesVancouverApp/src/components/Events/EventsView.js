import React, { Component } from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EventsList from './EventsList'
import EventsDetails from './EventsDetails'


// export default class EventsView extends Component {
//     // static navigationOptions = {
//     //     tabBarLabel: 'EventsView',
//     //     title: 'EventsView',
//     //     tabBarIcon: ({ focused, tintColor }) => focused ?
//     //     ( <Image 
//     //         source={require('../../images/NavBar/Calendar-icon-white-3x.png')}
//     //         resizeMode="contain"
//     //         style={{height:30}}/> 
//     //     ) :
//     //     ( <Image 
//     //         source={require('../../images/NavBar/Calendar-icon-orange-3x.png')}
//     //         resizeMode="contain"
//     //         style={{height:30}}/>
//     //     )
//     // }

//     render() {
//         return (
//              <EventsList/>
//             //<EventsDetails/>
//         );
//     }
// }

const EventsView = StackNavigator({
    EventsList: {
        screen: EventsList,
        navigationOptions:({navigation}) => ({
            title: "EventsList",
            // headerLeft:(
            //   <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
            //     <IOSIcon name="ios-menu" size={30} />
            //   </TouchableOpacity>
            // ),
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
    },
    EventsDetails: {
        screen: EventsDetails,
        navigationOptions: (props) => ({
            title: "Detail",
        })
    }
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
)

export default EventsView
