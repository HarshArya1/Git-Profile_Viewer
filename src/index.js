import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/Header";
import Body from "./component/Body";
function GithubProfile(){
    //header
    // 10 cards
    return(
        <>
        <Header></Header>

        <Body></Body>
        </>
    )

}


ReactDOM.createRoot(document.getElementById("root")).render(<GithubProfile/>);
