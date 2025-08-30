import { StyleSheet } from "react-native";


const StylesCreateHabitScreen = StyleSheet.create({
    safeStyle:{
        flex:1
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
        width:'80%',
        height: '50%',
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
        width:'100%',
        height:'100%',
        alignItems: 'center'
    },
    inputs:{
        backgroundColor:'#E7EDF4',
        color:'#4C759D',
        borderRadius:25,
        textAlign:'left',
        width:'85%',
        marginVertical:'3%',
        paddingLeft:15,
        borderWidth:0.2
    }, 
    inputsContainer: {
        width: "100%",
        alignItems: "center"
    },
    button:{
        backgroundColor:'#3bcce6ff',
        width:'65%',
        height:'33%',
        borderRadius:25,
        alignSelf:'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        verticalAlign:'center',
        alignSelf:'center',
        paddingVertical:'5%'
        //marginTop: 20,
    },
    textButton:{
        textAlign:'center',
    }
});

export default StylesCreateHabitScreen;