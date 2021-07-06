import React from "react";
import {Grid, Image, Text, Button} from "../elements";
import { history } from "../redux/configureStore";


const Post = (props) => {

    return (
        <React.Fragment>
            <Grid>
                <Grid is_flex padding="4px 16px">
                    <Grid is_flex width="auto">
                        <Image shape="circle" src={props.src}/>
                        <Text bold>{props.user_info.user_name}</Text>
                    </Grid>

                    <Grid is_flex width="auto">
                        <Text>{props.insert_dt}</Text>
                        {props.is_me && (<Button width="auto" padding="4px" margin="4px" _onClick={() => {
                            history.push(`/write/${props.id}`)
                        }}>수정</Button>)}
                    </Grid>
                </Grid>
                <Grid padding="16px">
                    <Text bold>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.image_url}/>
                </Grid>
                <Grid padding="16px">
                    <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
// 필요한 props 미리 넘겨 놓기(화면 깨짐이나 오류 방지)
Post.defaultProps = {
    user_info: {
        user_name: "hyoni",
        user_profile: "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_327/7ae22985-90e8-44c3-a1d6-ee470ddc9073.jpg",    
    },
    image_url: "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_327/7ae22985-90e8-44c3-a1d6-ee470ddc9073.jpg",
    contents: "힘내라 힘",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
    is_me: false,
};

export default Post;