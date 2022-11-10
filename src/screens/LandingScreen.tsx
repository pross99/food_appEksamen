import React, {useState, useReducer, useEffect} from 'react'
import {View,Text,StyleSheet,Image,Dimensions} from 'react-native'


import * as Location from 'expo-location'


import { connect } from 'react-redux'
import { onUpdateLocation, UserState, ApplicationState  } from '../redux'

import { useNavigation } from '../utils'


const screenWidth = Dimensions.get('screen').width

interface LandingProps{
    userReducer: UserState,
    onUpdateLocation: Function
}



const _LandingScreen: React.FC<LandingProps> = (props) => {


    const {userReducer, onUpdateLocation} = props;

    const {navigate} = useNavigation()


    const [errormsg, setErrorMsg] = useState("")
    const [address, setAddress] = useState<Location.Address>()

    const [displayAdress, setDisplayAdress] = useState("Venter på nuværnde adresse")

    useEffect(() => {

        (async () => {

            let {status}: any = await Location.requestPermissionsAsync();

        if(status !== 'granted'){
            setErrorMsg('Tilladelse til at få adgang til adresse blev nægtet ')
        }

        let location: any = await Location.getCurrentPositionAsync();

        const {coords} = location

        if(coords) {
            const {latitude, longitude} = coords;

            let addressRespone: any = await Location.reverseGeocodeAsync( {latitude, longitude})

            for (let item of addressRespone) {
                setAddress(item)
                onUpdateLocation(item)
                let currentAddress = `${item.name},${item.street}, ${item.postalCode}, ${item.country}`
                setDisplayAdress(currentAddress)

                if (currentAddress.length > 0) {
                    setTimeout(() => {
                        navigate('homeStack')
                    },2000)
                }



                return;
            }
        
        
            } else {
            //notify user something went wrong
            }

       })();

    }, [])




    return(
        <View style={styles.container}>
            <View style={styles.navigation} />
            
            
            <View style={styles.body}>
                <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon}/>
                <View style={styles.adressContainer}> 
                   <Text style={styles.adressTitle}> Din leverings adresse </Text>    
                </View>

                <Text style= {styles.adressText}> {displayAdress} </Text>
            </View>
            <View style={styles.footer} />
             
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex:1,
    backgroundColor: 'rgba(232,232,232,1)'
},
navigation: {
    flex:2,
    
},
body: {
    flex:9,
    justifyContent: 'center',
    alignItems: 'center',
},
deliveryIcon:{
    width: 120,
    height:120
},

adressContainer: {
    width: screenWidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center'

},

adressTitle: {
fontSize: 22,
fontWeight: '700',
color:'#7D7D7D'
},

adressText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#4f4f4f'
},

footer: {
    flex: 1,
    
}
})


const mapToStateProps = (state: ApplicationState) => ({
    useReducer: state.userReducer

})

const LandingScreen = connect(mapToStateProps, {onUpdateLocation})(_LandingScreen)

export {LandingScreen}