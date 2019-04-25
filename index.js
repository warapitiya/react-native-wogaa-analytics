
import { NativeModules } from 'react-native';

const { RNWogaaAnalytics } = NativeModules;

if(!RNWogaaAnalytics){
    throw new Error('RNWogaaAnalytics null error.');
}

export function getPlatform() {
    return 'android';
};

export function getOSVersion() {
    return '43';
};