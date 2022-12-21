import { useEffect, useState } from "react";
import {View,Text,StyleSheet,Image,Dimensions} from 'react-native'
import { SearchBar, ButtonWithIcon, CategoryCard, KitchenCard } from "../components";
import { connect } from 'react-redux'
import { ApplicationState, FoodModel, onAvailability, onUpdateLocation, Kitchen, ShoppingState, UserState, onSearchFoods } from '../redux'
import { useNavigation } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";



interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

export const _HomeScreen: React.FC<HomeProps> = (props) => {

    const {navigate} = useNavigation()


    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;

    const {categories, foods, kitchens} = availability
    
  //  console.log(foods)
    console.log(availability)
    console.log(location)
   // console.log(categories)
   // console.log(kitchens)
    console.log("HEJ")

    useEffect(() =>{
        props.onAvailability()
        setTimeout(() =>{
            props.onSearchFoods()
        },1000) 

    },[])

    const onTapKitchen = (item: Kitchen) => {
        navigate('KitchenPage', {kitchen: item})

    }

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', {food: item})
    }

    return(
        <View style={styles.container}>
        <View style={styles.navigation}>
            <View style={{marginTop: 50, flex:4, backgroundColor:'white', paddingLeft:20, paddingRight:20, alignItems:'center',justifyContent:'center', flexDirection:'row'}}> 
                 <Text>{`${location.name},${location.street}, ${location.city}`}</Text>
                 <Text> Edit knap</Text>
            </View>
            <View style={{display:'flex', height: 60,justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft:4 }}>
              <SearchBar didTouch={() =>{
                  navigate('SearchPage')
              }} onTextChange={() => {}} /> 
              <ButtonWithIcon onTap={() => {}} icon={require('../images/hambar.png')} width={50} height={40}  />

            </View>
        </View>
        <View style={styles.body}>
            
               <ScrollView>
               
                   <FlatList
                   horizontal
                   showsHorizontalScrollIndicator={false}
                   data={categories}
                   renderItem= {({item}) => <CategoryCard item={item} onTap={onTapKitchen} /> }
                   keyExtractor={(item) => `${item.id}`}
                   
                   />
         
                   <View>
                       <Text style={{fontSize: 25, fontWeight:'600', color: '#f15b5d', marginLeft:20}}> Populære Køkkner</Text>
                       <Text>{`${location.name},${location.street}, ${location.city}`}</Text>
                   </View> 
                   <FlatList
                   horizontal
                   showsHorizontalScrollIndicator={false}
                   data={kitchens}
                   renderItem= {({item}) => <KitchenCard item={item} onTap={onTapKitchen}/> }
                   keyExtractor={(item) => `${item._id}`}
                   />



                    <View>
                       <Text style={{fontSize: 25, fontWeight:'600', color: '#f15b5d', marginLeft:20}}> Hurtig Aftensmad </Text>
                   </View> 
                   <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={foods}
                     renderItem ={({ item }) =>  <KitchenCard item={item} onTap={onTapFood} /> } 
                     keyExtractor={(item) => `${item._id}`}
                    />
                   
                   </ScrollView>    


        </View>
       
    </View>
    )

}

const styles = StyleSheet.create({
container: {
    flex:1,
    backgroundColor: '#FFF'
},
navigation: {
    flex:2,
   
},
body: {
    flex:9,
    justifyContent: 'center',
    alignItems: 'center',
    
     
},


})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability, onSearchFoods })(_HomeScreen)

export { HomeScreen }