import { View, Text, Pressable } from 'react-native';
import { globalStyles } from '../../../config/theme/styles';
import { usePermissionStore } from '../../store/permissions/usePermissionStore';

export const PermissionsScreen = () => {

    const { locationStatus, requestLocationPermission, checkLocationPermission } = usePermissionStore();

    return (
        <View style={ globalStyles.container }>
            <Text>Habilitar Ubicacion</Text>

            <Pressable
                style={ globalStyles.btnPrimary }
                onPress={ requestLocationPermission }
            >
                <Text style={{ color: 'white' }}>Habilitar Localizacion</Text>
            </Pressable>

            <Text>Estado actual: {locationStatus}</Text>
        </View>
    )
}