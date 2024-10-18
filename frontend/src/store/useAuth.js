import {defineStore} from "pinia"
import { ref } from "vue"


export const useAuthStore = defineStore("auth",()=>{
    let token = ref("")
    let user = ref(null)

    function setToken(token){
        if(token){
            token.value=token
        }else{
            console.log("No esta llegando el token ", token);
        }
    }

    function getToken(){
        return token.value 
    }

    return{
        setToken, getToken, user
    }
})