import { ReactNode, useState } from "react";

import React from "react";

import EditableTicket from "./EditableTicket";
import { AppBar, Box, Button, Card, CardActions, CardHeader, CardMedia, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar } from "@mui/material";
import { ITicket } from "./ITicket";
import { EmptyTicket } from "./TicketConstants";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AddOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";

import createTrigger from "react-use-trigger";
import useTriggerEffect from "react-use-trigger/useTriggerEffect";

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
                setTickets([...tickets, EmptyTicket]);
                scrollToBottomTrigger();
            }}
        >
            <AddOutlined />
        </Button>
    )
}

const TicketsPreviewList = React.forwardRef((_: any, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [tickets] = React.useContext(TicketEditorContext);

    return (
        <Grid2 container spacing={3}>
            {tickets.map((ticket, i) => (
                <TicketPreviewGrid key={i} content={<TicketPreview i={i} type={ticket.type} />} />
            ))}
            <TicketPreviewGrid key={tickets.length} content={<TicketAddButton />} ref={ref} />
        </Grid2>
    )
});

const TicketPreviewGrid = React.forwardRef((params: { content: React.ReactNode }, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <Grid2 xs={12} sm={6} md={3} ref={ref}>
            {params.content}
        </Grid2>
    )
});

type TicketEditorContextProps = [ITicket[], React.Dispatch<ITicket[]>, number, React.Dispatch<number>];

const TicketEditorContext = React.createContext<TicketEditorContextProps>({} as TicketEditorContextProps);

const scrollToBottomTrigger = createTrigger();

function TicketEditor(): ReactNode {
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
        if (currentTicketIdx !== -1)
            localStorage.setItem("ticket", JSON.stringify(tickets[currentTicketIdx]))
    }, [currentTicketIdx, tickets]);

    useTriggerEffect(() => {
        lastTicketPreviewRef.current?.scrollIntoView();
    }, scrollToBottomTrigger);



    return (
        <TicketEditorContext.Provider value={[tickets, setTickets, currentTicketIdx, setCurrentTicketIdx]}>
            {currentTicketIdx === -1
                ? <TicketsPreviewList ref={lastTicketPreviewRef} />
                : <EditableTicket idx={currentTicketIdx} />
            }
        </TicketEditorContext.Provider >
    )
}

export default TicketEditor;