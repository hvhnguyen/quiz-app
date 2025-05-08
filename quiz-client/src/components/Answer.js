import { Accordion, AccordionDetails, AccordionSummary, Box, CardMedia, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { BASE_URL } from "../api";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { green, red } from "@mui/material/colors";

export default function Answer({ questionAnswers }) {
    const [expanded, setExpanded] = useState(false);

    const handleChane = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const markCorrectOrNot = (questionAnswer, index) => {
        if ([questionAnswer.answer, questionAnswer.selected].includes(index)) {
            return { sx: {color: questionAnswer.answer == index ? green[500] : red[500] }}
        }
    }

    return (
        <Box sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
            { 
                questionAnswers.map((item, j) => (<Accordion
                    disableGutters
                    key={j}
                    expanded={expanded === j}
                    onChange={handleChane(j)}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon
                        sx={{
                            color: item.aswer == item.selected ? green[500] : red[500]
                        }}
                    />}>
                        <Typography sx={{ width: '90%', flexShrink: 0 }}>
                            {item.questionInWord}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.imageName ? 
                        <CardMedia 
                            component="img" 
                            image={BASE_URL + 'images/' + item.imageName}
                            sx={{m: '10px auto', width: 'auto' }} /> : null}
                        <List>
                            {item.options.map((x, i) =>
                            <ListItem key={i}>
                                <Typography {...markCorrectOrNot(item, i)}>
                                    <b>{String.fromCharCode(65 + i) + " . "}</b>{x}
                                </Typography>
                            </ListItem>)}
                        </List>
                    </AccordionDetails>
                </Accordion>))
            }
        </Box>
    )
}