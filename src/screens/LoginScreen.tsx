import React, {useState, useEffect} from 'react'
import {StyleSheet, View,Text,TouchableOpacity, TextInput,Image} from 'react-native'
import {connect} from 'react-redux'
import { ApplicationState, onUserLogin, onUserSignup, UserState } from '../redux'
import {ButtonWithTitle, TextField} from '../components'

interface LoginProps {
    
    onUserSignup: Function,
    onUserLogin: Function,
    userReducer: UserState
} 
const _LoginScreen: React.FC<LoginProps> = ({onUserSignup, onUserLogin, userReducer}) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('Login');
    const [isSignup, setIsSignup] = useState(false)



    return (
        <View style={styles.container}>
        <View style={styles.navigation}><Text style={{fontSize: 30, fontWeight: '400'}}> {title} </Text></View>
        <View style={styles.body}>
        <TextField placeholder="Email" onTextChange={setEmail}/>
        <TextField placeholder="Phone" onTextChange={setPhone} />
        <TextField placeholder='Password' onTextChange={setPassword}  isSecure= {true}/>
        <ButtonWithTitle title={title} onTap={() => {}} width={340} height = {50} /> 
        <ButtonWithTitle title={!isSignup ? "Ny konto?" : "Har du en konto? Log ind her!"} onTap={() => {}} width={340} height = {50}  isNoBg= {true}/> 


        </View>

        <View style={styles.footer}></View>
        
    </View>)}

const styles = StyleSheet.create({
container: {
flex:1
},
body:{
flex: 10, justifyContent: 'center', alignItems: 'center',
},
navigation:{
flex:2, paddingLeft: 50, paddingRight: 50
},
footer:{
flex:1
}

})

const mapStateToProps = (state: ApplicationState) => ({

    userReducer: state.userReducer
})


const LoginScreen = connect(mapStateToProps, {})(_LoginScreen)

export {LoginScreen}