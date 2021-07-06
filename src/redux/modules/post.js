import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as imageActions } from "./image";


const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING"


const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id, post}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState
const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false,
}

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
  // user_info: {
	// 	id: 0,
  //   user_name: "hyoni",
  //   user_profile: "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_327/7ae22985-90e8-44c3-a1d6-ee470ddc9073.jpg",
  // },
  image_url: "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_327/7ae22985-90e8-44c3-a1d6-ee470ddc9073.jpg",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};


const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {

    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });

        return;
      } else {
        const user_id = getState().user.user.uid;
        const _upload = storage
          .ref(`images/${user_id}_${new Date().getTime()}`)
          .putString(_image, "data_url");

        _upload.then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);

              return url;
            })
            .then((url) => {
              postDB
                .doc(post_id)
                .update({ ...post, image_url: url })
                .then((doc) => {
                  dispatch(editPost(post_id, { ...post, image_url: url }));
                  history.replace("/");
                });
            })
            .catch((err) => {
              window.alert("앗! 이미지 업로드에 문제가 있어요!");
              console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  }
}


const addPostFB = (contents="") => {
  return function (dispatch, getState, {history}){
    const postDB = firestore.collection("post");

    const _user = getState().user.user;

    const user_info = {
      user_name : _user.user_name,
      uer_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    // 게시글 작성할 때 이미지 업로드
    const _image = getState().image.preview;
    console.log(typeof _image);

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");
   
    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            dispatch(imageActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            // return으로 넘겨준 값이 잘 넘어왔나요? :)
            // 다시 콘솔로 확인해주기!
            console.log(url);

            postDB
              .add({ ...user_info, ..._post, image_url: url })
              .then((doc) => {
                // 아이디를 추가해요!
                let post = { user_info, ..._post, id: doc.id, image_url: url };
                // 이제 리덕스에 넣어봅시다.
                dispatch(addPost(post));
                history.replace("/");
              })
              .catch((err) => {
								window.alert("앗! 포스트 작성에 문제가 있어요!");
                console.log("post 작성 실패!", err);
              });
          });
      })
      .catch((err) => {
				window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log(err);
      });
  };
};


const getPostFB = (start = null, size=3) => {
    return function (dispatch, getState, {history}){
        let _paging = getState().post.paging;

        if(_paging.start && !_paging.next){
          return;
        }

        dispatch(loading(true));
        const postDB = firestore.collection('post');

        let query = postDB.orderBy("insert_dt", "desc");

        if(start){
          query = query.startAt(start);
        }

        query.limit(size + 1).get().then((docs) => {
          let post_list = [];

          let paging = {
            start: docs.docs[0],
            next: docs.docs.length === size+1? docs.docs[docs.docs.length -1] : null,
            size: size,
          }

            docs.forEach((doc) => {
                let _post = doc.data();
                // 키값만 뽑아서 배열 만들어 리듀스 사용해서 깔끔한 정보정리
                let post = Object.keys(_post).reduce((acc, cur) => {

                    if(cur.indexOf("user_") !== -1) {
                        return {...acc, user_info: {...acc.user_info, [cur]: _post[cur]}}
                    }
                    return{...acc, [cur]: _post[cur]}
                }, {id: doc.id, user_info: {}}
              );

                post_list.push(post);
            })
            post_list.pop();

            dispatch(setPost(post_list, paging));
        })

        return;

        postDB.get().then((docs) => {
            const post_list = [];
            docs.forEach((doc) => {
                let _post = doc.data();
                // 키값만 뽑아서 배열 만들어 리듀스 사용해서 깔끔한 정보정리
                let post = Object.keys(_post).reduce((acc, cur) => {

                    if(cur.indexOf("user_") !== -1) {
                        return {...acc, user_info: {...acc.user_info, [cur]: _post[cur]}}
                    }
                    return{...acc, [cur]: _post[cur]}
                }, {id: doc.id, user_info: {}}
              );

                post_list.push(post);
            })

            dispatch(setPost(post_list));
        })
    }
}

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
          draft.list.push(...action.payload.post_list);
          draft.paging = action.payload.paging;
          draft.is_loading = false;
        }),
  
        [ADD_POST]: (state, action) => produce(state, (draft) => {
          draft.list.unshift(action.payload.post);
        }),

        [EDIT_POST]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
        }),

        [LOADING]: (state, action) => produce(state, (draft) => {
          draft.is_loading = action.payload.is_loading;
        }),
    },
    initialState
  );

  // action creator export
const actionCreators = {
    setPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
  };
  
  export { actionCreators };