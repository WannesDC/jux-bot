-- Version 1.0.0
CREATE TABLE IF NOT EXISTS users (
        player_id varchar,
        player_name varchar,
        api_key varchar,
        discord_user_id varchar
);

-- Version 1.1.0
ALTER TABLE IF EXISTS users DROP CONSTRAINT users_pk;
ALTER TABLE IF EXISTS users ADD CONSTRAINT users_pk PRIMARY KEY (discord_user_id);

CREATE TABLE IF NOT EXISTS role (
        role_id varchar,
        role_name varchar,
        server_id varchar,
        constraint role_pk primary key (role_id)
);

CREATE TABLE IF NOT EXISTS user_roles (
        discord_user_id varchar,
        role_id varchar,
        constraint users_FK foreign key(discord_user_id),
        constraint role_id foreign key(role_id),
);

CREATE TABLE IF NOT EXISTS admin_channels {
        channel_id,
        constraint admin_channels_pk primary key (channel_id)
}

