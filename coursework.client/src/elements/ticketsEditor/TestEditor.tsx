import { ReactNode, useState } from "react";

import React from "react";

import EditableTicket from "./EditableTicket";
import { Typography, AppBar, Box, Button, Card, CardActions, CardHeader, CardMedia, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar, TextField } from "@mui/material";
import { EmptyTicket } from "./TicketConstants";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AddOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";

import createTrigger from "react-use-trigger";
import useTriggerEffect from "react-use-trigger/useTriggerEffect";
import { UUID } from "crypto";
import ITicket from "./ITicket";

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

type TicketDiscardContextParams = [boolean, React.Dispatch<boolean>];

const TicketDiscardContext = React.createContext<TicketDiscardContextParams>({} as TicketDiscardContextParams);

function TicketPreview(params: { i: number}) {
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

function DiscardTicketDialog() {
    const [open, setOpen] = React.useContext(TicketDiscardContext);
    const [testName, setTestName] = 

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>
                Введите название теста
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    multiline={true}
                    placeholder="Введите текст..."
                    value={ticket.data.description}
                    label="Название теста"
                />

                <DialogContentText>
                    Созданный тест нельзя будет удалить в дальнейшем
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="success"
                    onClick={() => {
                        localStorage.setItem("tickets", JSON.stringify([]));
                        localStorage.setItem("tickets", JSON.stringify([]));
                        setOpen(false);
                    }}
                >Продолжить</Button>
                <Button
                    color="primary"
                    onClick={() => setOpen(false)}
                >Отменить</Button>
            </DialogActions>
        </Dialog >
    );
}

const TicketPreviewGrid = React.forwardRef((params: { content: React.ReactNode }, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <Grid2 xs={12} sm={6} md={3} ref={ref}>
            {params.content}
        </Grid2>
    )
});


export type TicketEditorContextProps = [ITicket[], React.Dispatch<ITicket[]>, number, React.Dispatch<number>];

export const TicketEditorContext = React.createContext<TicketEditorContextProps>({} as TicketEditorContextProps);

function TestEditor() {
    const [openDiscardDialog, setOpenDiscardDialog] = React.useState<boolean>(false);

    const [tests, setTests] = React.useState<ITest[]>();

    React.useEffect(() => {
        populateTestsData();
    }, []);

    return (
        <React.Fragment>
            <AppBar component="nav" color="default" variant="outlined" elevation={0}>
                <Toolbar>
                    <Button
                        color="primary"
                        onClick={() => {
                            localStorage.setItem("tickets", JSON.stringify([]));
                        }}
                    >
                        <Typography >
                            СОЗДАТЬ ТЕСТ
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
           
            {tests !== undefined && <Grid2 container spacing={3}>
                {tests.map((ticket, i) => (
                    <TicketPreviewGrid key={i} content={<TicketPreview i={i} type={ticket.type} />} />
                ))}
            </Grid2>}
        </React.Fragment>
    )

    function populateTestsData() {

    }
}

export default TestEditor;