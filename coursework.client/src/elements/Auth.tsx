import { Alert, AlertTitle, Button, CardActions, CardContent, Container, Snackbar, Typography } from "@mui/material";
import { Card, TextField } from "@mui/material";
import React from "react";
import { CardHeader } from "@mui/material";
import { useSignIn } from "react-auth-kit";
import { TypeContext } from "../App";
import { useNavigate } from "react-router-dom";


export function Auth() {
    const [type, setType] = React.useContext(TypeContext);

    const [l, setL] = React.useState<string>("")
    const [p, setP] = React.useState<string>("")
    const [m, setM] = React.useState<string>("")
    const [al, setAl] = React.useState<boolean>(false)
    const [err, setErr] = React.useState<boolean>(false)
    const [em, setEm] = React.useState<string>("")

    const sign = useSignIn();
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Container style={{ width: "90%", maxWidth: "400px" }}>
                <Card>
                    <CardHeader title={"Вход"} sx={{ marginBottom: "2em" }} />
                    <CardActions sx={{ marginBottom: "2em" }}>
                        {type !== true && <Button onClick={() => setType(true)}>
                            ДЛЯ ПРЕПОДАВАТЕЛЕЙ
                        </Button>}
                        {type !== false && <Button onClick={() => setType(false)}>
                            ДЛЯ СТУДЕНТОВ
                        </Button>}
                    </CardActions>

                    <CardContent>
                        {type === true && <TextField
                            required
                            style={{ marginBottom: "2em" }}
                            fullWidth
                            multiline={false}
                            label="Логин"
                            value={l}
                            placeholder="Введите Логин..."
                            onChange={e => setL(e.target.value)}
                        />}
                        {type === false && <TextField
                            required
                            style={{ marginBottom: "2em" }}
                            type="number"
                            fullWidth
                            multiline={false}
                            label="Номер зачетной книжки"
                            value={l}
                            placeholder="Введите Номер зачетной книжки..."
                            onChange={e => setL(e.target.value)}
                        />}
                        {(type === true || type === false) && <TextField
                            required
                            style={{ marginBottom: "2em" }}
                            type="password"
                            fullWidth
                            multiline={false}
                            value={p}
                            label="Пароль"
                            placeholder="Введите Пароль..."
                            onChange={e => setP(e.target.value)}
                        />}
                    </CardContent>
                    <CardActions>
                        {(type === true || type === false) && <Button onClick={() => {
                            let str = "";
                            if (l === "" || l === "") {
                                setAl(true);
                                str += "Поле" + (type === true && " логина" || type === false && " номера зачетной книжки") + " не может быть пустым; ";
                            } if (p === "") {
                                setAl(true);
                                str += "Поле пароля не может быть пустым; ";
                            } else {
                                fetch("api/JwtToken", {
                                    method: "POST",
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ l: l, p: p })
                                }
                                ).then(r => {
                                    if (r.ok) {
                                        r.json().then(d => {
                                            setL("");
                                            if (sign({
                                                token: d.token.token,
                                                tokenType: "Bearer",
                                                expiresIn: d.token.lifetime,
                                                authState: {
                                                    id: d.teacher.id,
                                                    firstname: d.teacher.firstname,
                                                    lastname: d.teacher.lastname,
                                                    patronymic: d.teacher.patronymic
                                                }
                                            }))
                                                navigate(type ? "/teacher" : "/student");
                                        });
                                    } else {
                                        r.json().then(d => setEm(d));
                                        setErr(true)
                                    }
                                });
                                
                            }
                            setM(str);
                            setP("");
                        }}>{"ВОЙТИ"+ (type === true && " КАК ПРЕПОДАВАТЕЛЬ" || type === false && " КАК СТУДЕНТ" || "")}</Button>}
                    </CardActions>
                </Card>
            </Container>
            <Snackbar
                open={al}
                onClose={() => {
                    setAl(false)
                }}
            >
                <Alert
                    sx={{ width: '100%' }}
                    severity="warning"
                    onClose={() => {
                        setAl(false);
                    }}>
                    <AlertTitle>Внимание</AlertTitle>
                    <Typography>{m}</Typography>
                </Alert>
            </Snackbar>
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
                        setErr(false);
                    }}>
                    <AlertTitle>Ошибка</AlertTitle>
                    <Typography>{em}</Typography>
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}