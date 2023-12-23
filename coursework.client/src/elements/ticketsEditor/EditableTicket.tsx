import React from "react";

import { ITicket } from "./ITicket";
import { EmptyTicket } from "./TicketConstants";
import { Button, Card, CardContent, CardHeader, CardMedia, Checkbox, FormControl, FormHelperText, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { TicketPreviewDatas } from "./TicketEditor";
import { AddOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";

import Grid2 from "@mui/material/Unstable_Grid2";
import createTrigger from "react-use-trigger";
import useTriggerEffect from "react-use-trigger/useTriggerEffect";

const scrollToBottomTrigger = createTrigger();

function EditableTicket(params: { idx: number }) {
    const [ticket, setTicket] = React.useState<ITicket>((): ITicket => {
        const saved = localStorage.getItem("ticket");
        const initial = saved ? JSON.parse(saved) : EmptyTicket;
        return initial as ITicket;
    });

    const lastAnswerRef = React.createRef<HTMLButtonElement>();

    React.useEffect(() => {
        localStorage.setItem("ticket", JSON.stringify(ticket));
    }, [ticket]);

    useTriggerEffect(() => {
        lastAnswerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, scrollToBottomTrigger);

    return (
        <Card variant="outlined">
            <CardMedia
                sx={{ overflow: "clip" }}
                component="img"
                height="240px"
                image={TicketPreviewDatas[ticket.type + 1].url}
            />
            <CardHeader
                title={"Билет №" + (params.idx + 1)}
                subheader={
                    <React.Fragment>
                        <FormControl sx={{ marginTop: "1em" }} variant="standard" fullWidth>
                            <Select
                                value={ticket.type !== -1 ? ticket.type : undefined}
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
                }
            />
            <CardContent>
                <Grid2 container spacing={3}>
                    <Grid2 xs={12}>
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
                        <TextField
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
                    </Grid2>
                    <Grid2 xs={12}>
                        {ticket.type === 0 || ticket.type === 1
                            ? (
                                <React.Fragment>
                                    <List>
                                        {ticket.answer.variants.map((variant, i) => (
                                            <ListItem
                                                secondaryAction={
                                                    <IconButton
                                                        edge="end" color="error"
                                                        onClick={() => {
                                                            ticket.answer.variants.splice(i, 1);
                                                            if (ticket.answer.single == i)
                                                                ticket.answer.single = -1;
                                                            else if (ticket.answer.single > i)
                                                                ticket.answer.single--;
                                                            setTicket({ ...ticket });
                                                        }}>
                                                        <DeleteOutlined />
                                                    </IconButton>
                                                }>
                                                <ListItemIcon>
                                                    <Radio
                                                        edge="start"
                                                        checked={ticket.type === 0
                                                            ? ticket.answer.single === i
                                                            : false}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        onClick={() => {
                                                            if (ticket.type === 0)
                                                                ticket.answer.single = i;
                                                            setTicket({ ...ticket });
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <TextField
                                                    fullWidth
                                                    minRows={1}
                                                    maxRows={3}
                                                    multiline={true}
                                                    placeholder="Введите ответ..."
                                                    value={variant}
                                                    label="Ответ"
                                                    onChange={e => {
                                                        ticket.answer.variants[i] = e.target.value;
                                                        setTicket({ ...ticket });
                                                    }} />
                                            </ListItem>
                                        ))}
                                    </List>
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
                                </React.Fragment>
                            )
                            : (
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
                    </Grid2>
                </Grid2>
            </CardContent>
            {/*<CardBody className="p-2">*/}
            {/*    <Row className="w-100">*/}
            {/*        <Col className="col-7">*/}
            {/*            */}{/*<TicketQuestion idx={params.idx} />*/}
            {/*            */}{/*<TicketDescription idx={params.idx} />*/}
            {/*            */}{/*<TicketCost idx={params.idx} />*/}
            {/*        </Col>*/}
            {/*        <Col className="col-5">*/}
            {/*            */}{/*<TicketAnswer idx={params.idx} />*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</CardBody>*/}
        </Card>
    )
}

export default EditableTicket;