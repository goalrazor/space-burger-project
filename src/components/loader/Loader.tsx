import {HalfMalf} from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css'

export const Loader = () => {
    return (
        <HalfMalf
            text={"Идет загрузка, пожалуйста подождите..."}
            bgColor={"#1C1C21"}
            center={true}
            width={"150px"}
            height={"150px"}
        />
    )
}
