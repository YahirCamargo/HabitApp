import {Text,StyleSheet} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) =>{
    return(
        <SafeAreaView>
            <Text>
                Splash screen
            </Text>
        </SafeAreaView>
    );
    
};

const styles = StyleSheet.create({

});

export default SplashScreen;
