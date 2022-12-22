import { ActionSheetIOS } from "react-native"
import { State } from "react-native-gesture-handler"
import { Action } from "redux"
import { ShoppingAction } from "../actions"
import { FoodAvailability, FoodModel, Vendor, ShoppingState, Category } from "../models"



const initialState = {


    availableVendors: {} as [Vendor],
    availableCategories: {} as [Category],
  
   // availability : {} as FoodAvailability,
    availableFoods: {} as [FoodModel]
}

const ShoppingReducer = (state: ShoppingState = initialState, action: ShoppingAction) => {


    switch(action.type){
        case 'ON_AVAILABILITY':
            return {
                ...state,
                availability: action.payload,
                availableVendors: action.payload
            }
            case  'ON_FOODS_SEARCH':
                return {
                ...state,
                availableFoods: action.payload,
         
                }


        default:
            return state
    }

}

export {ShoppingReducer}