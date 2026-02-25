// PURPOSE: Authentication helper utilities (Cookie-based auth)

import { adminAPI } from "./api";

export const authHelpers = {

//     * Check if admin is authenticated.
//    * Makes request to /api/admin/me
//    * If request succeeds → logged in
//    * If 401 → not logged in

      isAuthenticated: async() =>{
        try{
            await adminAPI.getMe();
            return true;
        }catch {
            return false;
        }
      },
//        * Logout admin
//    * Backend clears httpOnly cookie
//      
        logout: async() =>{
            try{
                await adminAPI.logout();
            }finally{
                if(typeof window !== 'undefined'){
                    window.location.href = '/admin/login';
                }
            }
        },
};
    