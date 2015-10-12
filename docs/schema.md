# Schema Information
(Phase 1)
## classifieds
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
status      | string    | not null
price       | integer   | not null
odometer    | integer   | not null
title       | string    | not null
attributes  | JSON      | not null
author_id   | integer   | not null, foreign key (references users), indexed (allow null in bonus)
car_id      | integer   | not null, foreign key (references cars), indexed
source      | string    | (bonus only)
est_value   | integer   | (bonus only)

## cars
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
make        | string    | not null
model       | string    | not null
year        | integer   | not null
value_id    | integer   | (bonus phase only)

(Phase 2)
## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

(Phase 4)
## favorites (join table)
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
user_id      | integer   | not null, foreign_key
classified_id| integer   | not null, foreign_key

(Bonuse Phase)
## values (bonus only)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
x_1         | float     | not null
x_2         | float     | not null
x_3         | float     | not null
x_4         | float     | not null
x_5         | float     | not null
