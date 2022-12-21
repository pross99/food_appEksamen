import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { ButtonWithIcon, FoodCard } from '../components';
import {connect} from 'react-redux'
import { Kitchen, FoodModel, ApplicationState, onUpdateCart, UserState } from '../redux';
import { checkExistence } from '../utils';
import {useNavigation} from '../utils/useNavigation'





interface KitchenProps { 
    userReducer: UserState,
    onUpdateCart: Function,
    navigation: {getParam: Function, goBack: Function}
}


const _KitchenScreen: React.FC<KitchenProps> = (props) => {

    const {getParam, goBack} = props.navigation;

    const kitchen = getParam('kitchen') as Kitchen

    const { navigate } = useNavigation()


    const{Cart} = props.userReducer;

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', {food: item})
    }




    return (<View style={styles.container}>   
    <View style={styles.navigation}>
            <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
            <Text style={{fontSize:22, fontWeight:'600', marginLeft:80}}> **LOKATION NAVN**</Text>
    </View>

        
        <View style={styles.body}>

            <ImageBackground source={{uri: `${kitchen.images[0]}`}} 
            style={{width: Dimensions.get('screen').width, height:300, justifyContent: 'flex-end',}}
            >
                <View style={{height:120,backgroundColor:'rgba(0,0,0,0.6', padding:10}}>


                    <Text style={{color: '#FFF', fontSize:40, fontWeight: '700'}}> LOKATION NAVN</Text>
                    <Text style={{color: '#FFF', fontSize:25, fontWeight: '500'}}> **ADRESSE* **TLF NUMMER** </Text>
                </View>
            </ImageBackground>
            <FlatList

                showsHorizontalScrollIndicator={false}
                data={kitchen.foods}
                renderItem={({item}) => <FoodCard item={checkExistence(item, Cart)} onTap={onTapFood} onUpdateCart={props.onUpdateCart}/>}
                keyExtractor={(item) => `${item._id}`}
            />
        </View>
    </View>)}





const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2'},
    navigation: { flex: 1, marginTop: 43, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' },
    body: { flex: 11, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', },
    footer: { flex: 1, backgroundColor: 'cyan' }
    })





    const mapStateToProps = (state: ApplicationState) => ({
        shoppingReducer: state.shoppingReducer,
        userReducer: state.userReducer
    })
    
    
    const KitchenScreen = connect(mapStateToProps, {onUpdateCart})(_KitchenScreen)
    
   


export {KitchenScreen}