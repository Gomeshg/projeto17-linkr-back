CREATE DATABASE "linkr";

CREATE TABLE "users"(
    "id"            SERIAL PRIMARY KEY,
    "userName"      VARCHAR(50) UNIQUE NOT NULL,
    "email"         VARCHAR(50) UNIQUE NOT NULL,
    "passwordHash"  TEXT NOT NULL,
    "pictureUrl"    TEXT NOT NULL, 
    "createDate"    TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "links"(
    "id"            SERIAL PRIMARY KEY,
    "userId"        INTEGER REFERENCES "users"("id") NOT NULL,
    "url"           TEXT NOT NULL,
    "text"          TEXT,
    "createDate"    TIMESTAMP DEFAULT NOW() NOT NULL 
);

CREATE TABLE "trendings"(
    "id"            SERIAL PRIMARY KEY,
    "tag"           VARCHAR(20) UNIQUE NOT NULL,
    "count"         INTEGER DEFAULT 1 NOT NULL,
    "createDate"    TIMESTAMP DEFAULT NOW() NOT NULL 
);


CREATE TABLE "trendingLinks"(
    "id"            SERIAL PRIMARY KEY,
    "linkId"        INTEGER REFERENCES "links"("id") NOT NULL,
    "trendingId"    INTEGER REFERENCES "trendings"("id") NOT NULL
);

CREATE TABLE "sessions"(
    "id"            SERIAL PRIMARY KEY,
    "userId"        INTEGER REFERENCES "users"("id") NOT NULL ,
    "token"         TEXT NOT NULL,
    "active"        BOOLEAN DEFAULT TRUE NOT NULL,
    "createDate"    TIMESTAMP DEFAULT NOW() NOT NULL,
    "logoutDate"    TIMESTAMP 
);

CREATE TABLE "likes"(
    "id"            SERIAL PRIMARY KEY,
    "linkId"        INTEGER REFERENCES "links"("id") NOT NULL,
    "userId"        INTEGER REFERENCES "users"("id") NOT NULL,
    "createDate"    TIMESTAMP DEFAULT NOW() NOT NULL 
);



DROP DATABASE "linkr";
DROP TABLE "users","links","trendings","trendingLinks","sessions", "likes";