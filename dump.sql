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
-- Name: choices; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.choices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    data integer NOT NULL,
    variant_id uuid
);


ALTER TABLE public.choices OWNER TO gen_user;

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
-- Name: passed_choices; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.passed_choices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    variant_id uuid,
    student_id character(10),
    data integer NOT NULL
);


ALTER TABLE public.passed_choices OWNER TO gen_user;

--
-- Name: passed_inputs; Type: TABLE; Schema: public; Owner: gen_user
--

CREATE TABLE public.passed_inputs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    ticket_id uuid,
    student_id character(10),
    data text NOT NULL,
    correct boolean
);


ALTER TABLE public.passed_inputs OWNER TO gen_user;

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
-- Data for Name: choices; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.choices (id, data, variant_id) FROM stdin;
\.


--
-- Data for Name: inputs; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.inputs (id, data, ticket_id) FROM stdin;
\.


--
-- Data for Name: passed_choices; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.passed_choices (id, variant_id, student_id, data) FROM stdin;
\.


--
-- Data for Name: passed_inputs; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.passed_inputs (id, ticket_id, student_id, data, correct) FROM stdin;
\.


--
-- Data for Name: passed_test; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.passed_test (id, student_id, test_id, score) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.students (passbook_number, firstname, lastname, patronymic, student_group, password) FROM stdin;
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.teachers (id, firstname, lastname, patronymic, login, password) FROM stdin;
\.


--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.tests (id, name, teacher_id, passed) FROM stdin;
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.tickets (id, type, question, description, cost, test_id) FROM stdin;
\.


--
-- Data for Name: variants; Type: TABLE DATA; Schema: public; Owner: gen_user
--

COPY public.variants (id, data, ticket_id) FROM stdin;
\.


--
-- Name: choices choices_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.choices
    ADD CONSTRAINT choices_pkey PRIMARY KEY (id);


--
-- Name: choices choices_variant_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.choices
    ADD CONSTRAINT choices_variant_id_key UNIQUE (variant_id);


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
-- Name: passed_choices passed_choices_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_choices
    ADD CONSTRAINT passed_choices_pkey PRIMARY KEY (id);


--
-- Name: passed_choices passed_choices_student_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_choices
    ADD CONSTRAINT passed_choices_student_id_key UNIQUE (student_id);


--
-- Name: passed_choices passed_choices_variant_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_choices
    ADD CONSTRAINT passed_choices_variant_id_key UNIQUE (variant_id);


--
-- Name: passed_inputs passed_inputs_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_inputs
    ADD CONSTRAINT passed_inputs_pkey PRIMARY KEY (id);


--
-- Name: passed_inputs passed_inputs_student_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_inputs
    ADD CONSTRAINT passed_inputs_student_id_key UNIQUE (student_id);


--
-- Name: passed_inputs passed_inputs_ticket_id_key; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_inputs
    ADD CONSTRAINT passed_inputs_ticket_id_key UNIQUE (ticket_id);


--
-- Name: passed_test passed_test_pkey; Type: CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_test
    ADD CONSTRAINT passed_test_pkey PRIMARY KEY (id);


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
-- Name: choices choices_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.choices
    ADD CONSTRAINT choices_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.variants(id) ON DELETE CASCADE;


--
-- Name: inputs inputs_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.inputs
    ADD CONSTRAINT inputs_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


--
-- Name: passed_choices passed_choices_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_choices
    ADD CONSTRAINT passed_choices_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(passbook_number) ON DELETE CASCADE;


--
-- Name: passed_choices passed_choices_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_choices
    ADD CONSTRAINT passed_choices_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.variants(id) ON DELETE CASCADE;


--
-- Name: passed_inputs passed_inputs_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_inputs
    ADD CONSTRAINT passed_inputs_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(passbook_number) ON DELETE CASCADE;


--
-- Name: passed_inputs passed_inputs_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gen_user
--

ALTER TABLE ONLY public.passed_inputs
    ADD CONSTRAINT passed_inputs_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


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
-- Name: TABLE passed_test; Type: ACL; Schema: public; Owner: gen_user
--

GRANT SELECT,INSERT,UPDATE ON TABLE public.passed_test TO student;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.passed_test TO teacher;


--
-- PostgreSQL database dump complete
--

