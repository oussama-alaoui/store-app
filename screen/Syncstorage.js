import AsyncStorage from '@react-native-async-storage/async-storage';


const StoreData = async (key, value) => {
    try{
        await AsyncStorage.setItem(key,  JSON.stringify(value));
    }catch(e){
        console.log(e);
    }
}

const GetData = async (key) => {
    try{
        const value = await AsyncStorage.getItem(key);
        if(value !== null){
            return JSON.parse(value);
        }
    }catch(e){
        console.log(e);
    }
}

const RemoveData = async (key) => {
    try{
        await AsyncStorage.removeItem(key);
    }catch(e){
        console.log(e);
    }
}

export {StoreData, GetData, RemoveData};