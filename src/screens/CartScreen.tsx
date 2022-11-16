import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image} from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, FoodModel, ShoppingState, onUpdateCart, UserState } from '../redux'
import {ButtonWithIcon, FoodCard, FoodCardInfo, SearchBar} from '../components'
import { checkExistence, useNavigation } from '../utils'
import { FlatList } from 'react-native-gesture-handler'



interface CartScreenProps{ 
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onUpdateCart: Function,
 }


const _CartScreen: React.FC<CartScreenProps> = (props) => {

    const { navigate } = useNavigation()

    const [totalAmount, setTotalAmount] = useState(0)

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState('')

    const { availableFoods } = props.shoppingReducer;
  
    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }
 
    const { Cart } = props.userReducer;

  useEffect(() => {
    onCalculateAmount()
  },[Cart]);

    const onCalculateAmount = () => {
        let total = 0;
        Cart.map(food => {
            total += food.price * food.unit
        })
    

        setTotalAmount(total)
    }


    if(Cart.length >0) {

return (<View style={styles.container}>
        <View style={styles.navigation}> 
                 <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4}}>
                    
                  
                 </View>
            </View>

            <View style={styles.body}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={ Cart }
                    renderItem={({ item}) => <FoodCardInfo
                     onTap={onTapFood}
                      item={checkExistence(item, Cart)} onUpdateCart={props.onUpdateCart} /> }
                    keyExtractor={(item) => `${item._id}`}
                />

            </View>

            <View style={styles.footer}>
                <View style={styles.amountView}>
                    <Text style={{fontSize: 18}}>Total</Text>
                    <Text style={{fontSize:18}}>{totalAmount}</Text>

                </View>

            </View>
 </View>)
    }else{
       return <View style={{flex: 1, display:'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: '700'}}> Your cart is empty</Text>

        </View>
    }
}




const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#F2F2F2'},
navigation: { flex: 1,  marginTop: 43, },
body: { flex: 9, justifyContent: 'center', alignItems: 'center' },
footer: { flex: 2, backgroundColor: 'cyan', padding:10 },
amountView: {display:'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}
})



const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})


const CartScreen = connect(mapStateToProps, {onUpdateCart})(_CartScreen)

 export { CartScreen }