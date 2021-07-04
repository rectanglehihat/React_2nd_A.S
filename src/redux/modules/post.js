import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";


const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";


const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

// initialState
const initialState = {
    list: [],
}

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
  user_info: {
		id: 0,
    user_name: "hyoni",
    user_profile: "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_327/7ae22985-90e8-44c3-a1d6-ee470ddc9073.jpg",
  },
  image_url: "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_327/7ae22985-90e8-44c3-a1d6-ee470ddc9073.jpg",
  contents: "애옹쓰 힘내라",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

const getPostFB = () => {
    return function (dispatch, getState, {history}){
        const postDB = firestore.collection('post');

        postDB.get().then((docs) => {
            const post_list = [];
            docs.forEach((doc) => {
                let _post = doc.data();
                // 키값만 뽑아서 배열 만들어 리듀스 사용해서 깔끔한 정보정리
                let post = Object.keys(_post).reduce((acc, curl) => {

                    if(curl.indexOf("user_") !== -1) {
                        return {...acc, user_info: {...acc.user_info, [curl]: _post[curl]}}
                    }
                    return{...acc, [curl]: _post[curl]}
                }, {id: doc.id, user_info: {}});

                post_list.push(post);
            })

            console.log(post_list)

            dispatch(setPost(post_list));
        })
    }
}

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
          draft.list = action.payload.post_list;
        }),
  
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            
        })
    },
    initialState
  );

  // action creator export
const actionCreators = {
    setPost,
    addPost,
    getPostFB
  };
  
  export { actionCreators };