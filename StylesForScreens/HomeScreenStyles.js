import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    safeStyle:{
        flex:1
    },
    sliderStyle:{
        thumbTintColor:"#3bcce6ff"
    },
    background:{
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#E3F2FD',
        width:screenWidth,
        height:screenHeight,
    },
    text:{
        fontSize:30,
        marginTop:'1%,',
        color:'#212121',
    },
    textPercentage:{
        alignSelf: 'center',
        marginBottom: 5 
    },
    habitItem:{
        width:screenWidth*0.9,
        height:screenHeight*0.10,
        marginVertical:10,
        backgroundColor:'#FFF',
        borderRadius:15,
        textAlign:'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    list:{
        alignSelf:'',
        width:'100%',
        height:'100%',
    },
    habitName:{
        paddingLeft:10
    },
    progressStyle:{
        textAlign:'center'
    }
});

export default styles;