//location
import {Address} from 'expo-location'


//category

export interface Category {
     id: string,
    title: String,
    icon: String
   
}

// food template

export interface FoodModel {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    readyTime: number;
    images: [string];
    unit: number;

}

// Restaurant template

export  interface Vendor {
    _id: string;
    name: string;
    foodType: string;
    address: string;
    phone: string;
    images: [string];
    foods: [FoodModel]

}

export interface FoodAvailability {
    categories: [Category];
    vendors: [Vendor];
    foods: [FoodModel]
}

// todo: modify later
// user model
export interface UserModel {
    firstName: string;
    lastName: String;
    contactNumber: String;
    token: string
}

export interface UserState{
    user: UserModel;
    location: Address;
    error: string | undefined
    Cart: [FoodModel];
    //orders
}

export interface ShoppingState {

    availableVendors: [Vendor]
    availableCategories: [Category]

 //   availability: FoodAvailability,
    availableFoods: [FoodModel]

    //other models?
}


