CREATE TABLE public.taskaccomplishments (
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    teamid uuid NOT NULL,
    taskid uuid NOT NULL,
    answer text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL
);
CREATE TABLE public.tasks (
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    title text NOT NULL,
    description text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL
);
CREATE TABLE public.teams (
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    name text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL
);
CREATE TABLE public.times (
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    type text NOT NULL,
    teamid uuid NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL
);
ALTER TABLE ONLY public.taskaccomplishments
    ADD CONSTRAINT taskaccomplishments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.times
    ADD CONSTRAINT times_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.taskaccomplishments
    ADD CONSTRAINT taskaccomplishments_taskid_fkey FOREIGN KEY (taskid) REFERENCES public.tasks(id);
ALTER TABLE ONLY public.taskaccomplishments
    ADD CONSTRAINT taskaccomplishments_teamid_fkey FOREIGN KEY (teamid) REFERENCES public.teams(id);
ALTER TABLE ONLY public.times
    ADD CONSTRAINT times_teamid_fkey FOREIGN KEY (teamid) REFERENCES public.teams(id);
