import { ReactNode, useState } from "react";

import React from "react";

import EditableTicket from "./EditableTicket";
import { Typography, AppBar, Box, Button, Card, CardActions, CardHeader, CardMedia, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar } from "@mui/material";
import { EmptyTicket } from "./TicketConstants";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AddOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";

import createTrigger from "react-use-trigger";
import useTriggerEffect from "react-use-trigger/useTriggerEffect";
import { UUID } from "crypto";

interface TicketPreviewData {
    url: string;
}

export interface ITest {
    id: UUID;
    name: string;
    tickets: ITicket[];
}

export const TestPreviewData: TicketPreviewData = 
    {
        url: "https://static.tildacdn.com/tild6462-3261-4263-b231-346661373936/1626130055_40-kartin.jpg",
    }

type TicketPreviewContextParams = [boolean, React.Dispatch<boolean>];

const TicketPreviewContext = React.createContext<TicketPreviewContextParams>({} as TicketPreviewContextParams);

function DeleteTicketDialog(params: { i: number }) {
    const [tickets, setTickets] = React.useContext(TestEditorContext);
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

function TicketPreview(params: { i: number, type: number }) {
    const [, , , setCurrentTicketIdx] = React.useContext(TestEditorContext);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);



    return (
        <React.Fragment>
            <Card variant="outlined">
                <CardMedia
                    sx={{ overflow: "clip" }}
                    component="img"
                    height="140px"
                    image={TestPreviewData.url}
                />
                <CardHeader
                    title={"Тест №" + (params.i + 1)}
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
    const [tickets, setTickets] = React.useContext(TestEditorContext);

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
    const [tickets] = React.useContext(TestEditorContext);

    return (
        <React.Fragment>
            <AppBar component="nav" color="default" variant="outlined" elevation={0}>
                <Toolbar>
                    <Button
                        color="primary"

                    >
                        <Typography >
                            СОХРАНИТЬ
                        </Typography>
                    </Button>
                    <Button
                        color="error"
                    >
                        <Typography >
                            ОТМЕНИТЬ ИЗМЕНЕНИЯ
                        </Typography>
                    </Button>
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

export type TestEditorContextProps = [ITest[], React.Dispatch<ITest[]>, number, React.Dispatch<number>];

export const TestEditorContext = React.createContext<TestEditorContextProps>({} as TestEditorContextProps);

const scrollToBottomTrigger = createTrigger();

function TestEditor(): ReactNode {
    const [tests, setTests] = React.useState<ITest[]>((): ITest[] => {
        const saved = localStorage.getItem("tests");
        const initial = saved ? JSON.parse(saved) : [];
        return initial as ITest[];
    });

    const [currentTestIdx, setCurrentTestIdx] = React.useState<number>((): number => {
        const saved = localStorage.getItem("testIdx");
        const initial = saved ? JSON.parse(saved) : -1;
        return initial as number;
    });


    const lastTicketPreviewRef = React.createRef<HTMLDivElement>();


    React.useEffect(() => {
        localStorage.setItem("tests", JSON.stringify(tests));
    }, [tests]);

    React.useEffect(() => {
        localStorage.setItem("testIdx", JSON.stringify(setCurrentTestIdx));
    }, [currentTestIdx]);

    useTriggerEffect(() => {
        lastTicketPreviewRef.current?.scrollIntoView();
    }, scrollToBottomTrigger);



    return (
        <TestEditorContext.Provider value={[tickets, setTickets, currentTicketIdx, setCurrentTicketIdx]}>
            {currentTicketIdx === -1 && <TicketsPreviewList ref={lastTicketPreviewRef} />}
            {currentTicketIdx !== -1 && <EditableTicket />}
        </TestEditorContext.Provider >
    )
}

export default TestEditor;