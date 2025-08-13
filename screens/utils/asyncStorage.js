import AsyncStorage from "@react-native-async-storage/async-storage";       

export const setItem = async (key, value) => { 
    try{
      await AsyncStorage.setItem(key, value);  
    }catch (error) {
        console.error("Error saving value", value);
     }
    };

    export const getItem = async (key) => {
        try{
            const value = await AsyncStorage.getItem(key);
            if(value !== null){
                return value;
            }
        }catch (error) {
            console.error("Error retrieving value", key);
        }
    }

    export const removeItem = async (key) => {
        try{
            await AsyncStorage.removeItem(key);
        }catch (error) {
            console.error("Error removing value", key);
        }
    }
    