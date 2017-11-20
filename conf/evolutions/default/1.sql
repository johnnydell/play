# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table city (
  id                        integer auto_increment not null,
  name                      varchar(255),
  countrycode               varchar(255),
  district                  varchar(255),
  population                integer,
  constraint pk_city primary key (id))
;




# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table city;

SET FOREIGN_KEY_CHECKS=1;

