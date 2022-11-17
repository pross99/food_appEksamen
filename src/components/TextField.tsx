import React, {useState, useEffect} from 'react'
import {StyleSheet, View,Text,TouchableOpacity, TextInput,Image} from 'react-native'

interface TextFieldProps {
    placeholder: string;
    isSecure: boolean;
    onTextChange: Function

} 
const LoginScreen: React.FC<TextFieldProps> = ({placeholder, isSecure = false, onTextChange}) => {
    return (

    )
}

const styles = StyleSheet.create({


})

export {TextField}