import React, { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { creatAPIEndpoint, ENDPOINT } from "../api";
import { getFormatedTime } from "../helper";
import { Box, Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography, Button, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { green } from '@mui/material/colors';
import Answer from "./Answer";


export default function Result() {
    const { context, setContext } = useStateContext();
    const [ score, setScore ] = useState(0);
    const [ questionAnswers, setQuestionsAnswers ] = useState([]);
    const [ showAlert, setShowAlert ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const ids = context.selectedOptions.map(x => x.questionId);
        creatAPIEndpoint(ENDPOINT.getAnswers).post(ids)
        . then(res => {
            const questionAnswer = context.selectedOptions
            .map(x => ({
                ...x,
                ...(res.data.find(y => y.questionId == x.questionId))
            }))
            setQuestionsAnswers(questionAnswer);
            calculateScore(questionAnswer);
        })
        .catch(err => console.log(err)
        )
    }, [])

    const calculateScore = (questionAnswer) => {
        let tempScore = questionAnswer.reduce((acc, curr) => {
            return String(curr.answer) === String(curr.selected) ? acc + 1 : acc;
        }, 0);
        setScore(tempScore);
    };

    const restart = () => {
        setContext({
            timeTaken:0,
            selectedOptions:[]
        })
        navigate("/quiz");
    }

    const submitScore = () => {
        creatAPIEndpoint(ENDPOINT.user)
        .put(context.userId, {
            userId: context.userId,
            score,
            timeTaken: context.timeTaken
        })
        .then(res => {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 4000);
        })
        .catch(err => {console.log(err);
        })
    }

    return (
        <>
        <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth:640, mx: 'auto'}}>
            <Box sx={{ display: 'flex', felxDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{flex: '1 0 auto', textAlign: 'center' }}>
                    <Typography variant="h4">Congratulations!</Typography>
                    <Typography variant="h6">
                        YOUR SCORE
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        <Typography variant="span" color={green[500]}>
                            {score}
                        </Typography>/5
                    </Typography>
                    <Typography variant="h6">
                        In {getFormatedTime(context.timeTaken)}
                    </Typography>
                    <Button variant="contain"
                        sx={{ mx: 1}}
                        soze="small"
                        onClick={submitScore}>
                            Submit
                    </Button>
                    <Button variant="contain"
                        sx={{ mx: 1}}
                        soze="small"
                        onClick={restart}>
                            Restart
                    </Button>
                    <Alert 
                        severity="success"
                        variant="string"
                        sx={{width: '60%', m: 'auto', visibility: showAlert ? 'visible' : 'hidden'}}
                    >
                        Score Updated.
                    </Alert>
                </CardContent>
            </Box>
            <CardMedia 
                component="img"
                sx={{ width: 220 }}
                image="./result.png"
            />
        </Card>
        <Answer questionAnswers={questionAnswers} />
        </>
    )
}