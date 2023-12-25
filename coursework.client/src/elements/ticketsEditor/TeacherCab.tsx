import React from "react";

export interface IFetchedTeacher {
    firstname: string;
    lastname: string;
    patronymic: string;
    login: string;
    password: string;
    tests: IFetchedTest[];
}

export interface IFetchedTest {
    name: string;
    tickets: IFetchedTicket[];
    teacher: IFetchedTeacher;
}

export interface IFetchedTicket {
    type: number;
    question: string;
    description: string;
    cost: number;
    input?: IInput;
    multiples?: IChoise[];
    single?: IChoise;
    variants?: IInput[];
}

export interface IChoise {
    data: number;
}

export interface IInput {
    data: string;
}

export const TeacherContext = React.createContext<IFetchedTeacher>({} as IFetchedTeacher);
function TeacherCab() {
    const [teacher, setTeacher] = React.useState<IFetchedTeacher>();

    React.useEffect(() => {
        fetch('api/Teachers')
    }, []);
}