import React, { useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import Center from './Center';
import useForm from '../hooks/useForm';
import { creatAPIEndpoint, ENDPOINT } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const getFreshModel= () => ({
    name: '',
    email: ''
})

export default function Login() {

    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate();

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetContext()
    }, [])

    const login = e => {
        e.preventDefault();
        if(validate()) {
            creatAPIEndpoint(ENDPOINT.user)
            .post(values)
            .then(res => {
                setContext({userId:res.data.userId});
                navigate('/quiz');
            })
            .catch(err => console.log(err))
        }
    }

    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
        temp.name = values.name != "" ? "" : "This filed is required."
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    return (
        <Center>
            <Card sx={{width: 400}}>
                <CardContent sx={{textAlign:'center'}}>
                    <Typography variant="h3" sx={{my: 3}}>
                        Quiz App
                    </Typography>
                    <Box sx={{'& .MuiTextField-root': {m:1, width: '90%'}}}>
                        <form noValidate autoComplete="on" onSubmit={login}>
                            <TextField 
                                label="Email" 
                                name="email" 
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && {error:true, helperText:errors.email})} />
                            <TextField 
                                label="Name" 
                                name="name" 
                                value={values.name}
                                onChange={handleInputChange}
                                variant="outlined" 
                                {...(errors.name && {error:true, helperText:errors.name})} />
                            <Button type="submit" variant="contained" size="large" sx={{width: '90%'}}>
                                Start
                            </Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}