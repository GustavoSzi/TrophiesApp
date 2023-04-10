// "use client"
// import { useEffect, useState } from 'react';
// import { LocalStorageKeys } from '../types/GenericTypes';
// import { GetTokenTypes } from '../types/ApiTypes';
// import { exchangeCodeForAccessToken, exchangeNpssoForCode, exchangeRefreshTokenForAuthTokens } from 'psn-api';

// export default function useApi() {

//     const [token, setToken] = useState("")

//     async function getToken({localToken, localExpiresIn, localRefreshToken}: GetTokenTypes) {
//         if(localToken) {
//             if(localExpiresIn) {
//                 const currentDate = new Date();
    
//                 const expirationDate = new Date(
//                     currentDate.getTime() + Number(localExpiresIn) * 1000
//                 ).toISOString();
    
//                 const isAccessTokenExpired = new Date(expirationDate).getTime() < currentDate.getTime();
    
//                 if(isAccessTokenExpired) {
//                     const { accessToken: token, expiresIn, refreshToken } = await updateToken(localRefreshToken!);
    
//                     setLocalItems(token, expiresIn, refreshToken);
//                     setToken(token);
//                     return;
//                 } else {
//                     setToken(localToken);
//                     return;
//                 }
//             }
//         }
    
//         const npsso = '8tZ6N2lHPfJi8zLC5kUPfF9Dx2kPg1pPe1Xu2ZpqBVjkbPgpmnGOHekymovwwYZP';
//         const accessCode = await exchangeNpssoForCode(npsso);
    
//         const { accessToken, expiresIn, refreshToken} = await exchangeCodeForAccessToken(accessCode);
    
//         setLocalItems(accessToken, expiresIn, refreshToken)
        
//         console.log(accessToken, expiresIn, refreshToken)
//     }
    
//     useEffect(() => {
//         const localData: GetTokenTypes = {
//             localToken: localStorage.getItem(LocalStorageKeys.TOKEN),
//             localExpiresIn: localStorage.getItem(LocalStorageKeys.EXPIRES_IN),
//             localRefreshToken: localStorage.getItem(LocalStorageKeys.REFRESh_TOKEN)
//         }

//         getToken(localData);
//     }, [])

//     return token;
// }

// // function setLocalItems(token: string, expiresIn: number, refreshToken: string) {
// //     localStorage.setItem(LocalStorageKeys.TOKEN, token);
// //     localStorage.setItem(LocalStorageKeys.REFRESh_TOKEN, refreshToken);
// //     localStorage.setItem(LocalStorageKeys.EXPIRES_IN, String(expiresIn));
// // }

// async function updateToken(token: string) {
//     return exchangeRefreshTokenForAuthTokens(token);
// }