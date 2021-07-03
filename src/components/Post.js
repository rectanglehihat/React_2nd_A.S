import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";
import {Grid, Image, Text} from "../elements";


const Post = (props) => {

    return (
        <React.Fragment>
            <Grid>
                <Grid is_flex width="auto" padding="4px 16px">
                    <Image shape="circle" src={props.src}/>
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>
                <Grid padding="16px">
                    <Text bold>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.src}/>
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
};

export default Post;