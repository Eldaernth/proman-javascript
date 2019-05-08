ALTER TABLE IF EXISTS ONLY public.boards
DROP CONSTRAINT IF EXISTS pk_id CASCADE;

ALTER TABLE IF EXISTS ONLY public.cards
DROP CONSTRAINT IF EXISTS pk_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards
DROP CONSTRAINT IF EXISTS fk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards
DROP CONSTRAINT IF EXISTS fk_statuses_id CASCADE;

ALTER TABLE IF EXISTS ONLY public.statuses
DROP CONSTRAINT IF EXISTS pk_id CASCADE

DROP TABLE IF EXISTS public.boards;
DROP SEQUENCE IF EXISTS public.boards_id_seq;
CREATE TABLE boards (
    id serial NOT NULL,
    title varchar(40)
);

DROP TABLE IF EXISTS public.cards;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
CREATE TABLE cards (
    id serial NOT NULL,
    board_id integer,
    title varchar(40),
    status_id integer,
    orders integer
);

DROP TABLE IF EXISTS public.statuses;
DROP SEQUENCE IF EXISTS public.statuses_id_seq;
CREATE TABLE statuses (
    id serial NOT NULL,
    title varchar(40)
);

ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_boards_id PRIMARY KEY (id);
ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_cards_id PRIMARY KEY (id);
ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_statuses_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_boards_id FOREIGN KEY (board_id) REFERENCES boards(id);
ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_statuses_id FOREIGN KEY (status_id) REFERENCES statuses(id);


INSERT INTO statuses (id, title) VALUES (1, 'New');
INSERT INTO statuses (id, title) VALUES (2, 'In inprogress');
INSERT INTO statuses (id, title) VALUES (3, 'Testing');
INSERT INTO statuses (id, title) VALUES (4, 'Done');


SELECT pg_catalog.setval('boards_id_seq', 1, true);
SELECT pg_catalog.setval('cards_id_seq', 1, true);
SELECT pg_catalog.setval('statuses_id_seq', 1, true);

