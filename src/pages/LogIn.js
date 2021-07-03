import React from "react";
import {Text, Input, Grid, Button,} from "../elements";
import {getCookie, setCookie, deleteCookie} from "../shared/Cookie"
import {use, useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";


const Login = (props) => {
    const dispatch = useDispatch();

    const login = () => {
        dispatch(userActions.loginAction({user_name: '애옹쓰'}));
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>로그인</Text>

                <Grid padding="16px 0px">
                    <Input 
                    label="아이디"
                    placeholder="아이디를 입력하세요."
                    />
                </Grid>
                <Grid padding="16px 0px">
                    <Input 
                    label="패스워드"
                    placeholder="패스워드를 입력하세요."
                    />
                </Grid>
                <Button 
                    text="로그인하기" 
                    _onClick={() => {console.log("로그인완료");
                    login();
                    }}>
                </Button>
            </Grid>
        </React.Fragment>
    )
}

export default Login;