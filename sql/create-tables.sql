-- Version 1.0.0
CREATE TABLE IF NOT EXISTS users (
        player_id varchar,
        player_name varchar,
        api_key varchar,
        discord_user_id varchar,
        CONSTRAINT users_pk PRIMARY KEY (discord_user_id)
);

-- Version 1.1.0

CREATE TABLE IF NOT EXISTS roles (
        role_id varchar,
        role_name varchar,
        server_id varchar,
        constraint role_pk primary key (role_id)
);

CREATE TABLE IF NOT EXISTS user_roles (
        discord_user_id varchar,
        role_id varchar,
        constraint users_FK foreign key(discord_user_id) REFERENCES users(discord_user_id),
        constraint role_id foreign key(role_id) REFERENCES roles (role_id)
);

CREATE TABLE IF NOT EXISTS admin_channels (
        channel_id varchar,
        constraint admin_channels_pk primary key (channel_id)
);