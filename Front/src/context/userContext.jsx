import { useState , createContext } from "react"

export const UserContext = createContext();


export function UserContextProvider({children}){

    const [profil, setProfil] = useState({})

    function login(){
        const user = {
            _id: token
        }

        //ajout du token dans le local storage
        localStorage.setItem("token",token)
        // set du token dans le state du Profil
        setProfil(user)
    }
    function logout(){
        //reset le state du Profil (enleve le token du profil)
        setProfil({});
        // enleve le token du local storage 
        localStorage.removeItem("token")
    }
    function isLogged(){
        if(profil._id){
            return true;
        }
        return false
    }
    return <UserContext.Provider value={{login,logout,isLogged}}>
        { children }
    </UserContext.Provider>
}
