import React from "react";

export const useForm = (initialState: { [key: string]: string } = {}) => {
    const [formData, setFormData] = React.useState(initialState);

    const handleInputChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return {formData, handleInputChange, setFormData};
}
