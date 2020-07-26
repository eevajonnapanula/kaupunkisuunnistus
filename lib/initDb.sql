
/* Create tables */
/* As get_random_uuid() is not working with hasura out of the box, these are just references to create the tables */

CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  title Text NOT NULL,
  description Text NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE taskAccomplishments (
  id UUID DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  teamId UUID NOT NULL,
  taskId UUID NOT NULL,
  answer TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (teamId) REFERENCES teams(id),
  FOREIGN KEY (taskId) REFERENCES tasks(id),
);
CREATE TABLE times (
  id UUID DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  type TEXT NOT NULL,
  teamId UUID NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (teamId) REFERENCES teams(id)
);

/* Insert example data */

INSERT INTO teams (name) VALUES ('Team A');
INSERT INTO teams (name) VALUES ('Team B');
INSERT INTO teams (name) VALUES ('Team C');

INSERT INTO tasks (title, description) VALUES ('Task 1', 'Shred all toilet paper and spread around the house suddenly go on wild-eyed crazy rampage, poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls yet run in circles.');
INSERT INTO tasks (title, description) VALUES ('Task 2', 'Shred all toilet paper and spread around the house suddenly go on wild-eyed crazy rampage, poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls yet run in circles.');
INSERT INTO tasks (title, description) VALUES ('Task 3', 'Shred all toilet paper and spread around the house suddenly go on wild-eyed crazy rampage, poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls yet run in circles.');
INSERT INTO tasks (title, description) VALUES ('Task 4', 'Shred all toilet paper and spread around the house suddenly go on wild-eyed crazy rampage, poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls yet run in circles.');

INSERT INTO times (teamId, type)  SELECT id, 'start' FROM teams WHERE name = 'Team A';
INSERT INTO times (teamId, type)  SELECT id, 'start' FROM teams WHERE name = 'Team B';
INSERT INTO times (teamId, type)  SELECT id, 'start' FROM teams WHERE name = 'Team C';



