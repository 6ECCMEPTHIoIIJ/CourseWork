import { ReactNode, useState } from "react";

import React from "react";

import EditableTicket from "./EditableTicket";
import { Typography, AppBar, Box, Button, Card, CardActions, CardHeader, CardMedia, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar, TextField, Snackbar, Alert, AlertTitle } from "@mui/material";
import { ITicket } from "./ITicket";
import { EmptyTicket } from "./TicketConstants";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AddOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";

import createTrigger from "react-use-trigger";
import useTriggerEffect from "react-use-trigger/useTriggerEffect";
import { convertTestToFetchedTest } from "./TestEditor";
import { UUID } from "crypto";
import { useNavigate } from "react-router-dom";
import { TypeContext } from "../../App";
import { useSignOut, useAuthHeader } from "react-auth-kit";

interface TicketPreviewData {
    url: string;
    name: string;
}

export const TicketPreviewDatas: TicketPreviewData[] = [
    {
        url: "https://art.kartinkof.club/uploads/posts/2023-06/thumbs/1685774638_art-kartinkof-club-p-znak-voprosa-art-47.jpg",
        name: "Не задано..."
    },
    {
        url: "https://skysft.com/wp-content/uploads/2019/08/decision-making.jpg",
        name: "Выбор одного варианта"
    },
    {
        url: "https://media.istockphoto.com/id/1195433295/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%8E%D1%80%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9-%D0%BF%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6-%D1%81-%D1%80%D0%B0%D0%B7%D0%BE%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B8-%D0%B8-%D1%83%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D0%B8-%D1%81%D1%82%D1%80%D0%B5%D0%BB%D0%BA%D0%B8-%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D1%8B%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%B5-%D0%B4%D0%B2%D0%B0-%D1%80%D0%B0%D0%B7%D0%BB%D0%B8%D1%87%D0%BD%D1%8B%D1%85.jpg?s=612x612&w=0&k=20&c=rGkLEjYN_R43n8NaMrqfnPls7p5SUu9zWYp1bXj0Zrc=",
        name: "Множественный выбор"
    },
    {
        url: "https://www.mgpu.ru/wp-content/uploads/2018/11/sochin.jpg",
        name: "Развернутый ответ"
    }
];

type TicketPreviewContextParams = [boolean, React.Dispatch<boolean>];

const TicketPreviewContext = React.createContext<TicketPreviewContextParams>({} as TicketPreviewContextParams);

function DeleteTicketDialog(params: { i: number }) {
    const [tickets, setTickets] = React.useContext(TicketEditorContext);
    const [open, setOpen] = React.useContext(TicketPreviewContext);

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>
                Вы уверены, что хотите удалить билет?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Данное действие нельзя будет отменить после сохранения теста
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="error"
                    onClick={() => {
                        tickets.splice(params.i, 1);
                        setTickets([...tickets]);
                        setOpen(false);
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

type SaveTestContextParams = [boolean, React.Dispatch<boolean>];

const SaveTestContext = React.createContext<SaveTestContextParams>({} as SaveTestContextParams);

type ErrContextParams = [boolean, React.Dispatch<boolean>, string, React.Dispatch<string>];

const ErrContext = React.createContext<ErrContextParams>({} as ErrContextParams);

type SucContextParams = [boolean, React.Dispatch<boolean>, UUID, React.Dispatch<UUID>];

const SucContext = React.createContext<SucContextParams>({} as SucContextParams);

function SaveTestDialog() {
    const [tickets, setTickets, , setTicketIdx] = React.useContext(TicketEditorContext);
    const [, setErr, , setErrorMsg] = React.useContext(ErrContext);
    const [, setSuc, , setSucMsg] = React.useContext(SucContext);
    const [open, setOpen] = React.useContext(SaveTestContext);


    const [name, setName] = React.useState<string>("");

    const kasdfas = useAuthHeader();
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>
                Вы уверены, что хотите добавить тест в банк тестов?
            </DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ marginTop: "1em" }}
                    fullWidth
                    multiline={false}
                    label="Название теста"
                    placeholder="Введите текст..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <DialogContentText>
                    Данное действие нельзя будет отменить в дальнейшем
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="success"
                    onClick={() => {
                        setName("");
                        fetch("api/Tests", {
                            method: "POST",
                            headers: {
                                "access-control-allow-origin": "*", 
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': kasdfas()
                            },
                            body: JSON.stringify(convertTestToFetchedTest({ name: name, tickets: tickets }))
                        }).then(r => {
                            if (r.ok) {
                                setTickets([]);
                                setTicketIdx(-1);
                                localStorage.removeItem("tickets");
                                localStorage.removeItem("ticketIdx");
                                r.json().then(d => setSucMsg(d.id));
                                setSuc(true);
                            }
                            else {
                                r.json().then(d => setErrorMsg(d));
                                setErr(true);
                            }
                        });

                        setOpen(false);
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

type DiscardTestContextParams = [boolean, React.Dispatch<boolean>];

const DiscardTestContext = React.createContext<DiscardTestContextParams>({} as DiscardTestContextParams);

function DiscardTestDialog() {
    const [, setTickets, , setTicketIdx] = React.useContext(TicketEditorContext);
    const [open, setOpen] = React.useContext(DiscardTestContext);

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>
                Вы уверены, что хотите отменить все измения?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Данное действие нельзя будет отменить в дальнейшем
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="error"
                    onClick={() => {
                        setTickets([]);
                        setTicketIdx(-1);
                        localStorage.removeItem("tickets");
                        localStorage.removeItem("ticketIdx");
                        setOpen(false);
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

function TicketPreview(params: { i: number, type: number }) {
    const [, , , setCurrentTicketIdx] = React.useContext(TicketEditorContext);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);


    const data: TicketPreviewData = TicketPreviewDatas[params.type + 1];

    return (
        <React.Fragment>
            <Card variant="outlined">
                <CardMedia
                    sx={{ overflow: "clip" }}
                    component="img"
                    height="140px"
                    image={data.url}
                />
                <CardHeader
                    title={"Билет №" + (params.i + 1)}
                    subheader={data.name}
                />
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                            setCurrentTicketIdx(params.i);
                        }}
                    >
                        РЕДАКТИРОВАТЬ
                    </Button>


                    <Button
                        size="small"
                        color="error"
                        onClick={() => {
                            setOpenDeleteDialog(true);
                        }}>
                        УДАЛИТЬ
                    </Button>
                </CardActions>
            </Card>
            <TicketPreviewContext.Provider value={[openDeleteDialog, setOpenDeleteDialog]}>
                <DeleteTicketDialog i={params.i} />
            </TicketPreviewContext.Provider>
        </React.Fragment>
    )
}


function TicketAddButton() {
    const [tickets, setTickets] = React.useContext(TicketEditorContext);

    return (
        <Button
            color="primary"
            variant="outlined"
            aria-label="add"
            sx={{ width: "100%", height: "100%" }}
            onClick={() => {
                setTickets([...tickets, EmptyTicket()]);
                scrollToBottomTrigger();
            }}
        >
            <AddOutlined />
        </Button>
    )
}

const TicketsPreviewList = React.forwardRef((_: any, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [tickets] = React.useContext(TicketEditorContext);
    const [openSave, setOpenSave] = React.useState<boolean>(false);
    const [openDiscard, setOpenDiscard] = React.useState<boolean>(false);

    return (
        <React.Fragment>
            <AppBar component="nav" color="default" variant="outlined" elevation={0}>
                <Toolbar>
                    {tickets.length != 0 && <Button
                        color="primary"
                        onClick={() => {
                            setOpenSave(true);
                        }}>
                        <Typography >
                            ДОБАВИТЬ В БАНК ТЕСТОВ
                        </Typography>
                    </Button>}
                    <SaveTestContext.Provider value={[openSave, setOpenSave]}>
                        <SaveTestDialog />
                    </SaveTestContext.Provider>
                    <Button
                        color={tickets.length != 0 ? "error" : "primary"}
                        onClick={() => {
                            if (tickets.length != 0)
                                setOpenDiscard(true);
                            else {
                                localStorage.removeItem("tickets");
                                localStorage.removeItem("ticketIdx");
                            }
                        }}>
                        {tickets.length != 0 && <Typography >
                            УДАЛИТЬ ТЕСТ
                        </Typography>}
                        {tickets.length == 0 && <Typography >
                            НАЗАД
                        </Typography>}
                    </Button>
                    <DiscardTestContext.Provider value={[openDiscard, setOpenDiscard]}>
                        <DiscardTestDialog />
                    </DiscardTestContext.Provider>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Grid2 container spacing={3}>
                {tickets.map((ticket, i) => (
                    <TicketPreviewGrid key={i} content={<TicketPreview i={i} type={ticket.type} />} />
                ))}
                <TicketPreviewGrid key={tickets.length} content={<TicketAddButton />} ref={ref} />
            </Grid2>
        </React.Fragment>
    )
});

const TicketPreviewGrid = React.forwardRef((params: { content: React.ReactNode }, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <Grid2 xs={12} sm={6} md={3} ref={ref}>
            {params.content}
        </Grid2>
    )
});

export type TicketEditorContextProps = [ITicket[], React.Dispatch<ITicket[]>, number, React.Dispatch<number>];

export const TicketEditorContext = React.createContext<TicketEditorContextProps>({} as TicketEditorContextProps);

const scrollToBottomTrigger = createTrigger();

function TicketEditor(): ReactNode {
    const [type, setType] = React.useContext(TypeContext);
    const navigate = useNavigate();
    const s = useSignOut();

    React.useEffect(() => {
        if (type !== true && type !== null) {
            s();
            navigate("/auth");
        }
    }, []);

    const [err, setErr] = React.useState<boolean>(false);
    const [suc, setSuc] = React.useState<boolean>(false);
    const [errorMsg, setErrorMsg] = React.useState<string>("");
    const [tickedID, setTicketId] = React.useState<UUID>();


    const [tickets, setTickets] = React.useState<ITicket[]>((): ITicket[] => {
        const saved = localStorage.getItem("tickets");
        const initial = saved ? JSON.parse(saved) : [];
        return initial as ITicket[];
    });

    const [currentTicketIdx, setCurrentTicketIdx] = React.useState<number>((): number => {
        const saved = localStorage.getItem("ticketIdx");
        const initial = saved ? JSON.parse(saved) : -1;
        return initial as number;
    });


    const lastTicketPreviewRef = React.createRef<HTMLDivElement>();


    React.useEffect(() => {
        localStorage.setItem("tickets", JSON.stringify(tickets));
    }, [tickets]);

    React.useEffect(() => {
        localStorage.setItem("ticketIdx", JSON.stringify(currentTicketIdx));
    }, [currentTicketIdx]);

    useTriggerEffect(() => {
        lastTicketPreviewRef.current?.scrollIntoView();
    }, scrollToBottomTrigger);



    return (
        <TicketEditorContext.Provider value={[tickets, setTickets, currentTicketIdx, setCurrentTicketIdx]}>
            <ErrContext.Provider value={[err, setErr, errorMsg, setErrorMsg]}>
                <SucContext.Provider value={[suc, setSuc, tickedID, setTicketId]}>
                    {currentTicketIdx === -1 && <TicketsPreviewList ref={lastTicketPreviewRef} />}
                    {currentTicketIdx !== -1 && <EditableTicket />}
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
                            <Typography>{errorMsg}</Typography>
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
                            <Typography>Тест успешно добавлен в банк тестов {tickedID}</Typography>
                        </Alert>
                    </Snackbar>
                </SucContext.Provider>
            </ErrContext.Provider>
        </TicketEditorContext.Provider >

    )
}

export default TicketEditor;