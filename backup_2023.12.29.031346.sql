--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-1.pgdg20.04+1)
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: inputs; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.inputs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    data text NOT NULL,
    ticket_id uuid
);


ALTER TABLE public.inputs OWNER TO gen_user;

--
-- Name: multiples; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.multiples (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    data integer NOT NULL,
    ticket_id uuid
);


ALTER TABLE public.multiples OWNER TO gen_user;

--
-- Name: passed_inputs; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.passed_inputs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    passed_ticket_id uuid,
    data text NOT NULL,
    correct boolean
);


ALTER TABLE public.passed_inputs OWNER TO gen_user;

--
-- Name: passed_multiples; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.passed_multiples (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    passed_ticket_id uuid,
    data integer NOT NULL
);


ALTER TABLE public.passed_multiples OWNER TO gen_user;

--
-- Name: passed_singles; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.passed_singles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    passed_ticket_id uuid,
    data integer NOT NULL
);


ALTER TABLE public.passed_singles OWNER TO gen_user;

--
-- Name: passed_test; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.passed_test (
    id uuid NOT NULL,
    student_id character(10) NOT NULL,
    test_id uuid NOT NULL,
    score integer NOT NULL
);


ALTER TABLE public.passed_test OWNER TO gen_user;

--
-- Name: passed_tickets; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.passed_tickets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    ticked_id uuid,
    student_id character(10)
);


ALTER TABLE public.passed_tickets OWNER TO gen_user;

--
-- Name: singles; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.singles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    data integer NOT NULL,
    ticket_id uuid
);


ALTER TABLE public.singles OWNER TO gen_user;

--
-- Name: students; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.students (
    passbook_number character(10) NOT NULL,
    firstname character varying(31) NOT NULL,
    lastname character varying(31) NOT NULL,
    patronymic character varying(31) NOT NULL,
    student_group character varying(31) NOT NULL,
    password character varying(31) NOT NULL
);


ALTER TABLE public.students OWNER TO gen_user;

--
-- Name: teachers; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.teachers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    firstname character varying(31) NOT NULL,
    lastname character varying(31) NOT NULL,
    patronymic character varying(31) NOT NULL,
    login character varying(31) NOT NULL,
    password character varying(31) NOT NULL
);


ALTER TABLE public.teachers OWNER TO gen_user;

--
-- Name: tests; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.tests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    teacher_id uuid,
    passed boolean DEFAULT false NOT NULL
);


ALTER TABLE public.tests OWNER TO gen_user;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.tickets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    type integer NOT NULL,
    question text NOT NULL,
    description text NOT NULL,
    cost integer NOT NULL,
    test_id uuid
);


ALTER TABLE public.tickets OWNER TO gen_user;

--
-- Name: variants; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.variants (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    data text NOT NULL,
    ticket_id uuid
);


ALTER TABLE public.variants OWNER TO gen_user;

--
-- Data for Name: inputs; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.inputs (id, data, ticket_id) FROM stdin;
ab69b6eb-efaf-40d4-bb7c-6a35d67f039d		61afad6d-56a4-43e1-bc99-7e89fe7d236e
\.


--
-- Data for Name: multiples; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.multiples (id, data, ticket_id) FROM stdin;
92cec191-cf59-48dc-8523-19049957fcaf	0	cb9ebf1a-7762-42c4-88ef-726960a33ba1
10280b97-ddae-4aa3-9380-1b3d61c2f8dd	1	cb9ebf1a-7762-42c4-88ef-726960a33ba1
9f6dcaec-a88c-4221-86aa-997854d82e5f	1	25fc7f9d-287f-49e5-b4e5-f824dae0b81c
7e3f2c3a-4761-46c0-8808-69ddf94aab88	2	25fc7f9d-287f-49e5-b4e5-f824dae0b81c
\.


--
-- Data for Name: passed_inputs; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.passed_inputs (id, passed_ticket_id, data, correct) FROM stdin;
d3a9de0f-3fd6-404e-892e-68748a14d88a	99c26f81-2d20-4a74-8b5c-00dc38fee93d		\N
c4ad2661-e944-46d9-904b-d70a78b12e71	2a564af1-9c62-454f-bfe4-3ad70eae106a		\N
2a02be56-c1ce-425b-84ac-c13a1ff92103	fc9a053a-b4ef-4044-95df-5a5a64ba6d40		\N
3113ec80-fbef-46be-9fc9-3997f1257b22	9aca0d03-006b-4542-a7b9-b903fc87113b		\N
a1f94b2d-29d7-4278-8e7f-43fdcdf6c013	053439cc-a86b-4185-a059-4da214e67433		\N
\.


--
-- Data for Name: passed_multiples; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.passed_multiples (id, passed_ticket_id, data) FROM stdin;
c965884c-d638-4465-97f9-b625833d68a2	2a564af1-9c62-454f-bfe4-3ad70eae106a	0
b920de3c-f415-41f9-9eec-5b18d752c9a5	2a564af1-9c62-454f-bfe4-3ad70eae106a	1
3a33d8ea-894a-4162-a618-251dc49603b0	fc9a053a-b4ef-4044-95df-5a5a64ba6d40	0
\.


--
-- Data for Name: passed_singles; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.passed_singles (id, passed_ticket_id, data) FROM stdin;
953c842a-51ec-4b69-968e-0691f9ea6a2b	99c26f81-2d20-4a74-8b5c-00dc38fee93d	-1
e98e7436-725b-483e-8b66-1b17500e9de9	2a564af1-9c62-454f-bfe4-3ad70eae106a	-1
540bd964-8b29-46a1-8335-2bb313b26ed0	fc9a053a-b4ef-4044-95df-5a5a64ba6d40	-1
712fe614-d215-41f2-a448-83b6b966b0ae	9aca0d03-006b-4542-a7b9-b903fc87113b	-1
11afe27f-9fc6-4876-8a30-2ba72a89bd87	053439cc-a86b-4185-a059-4da214e67433	-1
\.


--
-- Data for Name: passed_test; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.passed_test (id, student_id, test_id, score) FROM stdin;
\.


--
-- Data for Name: passed_tickets; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.passed_tickets (id, ticked_id, student_id) FROM stdin;
99c26f81-2d20-4a74-8b5c-00dc38fee93d	\N	\N
2a564af1-9c62-454f-bfe4-3ad70eae106a	\N	\N
fc9a053a-b4ef-4044-95df-5a5a64ba6d40	\N	\N
9aca0d03-006b-4542-a7b9-b903fc87113b	\N	\N
053439cc-a86b-4185-a059-4da214e67433	\N	\N
\.


--
-- Data for Name: singles; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.singles (id, data, ticket_id) FROM stdin;
38c8ed88-3228-4d2c-903f-0fc7490f8f78	0	3a0cee7b-ba24-4a68-afdd-f69230d0f75a
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.students (passbook_number, firstname, lastname, patronymic, student_group, password) FROM stdin;
1234567890	Иван	Петров	Сергеевич	Группа1	пароль1
2345678901	Екатерина	Иванова	Александровна	Группа2	пароль2
3456789012	Алексей	Смирнов	Дмитриевич	Группа3	пароль3
4567890123	Светлана	Козлова	Анатольевна	Группа4	пароль4
5678901234	Михаил	Тарасов	Игоревич	Группа5	пароль5
6789012345	Анна	Мельникова	Ивановна	Группа6	пароль6
7890123456	Дмитрий	Васильев	Петрович	Группа7	пароль7
8901234567	Елена	Сидорова	Викторовна	Группа8	пароль8
9012345678	Сергей	Павлов	Алексеевич	Группа9	пароль9
0123456789	Ольга	Кузнецова	Игоревна	Группа10	пароль10
1234567899	Иванов	Иван	Иванович	ВТ-212	qwerty
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.teachers (id, firstname, lastname, patronymic, login, password) FROM stdin;
f2c19fa0-e6d0-48cb-ab53-d47b0520f6e4	Шамраев	Анатолий	Анатольевич	string	string
\.


--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.tests (id, name, teacher_id, passed) FROM stdin;
e16506ad-a0c7-4da7-9782-da83f3a4d20a	Тест	\N	f
d31e87f7-eba0-4b2e-bfab-4688cdbb4573	123	\N	f
88d0a18c-3281-4dee-b84c-84b8aa69367a	asdasd	\N	f
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.tickets (id, type, question, description, cost, test_id) FROM stdin;
cb9ebf1a-7762-42c4-88ef-726960a33ba1	1	Вопрос	Пояснение	12	e16506ad-a0c7-4da7-9782-da83f3a4d20a
25fc7f9d-287f-49e5-b4e5-f824dae0b81c	1	23		12	d31e87f7-eba0-4b2e-bfab-4688cdbb4573
3a0cee7b-ba24-4a68-afdd-f69230d0f75a	0	ывфы	фыв	23	d31e87f7-eba0-4b2e-bfab-4688cdbb4573
61afad6d-56a4-43e1-bc99-7e89fe7d236e	2	ewq		12	88d0a18c-3281-4dee-b84c-84b8aa69367a
\.


--
-- Data for Name: variants; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.variants (id, data, ticket_id) FROM stdin;
84aa9914-2c36-41aa-8b8b-431853332317	Ответ 1	cb9ebf1a-7762-42c4-88ef-726960a33ba1
e410e425-e3f0-40d7-bbde-dcec6f8d3725	Ответ 2	cb9ebf1a-7762-42c4-88ef-726960a33ba1
392e2cc4-0cbb-47da-91a9-7a3d4a9504e5	4	3a0cee7b-ba24-4a68-afdd-f69230d0f75a
c837eba7-c6a3-4eae-b663-94f3d478c50d	3	25fc7f9d-287f-49e5-b4e5-f824dae0b81c
24c22bb4-491e-4c10-9b82-4068b97d919a	1	3a0cee7b-ba24-4a68-afdd-f69230d0f75a
380a7f22-2a25-400c-b566-1a5b957c438f	3	3a0cee7b-ba24-4a68-afdd-f69230d0f75a
cd4d90a5-02f8-4061-9365-c4120643c08e	2	25fc7f9d-287f-49e5-b4e5-f824dae0b81c
2ed89992-cb79-4727-b7c0-348cea5c23c2	2	3a0cee7b-ba24-4a68-afdd-f69230d0f75a
d605cf77-6ad3-4c0d-8b80-5b2ce7028975	1	25fc7f9d-287f-49e5-b4e5-f824dae0b81c
\.


--
-- Name: inputs inputs_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.inputs
    ADD CONSTRAINT inputs_pkey PRIMARY KEY (id);


--
-- Name: inputs inputs_ticket_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.inputs
    ADD CONSTRAINT inputs_ticket_id_key UNIQUE (ticket_id);


--
-- Name: multiples multiples_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.multiples
    ADD CONSTRAINT multiples_pkey PRIMARY KEY (id);


--
-- Name: passed_inputs passed_inputs_passed_ticket_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_inputs
    ADD CONSTRAINT passed_inputs_passed_ticket_id_key UNIQUE (passed_ticket_id);


--
-- Name: passed_inputs passed_inputs_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_inputs
    ADD CONSTRAINT passed_inputs_pkey PRIMARY KEY (id);


--
-- Name: passed_multiples passed_multiples_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_multiples
    ADD CONSTRAINT passed_multiples_pkey PRIMARY KEY (id);


--
-- Name: passed_singles passed_singles_passed_ticket_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_singles
    ADD CONSTRAINT passed_singles_passed_ticket_id_key UNIQUE (passed_ticket_id);


--
-- Name: passed_singles passed_singles_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_singles
    ADD CONSTRAINT passed_singles_pkey PRIMARY KEY (id);


--
-- Name: passed_test passed_test_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_test
    ADD CONSTRAINT passed_test_pkey PRIMARY KEY (id);


--
-- Name: passed_tickets passed_tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_tickets
    ADD CONSTRAINT passed_tickets_pkey PRIMARY KEY (id);


--
-- Name: singles singles_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.singles
    ADD CONSTRAINT singles_pkey PRIMARY KEY (id);


--
-- Name: singles singles_ticket_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.singles
    ADD CONSTRAINT singles_ticket_id_key UNIQUE (ticket_id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (passbook_number);


--
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: variants variants_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT variants_pkey PRIMARY KEY (id);


--
-- Name: inputs inputs_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.inputs
    ADD CONSTRAINT inputs_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


--
-- Name: multiples multiples_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.multiples
    ADD CONSTRAINT multiples_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


--
-- Name: passed_inputs passed_inputs_passed_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_inputs
    ADD CONSTRAINT passed_inputs_passed_ticket_id_fkey FOREIGN KEY (passed_ticket_id) REFERENCES public.passed_tickets(id) ON DELETE CASCADE;


--
-- Name: passed_multiples passed_multiples_passed_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_multiples
    ADD CONSTRAINT passed_multiples_passed_ticket_id_fkey FOREIGN KEY (passed_ticket_id) REFERENCES public.passed_tickets(id) ON DELETE CASCADE;


--
-- Name: passed_singles passed_singles_passed_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_singles
    ADD CONSTRAINT passed_singles_passed_ticket_id_fkey FOREIGN KEY (passed_ticket_id) REFERENCES public.passed_tickets(id) ON DELETE CASCADE;


--
-- Name: passed_test passed_test_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_test
    ADD CONSTRAINT passed_test_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(passbook_number);


--
-- Name: passed_test passed_test_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_test
    ADD CONSTRAINT passed_test_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(id);


--
-- Name: passed_tickets passed_tickets_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_tickets
    ADD CONSTRAINT passed_tickets_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(passbook_number) ON DELETE CASCADE;


--
-- Name: passed_tickets passed_tickets_ticked_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_tickets
    ADD CONSTRAINT passed_tickets_ticked_id_fkey FOREIGN KEY (ticked_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


--
-- Name: singles singles_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.singles
    ADD CONSTRAINT singles_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


--
-- Name: tests tests_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teachers(id) ON DELETE CASCADE;


--
-- Name: tickets tickets_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(id) ON DELETE CASCADE;


--
-- Name: variants variants_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT variants_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO gen_user;
GRANT USAGE ON SCHEMA public TO student;
GRANT USAGE ON SCHEMA public TO teacher;


--
-- Name: TABLE inputs; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.inputs TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.inputs TO teacher;


--
-- Name: TABLE multiples; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.multiples TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.multiples TO teacher;


--
-- Name: TABLE passed_inputs; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.passed_inputs TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.passed_inputs TO teacher;


--
-- Name: TABLE passed_multiples; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.passed_multiples TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.passed_multiples TO teacher;


--
-- Name: TABLE passed_singles; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.passed_singles TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.passed_singles TO teacher;


--
-- Name: TABLE passed_test; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.passed_test TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.passed_test TO teacher;


--
-- Name: TABLE passed_tickets; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.passed_tickets TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.passed_tickets TO teacher;


--
-- Name: TABLE singles; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.singles TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.singles TO teacher;


--
-- Name: TABLE students; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.students TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.students TO teacher;


--
-- Name: TABLE teachers; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.teachers TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.teachers TO teacher;


--
-- Name: TABLE tests; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.tests TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tests TO teacher;


--
-- Name: TABLE tickets; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.tickets TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tickets TO teacher;


--
-- Name: TABLE variants; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.variants TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.variants TO teacher;


--
-- PostgreSQL database dump complete
--

