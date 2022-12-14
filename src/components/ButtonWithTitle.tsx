import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageSourcePropType} from 'react-native'


interface ButtonProps {
    onTap: Function;
    width: number;
    height: number;
    title: string
    isNoBg?: boolean
 }


const ButtonWithTitle: React.FC<ButtonProps> = ({onTap, title,width,height, isNoBg}) => {

    if(isNoBg) {
        return (
            <TouchableOpacity style={[styles.btn, {width, height, backgroundColor: 'transparent'} ]}
               onPress={() => onTap()}
            >
                <Text style={{fontSize: 18, color: '#3980D'}}> {title}</Text>
    
            </TouchableOpacity>
        )

    }else{

        return (
        <TouchableOpacity style={[styles.btn, {width, height} ]}
           onPress={() => onTap()}
        >
            <Text style={{fontSize: 18, color: '#FFF'}}> {title}</Text>

        </TouchableOpacity>
    )
    }

}





const styles = StyleSheet.create({

btn: { display: 'flex', 
justifyContent: 'center', 
alignItems: 'center',
 width: 60, 
 height:40,
backgroundColor:'#f14b5d',
marginTop: 20,
borderRadius: 30,
alignSelf: 'center' },

})



export {ButtonWithTitle}