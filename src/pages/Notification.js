import React from "react";
import {Grid, Text, Image} from "../elements";
import Card from "../components/Card";

const Notification = (props) => {
    let noti = [
        {user_name: "aaa", post_id: "post1", imag_url: ""},
        {user_name: "aaa", post_id: "post2", imag_url: ""},
        {user_name: "aaa", post_id: "post3", imag_url: ""},
        {user_name: "aaa", post_id: "post4", imag_url: ""},
        {user_name: "aaa", post_id: "post5", imag_url: ""},
    ]

    return (
        <React.Fragment>
            <Grid padding="16px" bg="#EFF6FF">
                {noti.map((n) => {
                    return (
                        <Card key={n.post_id} {...n}/>
                    )
                })}
            </Grid>
        </React.Fragment>
    )
}

export default Notification;