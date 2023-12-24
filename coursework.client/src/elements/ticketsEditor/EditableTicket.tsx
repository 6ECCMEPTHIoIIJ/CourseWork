import React, { createContext } from "react";

import { ITicket } from "./ITicket";
import { EmptyTicket } from "./TicketConstants";
import { AppBar, Box, Button, Card, CardContent, CardHeader, CardMedia, Checkbox, Divider, FormControl, FormHelperText, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, MenuItem, Radio, RadioGroup, Select, TextField, Toolbar, Typography } from "@mui/material";
import { TicketPreviewDatas } from "./TicketEditor";
import { AddOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";

import Grid2 from "@mui/material/Unstable_Grid2";
import createTrigger from "react-use-trigger";
import useTriggerEffect from "react-use-trigger/useTriggerEffect";

const scrollToBottomTrigger = createTrigger();

type EditableTicketContextProps = [ITicket, React.Dispatch<ITicket>];

const EditableTicketContext = React.createContext<EditableTicketContextProps>({} as EditableTicketContextProps);

function EditableTicketAnswer() {
    const [ticket] = React.useContext(EditableTicketContext);

    switch (ticket.type) {
        case 0:
            return <EditableTicketAnswerChoise multiple={false} />
        case 1:
            return <EditableTicketAnswerChoise multiple={true} />
        case 2:
            return <EditableTicketAnswerInput />
        default: return <React.Fragment />
    }
}

function EditableTicketAnswerInput() {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    return (
        <TextField
            fullWidth
            minRows={2}
            maxRows={30}
            multiline={true}
            placeholder="Введите текст..."
            value={ticket.answer.input}
            label="Ответ"
            onChange={e => {
                ticket.answer.input = e.target.value;
                setTicket({ ...ticket });
            }} />
    )
}

function EditableTicketAnswerSelect(params: { i: number, multiple: boolean }) {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    const checkedIdx = ticket.answer.multiple.findIndex((value) => params.i === value);

    return (params.multiple
        ? <Checkbox
            edge="start"
            checked={checkedIdx !== -1}
            tabIndex={- 1}
            disableRipple
            onClick={() => {
                if (checkedIdx === -1)
                    ticket.answer.multiple.push(params.i);
                else
                    ticket.answer.multiple.splice(checkedIdx, 1);
                ticket.answer.multiple.sort();
                setTicket({ ...ticket });
            }}
        />
        : <Radio
            edge="start"
            checked={ticket.answer.single === params.i}
            tabIndex={- 1}
            disableRipple
            onClick={() => {
                ticket.answer.single = params.i;
                setTicket({ ...ticket });
            }}
        />
    )
}

function EditableTicketVariantInput(params: { i: number }) {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    return (
        <TextField
            fullWidth
            minRows={1}
            maxRows={3}
            multiline={true}
            placeholder="Введите ответ..."
            value={ticket.answer.variants[params.i]}
            label="Ответ"
            onChange={e => {
                ticket.answer.variants[params.i] = e.target.value;
                setTicket({ ...ticket });
            }} />
    )
}

function DeleteTicketVariantButton(params: { i: number }) {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    return (
        <IconButton
            edge="end" color="error"
            onClick={() => {
                ticket.answer.variants.splice(params.i, 1);
                if (ticket.answer.single === params.i)
                    ticket.answer.single = -1;
                else if (ticket.answer.single > params.i)
                    ticket.answer.single--;

                const deletedIdx = ticket.answer.multiple.findIndex((value) => params.i === value);
                if (deletedIdx !== -1)
                    ticket.answer.multiple.splice(deletedIdx, 1);

                for (let j = 0; j < ticket.answer.multiple.length; ++j)
                    if (ticket.answer.multiple[j] >= params.i)
                        ticket.answer.multiple[j]--;

                setTicket({ ...ticket });
            }}>
            <CloseOutlined />
        </IconButton>
    );
}

function AddTicketVariantButton() {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    const lastAnswerRef = React.createRef<HTMLButtonElement>();

    useTriggerEffect(() => {
        lastAnswerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, scrollToBottomTrigger);

    return (
        <Button
            ref={lastAnswerRef}
            color="primary"
            variant="outlined"
            sx={{ width: "40%", height: "48px" }}

            onClick={() => {
                ticket.answer.variants.push("");
                setTicket({ ...ticket });
                scrollToBottomTrigger();
            }}
        >
            <AddOutlined />
        </Button>
    )
}

function EditableTicketAnswerChoise(params: { multiple: boolean }) {
    const [ticket] = React.useContext(EditableTicketContext);


    return (
        <React.Fragment>
            <List>
                {ticket.answer.variants.map((_, i) => (
                    <ListItem
                        key={i}
                        secondaryAction={
                            <DeleteTicketVariantButton i={i} />
                        }>
                        <ListItemIcon>
                            <EditableTicketAnswerSelect i={i} multiple={params.multiple} />
                        </ListItemIcon>
                        <EditableTicketVariantInput i={i} />
                    </ListItem>
                ))}
            </List>
            <AddTicketVariantButton />
        </React.Fragment>
    )
}

function EditableTicketQuestion() {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    return (
        <TextField
            sx={{ marginBottom: "1em" }}
            fullWidth
            minRows={2}
            maxRows={15}
            multiline={true}
            placeholder="Введите текст..."
            value={ticket.data.question}
            label="Вопрос"
            onChange={e => {
                ticket.data.question = e.target.value;
                setTicket({ ...ticket });
            }} />
    )
}

function EditableTicketDescription() {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    return (
        <TextField
            sx={{ marginBottom: "1em" }}
            fullWidth
            minRows={2}
            maxRows={15}
            multiline={true}
            placeholder="Введите текст..."
            value={ticket.data.description}
            label="Пояснение"
            onChange={e => {
                ticket.data.description = e.target.value;
                setTicket({ ...ticket });
            }} />
    )
}

function EditableTicketCost() {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    return (
        <TextField
            sx={{ marginBottom: "1em" }}
            fullWidth
            type="number"
            multiline={false}
            placeholder="Введите число..."
            value={ticket.data.cost !== 0 ? ticket.data.cost : ""}
            label="Стоимость"
            onChange={e => {
                const num: number = parseInt(e.target.value);
                ticket.data.cost = isNaN(num)
                    ? 0
                    : Math.min(100, Math.max(0, num));
                setTicket({ ...ticket });
            }} />
    )
}

function EditableTicketTypeSelect() {
    const [ticket, setTicket] = React.useContext(EditableTicketContext);

    return (
        <React.Fragment>
            <FormControl sx={{ marginTop: "1em" }} variant="standard" fullWidth>
                <Select
                    value={ticket.type !== -1 ? ticket.type : ''}
                    onChange={e => {
                        ticket.type = e.target.value as number;
                        setTicket({ ...ticket });
                    }}>
                    <MenuItem value={0}>Выбор одного варианта</MenuItem>
                    <MenuItem value={1}>Множественный выбор</MenuItem>
                    <MenuItem value={2}>Развернутый ответ</MenuItem>
                </Select>
                <FormHelperText>Выберите тип ответа</FormHelperText>
            </FormControl>
        </React.Fragment>
    )
}

function EditableTicket(params: { idx: number }) {
    const [ticket, setTicket] = React.useState<ITicket>((): ITicket => {
        const saved = localStorage.getItem("ticket");
        const initial = saved ? JSON.parse(saved) : EmptyTicket;
        return initial as ITicket;
    });


    React.useEffect(() => {
        localStorage.setItem("ticket", JSON.stringify(ticket));
    }, [ticket]);

    return (
        <EditableTicketContext.Provider value={[ticket, setTicket]}>
            <AppBar component="nav" color="default" variant="outlined">
                <Toolbar>
                    <Button color="primary">
                        <Typography >
                            СОХРАНИТЬ
                        </Typography>
                    </Button>
                    <Button color="error">
                        <Typography >
                            ОТМЕНИТЬ ИЗМЕНЕНИЯ
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Card variant="outlined">
                <CardMedia
                    sx={{ overflow: "clip" }}
                    component="img"
                    height="240px"
                    image={TicketPreviewDatas[ticket.type + 1].url}
                />
                <CardHeader
                    title={"Билет №" + (params.idx + 1)}
                    subheader={<EditableTicketTypeSelect />}
                />
                <CardContent>
                    <Box sx={{ width: "100%", padding: "2em" }} >
                        <EditableTicketCost />
                        <EditableTicketQuestion />
                        <EditableTicketDescription />
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ width: "100%", padding: "2em" }}>
                        <EditableTicketAnswer />
                    </Box>
                </CardContent>
            </Card>
        </EditableTicketContext.Provider>
    )
}

export default EditableTicket;