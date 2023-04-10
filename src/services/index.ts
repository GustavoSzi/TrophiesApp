import { GetTokenTypes } from "@/app/types/ApiTypes";
import { LocalStorageKeys } from "@/app/types/GenericTypes";
import { exchangeCodeForAccessToken, exchangeNpssoForCode, exchangeRefreshTokenForAuthTokens, makeUniversalSearch } from "psn-api";

async function getToken(/* { localToken, localExpiresIn, localRefreshToken }: GetTokenTypes */) {

    // if(localToken) {
    //     const localExpiresIn = localStorage.getItem(LocalStorageKeys.EXPIRES_IN);
    //     if(localExpiresIn) {
    //         const currentDate = new Date();

    //         const expirationDate = new Date(
    //             currentDate.getTime() + Number(localExpiresIn) * 1000
    //         ).toISOString();

    //         const isAccessTokenExpired = new Date(expirationDate).getTime() < currentDate.getTime();

    //         if(isAccessTokenExpired) {
    //             const localRefreshToken = localStorage.getItem(LocalStorageKeys.REFRESh_TOKEN);
    //             const { accessToken: token, expiresIn, refreshToken } = await updateToken(localRefreshToken!);

    //             setLocalItems(token, expiresIn, refreshToken);
    //         } else {
    //             return localToken;
    //         }
    //     }
    // }

    const npsso = process.env.NPSSO;
    const accessCode = await exchangeNpssoForCode(npsso!);

    const authorization = await exchangeCodeForAccessToken(accessCode);

    const currentDate = new Date();

    const expirationDate = new Date(
        currentDate.getTime() + Number(authorization.expiresIn) * 1000
    ).toISOString();

    const isAccessTokenExpired = new Date(expirationDate).getTime() < currentDate.getTime();

    if(isAccessTokenExpired) {
        const updateAuth = await updateToken(authorization.accessToken);

        // setLocalItems(authorization.accessToken, authorization.expiresIn, authorization.refreshToken);
        return updateAuth;
    } 

    // setLocalItems(accessToken, expiresIn, refreshToken)
    return authorization;
}

async function updateToken(token: string) {
    return exchangeRefreshTokenForAuthTokens(token);
}

// function setLocalItems(token: string, expiresIn: number, refreshToken: string) {
//     localStorage.setItem(LocalStorageKeys.TOKEN, token);
//     localStorage.setItem(LocalStorageKeys.REFRESh_TOKEN, refreshToken);
//     localStorage.setItem(LocalStorageKeys.EXPIRES_IN, String(expiresIn));
// }


// ************* Para buscar um jogo por título ************
// async function universalSearch() {
//     const token = await getToken();

//     const result = await makeUniversalSearch(token, "Resident", "ConceptGameMobileApp");

//     return result;
// }

export { getToken };