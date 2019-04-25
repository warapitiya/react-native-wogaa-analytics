
import { NativeModules } from 'react-native';

const { RNWogaaAnalytics } = NativeModules;

if(!RNWogaaAnalytics) {
    throw new Error('RNWogaaAnalytics null error.');
}

export function getPlatform() {
    const a = RNWogaaAnalytics.hello();
    console.log(a);
    return 'android';
};

export function getOSVersion() {
    return '43';
};