import '../gesture-handler.native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const MapsApp = () => {
    return (
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    )
}