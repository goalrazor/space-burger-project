import React from "react";
import {useHistory} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import {FeedIdPage} from "../feed-page/feedIdPage";

export const FeedIdModalPage = () => {
    const history = useHistory()

    return (
        <Modal title=""
               handleClose={() => {
                   history.goBack()
               }}
        >
            <FeedIdPage/>
        </Modal>
    )
}
