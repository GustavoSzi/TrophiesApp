import React from "react";
import { getToken, universalSearch } from "@/services";

export default async function Home() {

    const token = await universalSearch();
    console.log(token.domainResponses[0].results)
    
    return (
        <div>
        </div>
    )
}