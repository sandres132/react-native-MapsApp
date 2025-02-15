import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Si se elige Ionicons si no seria el de su eleccion
import { globalStyles } from '../../../config/theme/styles';

export const MapScreen = () => {
    
    const myIcon = <Icon name='rocket-outline' size={100} color='#900' />

    return (
        <View style={ globalStyles.container }>
            <Text>MapScreen</Text>
            { myIcon }
        </View>
    )
}