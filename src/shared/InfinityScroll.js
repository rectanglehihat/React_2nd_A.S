import React from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinitiScroll = (props) => {
    const {children, callNext, is_next, is_loading} = props;

    const _handleScroll = _.throttle(() => {

        const {innerHeight} = window;
        const {scrollHeight} = document.body;

        const scrollTop = (
            document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeight - scrollTop < 200){
            if(is_loading){
                return;
            }
            callNext();
        }

    }, 300);

    const handleScroll = React.useCallback(_handleScroll, [is_loading]);

    React.useEffect(() => {

        if(is_loading){
            return;
        }

        if(is_next){
            window.addEventListener("scroll", handleScroll);
        }else{
            window.removeEventListener("scroll", handleScroll);
        }

        return () => window.removeEventListener("scroll", handleScroll);

    }, [is_next, is_loading]);

    return (
        <React.Fragment>
            {children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

InfinitiScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    is_loading: false,
}

export default InfinitiScroll;