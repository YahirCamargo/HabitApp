import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const StylesCreateHabitScreen = StyleSheet.create({
    safeStyle:{
        flex:1
    },
    pickerStyle:{
        width: screenWidth * 0.85,
        height: screenHeight * 0.058,
        marginVertical: '3%',
        backgroundColor: '#E7EDF4'
    },
    texts:{
        fontSize:30,
        fontWeight:'bold',
        paddingVertical:'5%'
    },
    logo:{
        width: '100%',
        height: '100%',
        resizeMode:"cover",
        borderRadius:15,
    },
    logoContainer:{
        width:screenWidth*0.8,
        height: screenHeight*0.45,
        paddingTop:'5%',
        paddingBottom:'5%',
    },
    backgroundBottom:{
        alignItems:'center',
        width: '100%',
        height: '60%',
        backgroundColor:'white',
        borderRadius:50
    },
    background:{
        backgroundColor:'#02798bff',
        width:screenWidth,
        height:screenHeight,
        alignItems: 'center'
    },
    inputs:{
        backgroundColor:'#E7EDF4',
        color:'#4C759D',
        borderRadius:25,
        textAlign:'left',
        width:screenWidth*0.85,
        marginVertical:'2.5%',
        paddingLeft:15,
        borderWidth:0.2,
        height:screenHeight*0.05
    }, 
    inputsContainer: {
        width: screenWidth,
        alignItems: "center"
    },
    button:{
        backgroundColor:'#3bcce6ff',
        width:'65%',
        height:screenHeight*0.05,
        borderRadius:25,
        alignSelf:'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: screenWidth,
        alignItems: 'center',
        verticalAlign:'center',
        alignSelf:'center',
        paddingVertical:'5%'
    },
    textButton:{
        textAlign:'center',
    }
});

export default StylesCreateHabitScreen;