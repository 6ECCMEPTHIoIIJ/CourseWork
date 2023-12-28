import React from "react";

import { ITicket } from "./ITicket";
import { IFetchedTest, ITest } from "../ticketsEditor/TestEditor";
import { Alert, AlertTitle, AppBar, Box, Button, Card, CardContent, CardHeader, CardMedia, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemIcon, Radio, Snackbar, TextField, Toolbar, Typography } from "@mui/material";
import { TicketPreviewDatas } from "../ticketsEditor/TicketEditor";
import { UUID } from "crypto";

type EditableTicketContextProps = [ITest, React.Dispatch<ITest>];

const EditableTicketContext = React.createContext<EditableTicketContextProps>({} as EditableTicketContextProps);

type ErrContextParams = [boolean, React.Dispatch<boolean>];

const ErrContext = React.createContext<ErrContextParams>({} as ErrContextParams);

type SucContextParams = [boolean, React.Dispatch<boolean>];

const SucContext = React.createContext<SucContextParams>({} as SucContextParams);

function EditableTicketAnswerInput(params: { idx: number }) {
    const [test, setTest] = React.useContext(EditableTicketContext);

    return (
        <TextField
            fullWidth
            minRows={2}
            maxRows={30}
            multiline={true}
            placeholder="Введите текст..."
            value={test.tickets[params.idx].answer.input}
            label="Ответ"
            onChange={e => {
                test.tickets[params.idx].answer.input = e.target.value;
                setTest({ ...test });
            }} />
    )
}

function EditableTicketAnswerSelect(params: { idx: number, i: number, multiple: boolean }) {
    const [test, setTest] = React.useContext(EditableTicketContext);

    const checkedIdx = test.tickets[params.idx].answer.multiple.findIndex((value) => params.i === value);

    return (params.multiple
        ? <Checkbox
            edge="start"
            checked={checkedIdx !== -1}
            tabIndex={- 1}
            disableRipple
            onClick={() => {
                if (checkedIdx === -1)
                    test.tickets[params.idx].answer.multiple.push(params.i);
                else
                    test.tickets[params.idx].answer.multiple.splice(checkedIdx, 1);
                test.tickets[params.idx].answer.multiple.sort();
                setTest({ ...test });
            }}
        />
        : <Radio
            edge="start"
            checked={test.tickets[params.idx].answer.single === params.i}
            tabIndex={- 1}
            disableRipple
            onClick={() => {
                test.tickets[params.idx].answer.single = params.i;
                setTest({ ...test });
            }}
        />
    )
}

function EditableTicketAnswerChoise(params: { idx: number, multiple: boolean }) {
    const [test] = React.useContext(EditableTicketContext);

    return (
        <React.Fragment>
            <List>
                {test.tickets[params.idx].answer.variants.map((variant, i) => (
                    <ListItem
                        key={i}>
                        <ListItemIcon>
                            <EditableTicketAnswerSelect idx={params.idx} i={i} multiple={params.multiple} />
                        </ListItemIcon>
                        <Typography textAlign="justify">
                            {variant}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    )
}

export function convertFetchedTestToTest(test: IFetchedTest): ITest {
    return {
        id: test.id,
        name: test.name,
        tickets: test.tickets.map(ticket => {
            return {
                id: ticket.id,
                type: ticket.type,
                data: {
                    question: ticket.question,
                    description: ticket.description,
                    cost: ticket.cost
                },
                answer: {
                    single: -1,
                    multiple: [],
                    input: "",
                    variants: (() =>
                        ticket.variants !== undefined
                            ? ticket.variants.map(v => v.data)
                            : [])()
                }
            } as ITicket
        })
    }
}

type DiscardTestContextParams = [boolean, React.Dispatch<boolean>, UUID];

const DiscardTestContext = React.createContext<DiscardTestContextParams>({} as DiscardTestContextParams);

function SaveTestDialog() {
    const [open, setOpen, idx] = React.useContext(DiscardTestContext);
    const [test, setTest] = React.useContext(EditableTicketContext);

    const [, setErr] = React.useContext(ErrContext);
    const [, setSuc] = React.useContext(SucContext);

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>
                Вы уверены, что хотите завершить тест?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Преподавателю будет видна данная попытка
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="error"
                    onClick={() => {

                        setOpen(false);
                        fetch('api/PassedTickets/Many', {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(test.tickets.map((ticket) => {
                                return {
                                    ticketId: ticket.id,
                                    passedInput: {
                                        data: ticket.answer.input
                                    },
                                    passedSingle: {
                                        data: ticket.answer.single
                                    },
                                    passedMultiples:
                                        ticket.answer.multiple.map(m => { return { data: m } }) || []

                                }
                            }) || [])
                        }).then(r => {
                            if (r.ok) {
                                setTest(undefined);
                                localStorage.removeItem("test");
                                //r.json().then(d => setSucMsg(d.id));
                                setSuc(true);
                            }
                            else {
                                //r.json().then(d => setErrorMsg(d));
                                setErr(true);
                            }
                        })
                    }}
                >Да</Button>
                <Button
                    color="primary"
                    onClick={() => setOpen(false)}
                >Нет</Button>
            </DialogActions>
        </Dialog >
    );
}

export function Test(params: { idx: UUID }) {
    const [err, setErr] = React.useState<boolean>(false);
    const [suc, setSuc] = React.useState<boolean>(false);

    const [test, setTest] = React.useState<ITest>((): ITest => {
        const saved = localStorage.getItem("test");
        const initial = saved ? JSON.parse(saved) : undefined
        return initial as ITest;
    });

    React.useEffect(() => {
        if (test === undefined)
            fetch('api/Tests/' + params.idx)
                .then(r => r.json())
                .then(d => setTest(convertFetchedTestToTest(d)));
    }, [params.idx, test]);

    const [open, setOpen] = React.useState<boolean>(false);


    React.useEffect(() => {
        localStorage.setItem("test", JSON.stringify(test));
    }, [test]);

    return (
        <React.Fragment>

            {test !== undefined && <EditableTicketContext.Provider value={[test, setTest]}>
                <ErrContext.Provider value={[err, setErr]}>
                    <SucContext.Provider value={[suc, setSuc]}>
                        <DiscardTestContext.Provider value={[open, setOpen, params.idx]}>
                            <AppBar component="nav" color="default" variant="outlined" elevation={0}>
                                <Toolbar>
                                    {test.tickets.length != 0 && <Button
                                        color="primary"
                                        onClick={() => {
                                            setOpen(true);
                                        }}>
                                        <Typography >
                                            ЗАКОНЧИТЬ ТЕСТ
                                        </Typography>
                                    </Button>}
                                    <SaveTestDialog />
                                </Toolbar>
                            </AppBar>
                        </DiscardTestContext.Provider>
                        <Toolbar />
                        {test.tickets.map((ticket, i) => {
                            return (
                                <Card key={i} sx={{ marginBottom: "3em" }}>
                                    <CardMedia
                                        sx={{ overflow: "clip" }}
                                        component="img"
                                        height="149px"
                                        image={TicketPreviewDatas[ticket.type + 1].url}
                                    />
                                    <CardHeader
                                        title={"Билет №" + (i + 1)}
                                        subheader={TicketPreviewDatas[ticket.type + 1].name}
                                    />
                                    <CardContent>
                                        <Box sx={{ width: "100%", padding: "2em" }}>
                                            <Typography textAlign="justify" sx={{ marginBottom: "2em" }} gutterBottom>
                                                Стоимость: {ticket.data.cost}
                                            </Typography>
                                            <Typography textAlign="justify" sx={{ marginTop: "2em", fontWeight: 'normal' }} gutterBottom>
                                                Вопрос: {ticket.data.question}
                                            </Typography>
                                            {ticket.data.description !== "" &&
                                                <Typography textAlign="justify" gutterBottom sx={{ marginTop: "2em", fontWeight: 'light', fontStyle: "italic" }}>
                                                    Пояснение: {ticket.data.description}
                                                </Typography>}
                                        </Box>
                                        <Divider variant="middle" />
                                        <Box sx={{ width: "100%", padding: "2em" }}>
                                            {ticket.type === 0 && <EditableTicketAnswerChoise idx={i} multiple={false} />}
                                            {ticket.type === 1 && <EditableTicketAnswerChoise idx={i} multiple={true} />}
                                            {ticket.type === 2 && <EditableTicketAnswerInput idx={i} />}
                                        </Box>
                                    </CardContent>
                                </Card>
                            )
                        })}

                        <Snackbar
                            open={err}
                            onClose={() => {
                                setErr(false)
                            }}
                        >
                            <Alert
                                sx={{ width: '100%' }}
                                severity="error"
                                onClose={() => {
                                    setErr(false)
                                }}>
                                <AlertTitle>Ошибка</AlertTitle>
                            </Alert>

                        </Snackbar>
                        <Snackbar
                            open={suc}
                            onClose={() => {
                                setSuc(false)
                            }}
                        >
                            <Alert
                                sx={{ width: '100%' }}
                                severity="success"
                                onClose={() => {
                                    setSuc(false);
                                }}>
                                <AlertTitle>Отправлено</AlertTitle>
                                <Typography>Ваши результаты засчитаны</Typography>
                            </Alert>
                        </Snackbar>
                    </SucContext.Provider>
                </ErrContext.Provider>
            </EditableTicketContext.Provider>}
            {test === undefined && <CircularProgress />}
        </React.Fragment >
    )
}

