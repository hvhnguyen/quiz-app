import React, { useContext, useEffect, useRef, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { BASE_URL, creatAPIEndpoint, ENDPOINT } from "../api";
import { Box, Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from '@mui/material';
import { getFormatedTime } from "../helper";
import { useNavigate } from "react-router-dom";

export default function Quiz() {

    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const {context , setContext} = useStateContext();
    const navigate = useNavigate();

    const timerRef = useRef(null);

    useEffect(() => {
        setContext({
            timeTaken:0,
            selectedOptions:[]
        })
        creatAPIEndpoint(ENDPOINT.question)
            .fetch()
            .then(res => {
                if (res.data.length > 0) {
                    setQuestions(res.data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            timerRef.current = setInterval(() => {
                setTimeTaken(prev => prev + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [questions]);

    const updateAnswer = (questionId, optionIndex) => {
        const temp = [...context.selectedOptions];
        temp.push({
            questionId,
            selected:optionIndex
        })

        if(questionIndex < 4) {
            setContext({selectedOptions:[...temp]});
            setQuestionIndex(questionIndex + 1);
        } else {
            setContext({selectedOptions:[...temp], timeTaken});
            navigate("/result");
        }
    }
    
    return (
        questions.length != 0
            ? <Card sx={{maxWidth:640, mx:'auto', mt: 5,
                '& .MuiCardHeader-action': {m: 0, alignSelf:'center'}}}>
                <CardHeader 
                    title={'Question ' + (questionIndex + 1) + ' of 5'} 
                    action={<Typography>{getFormatedTime(timeTaken)}</Typography>}/>
                    <Box>
                    <LinearProgress variant="determinate" value={(questionIndex + 1) * 100 / 5} />
                    </Box>
                    {questions[questionIndex].imageName != null
                    ? <CardMedia 
                    component="image"
                    image={BASE_URL + 'images/' + questions[questionIndex].imageName}
                    sx={{width:'auto', m:'10px auto'}}/>
                    : null}
                <CardContent>
                    <Typography variant = "h6">
                        {questions[questionIndex].questionInWord}
                    </Typography>
                    <List>
                        {questions[questionIndex].options.map((item, index) =>
                            <ListItemButton key={index} onClick={() => updateAnswer(questions[questionIndex].questionId, index)}>
                                <div>
                                    <b>{String.fromCharCode(65 + index) + " . "}</b>{item}
                                </div>
                            </ListItemButton>
                        )}
                    </List>
                </CardContent>
            </Card>
            : null
    );
}