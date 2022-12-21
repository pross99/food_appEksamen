import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions} from 'react-native'
import { FoodModel, Kitchen } from '../redux';


const screenWidth = Dimensions.get('screen').width

interface KitchenProps {

    item: Kitchen | FoodModel
    onTap: Function;
 }
const KitchenCard: React.FC<KitchenProps> = ({item,onTap}) => {
    return (
         <TouchableOpacity style= {styles.container} onPress={() => onTap(item)}>
             <Image style={{ width: screenWidth - 20, height:220, borderRadius:20, backgroundColor: '#EAEAEA'}} 
             source= {{uri: `${item.images[0]}`}} 
             
             />
         </TouchableOpacity>
    )}





const styles = StyleSheet.create({
container: { width: screenWidth - 20, height:220, justifyContent: 'space-around', alignItems: 'center', margin: 10, borderRadius: 20 },
})



export {KitchenCard}