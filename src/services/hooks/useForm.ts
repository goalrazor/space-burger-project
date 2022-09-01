import React, {ChangeEvent} from "react";

export const useForm = (initialState: { [key: string]: string } = {}) => {
    const [formData, setFormData] = React.useState(initialState);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return {formData, handleInputChange, setFormData};
}
