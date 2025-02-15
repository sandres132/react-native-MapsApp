import { check, openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionStatus } from "react-native-permissions"
import { PermissionStatus } from "../../infrastructure/interfaces/permissions"
import { Platform } from "react-native";


export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if ( Platform.OS === 'ios' ) {
        // el request abre un popup diciendoles esta aplicacion necesita permisos de ...
        status = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
    }else if ( Platform.OS === 'android' ) {
        status = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
    } else {
        throw new Error( 'Unsupported platform' );
    }

    if ( status === 'blocked' ) {
        await openSettings();
        return await checkLocationPermission();
    }

    // esto es para ahorrarse un switch
    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        blocked: 'blocked',
        denied: 'denied',
        limited: 'limited',
        unavailable: 'unavailable',
    };

    return permissionMapper[status] ?? 'unavailable';
}

export const checkLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if ( Platform.OS === 'ios' ) {
        // el check verifica si ya se a otorgado o no el permiso
        status = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
    }else if ( Platform.OS === 'android' ) {
        status = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
    } else {
        throw new Error( 'Unsupported platform' );
    }
    
    // esto es para ahorrarse un switch
    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        blocked: 'blocked',
        denied: 'denied',
        limited: 'limited',
        unavailable: 'unavailable',
    };

    return permissionMapper[status] ?? 'unavailable';
}