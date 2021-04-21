import React from "react";

export class LogIn extends React.Component {
    render() 
    {const redirectUrl = "http://localhost:3000/oauth";
       const scope = ['read', 'write', 'account'];
       const name = "HELLO_WORLD_WITH_TRELLO_ACC"
       const key = 'efce45f3da6c1345d19c9a87c1e7cc9c'
       const requestUrl = `https://trello.com/1/authorize?return_url=${redirectUrl}&expiration=1day&name=${name}&scope=${scope.join()}&response_type=token&key=${key}`
        console.log(this.props)
        return <div>
            <a href={requestUrl}>Login with Trello</a>
            <h4>Please Log In</h4>
        </div>
    }
}