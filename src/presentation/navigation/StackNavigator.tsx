import { createStackNavigator } from '@react-navigation/stack';

import { LoadingScreen,
    MapScreen,
    PermissionsScreen } from '../screens';

export type RootStackParams ={
    MapScreen: undefined,
    LoadingScreen: undefined,
    PermissionsScreen: undefined,
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={{

                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                }
            }}
        >
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
            <Stack.Screen name='MapScreen' component={MapScreen} />
            <Stack.Screen name='PermissionsScreen' component={PermissionsScreen} />
        </Stack.Navigator>
    )

}