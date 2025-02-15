import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { UseCalcularDigitos } from '../../hooks/useCalcularDigitos';
import { globalStyles } from '../../../config/theme/styles';

export const LoadingScreen = () => {

    return (
        <View style={ globalStyles.container }>
            <ActivityIndicator size={30} color={'black'}/>
        </View>
    )
}