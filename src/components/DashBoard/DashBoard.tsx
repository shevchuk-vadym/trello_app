import React from "react";
import {RouteChildrenProps} from 'react-router-dom'

interface DashBoardProps extends RouteChildrenProps {
    hello?: string;
    token?: string;

}

export class DashBoard extends React.Component<DashBoardProps> {
    render () {
        return <div>
            <h2>hello from DashBoard</h2>
        </div>
    }
}