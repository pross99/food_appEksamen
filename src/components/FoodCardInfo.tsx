
import React,  {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native'

import { FoodModel } from '../redux';
import { ButtonAddRemove } from './ButtonAddRemove';

interface FoodCardInfoProps{ 
  item: FoodModel;
  onTap: Function;
  onUpdateCart: Function;
}

const FoodCardInfo: React.FC<FoodCardInfoProps> = ({ item, onTap, onUpdateCart }) => {


const didUpdateCart = (unit: number) => {
  
  item.unit = unit;
  onUpdateCart(item);
}

return (<View style={styles.container}>

     
      
      <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ display: 'flex', flex: 8, padding: 10, marginTop: 10, paddingLeft: 20}}>
              <Text style={{fontSize: 22, fontWeight: '500'}}>{item.name}</Text>
              <Text style={{fontWeight:'600'}}>{item.category}</Text>
       
          </View>
          <View style={{ display: 'flex', flex: 4, padding: 10, justifyContent:'space-around', alignItems: 'center'}}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#7C7C7C'}}>{item.price /2} kr,-</Text>
              <ButtonAddRemove 
              onAdd={() => {
                  let unit = isNaN(item.unit) ? 0 : item.unit;
                  didUpdateCart( unit + 1);
              }} 
              onRemove={() => {
                  let unit = isNaN(item.unit) ? 0 : item.unit;
                  didUpdateCart( unit > 0 ? unit - 1 : unit);
              }} 
              unit={item.unit} />
          </View>
     </View>

</View>)}


const styles = StyleSheet.create({
container: {     
  display: 'flex',
  flex: 1, 
  width: Dimensions.get('screen').width - 20,
  margin: 10,
  borderRadius: 20,
  backgroundColor: '#FFF',
  height: 100,
  justifyContent: 'flex-start',
  borderWidth: 1,
  borderColor: '#E5E5E5',
  flexDirection: 'row'
  
  

},
navigation: { flex: 2, backgroundColor: 'red' },
body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
footer: { flex: 1, backgroundColor: 'cyan' }
})

export { FoodCardInfo }