import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE guests (
      id integer PRIMARY key generated always AS identity,
      first_name varchar(30) NOT NULL,
      last_name varchar(30) NOT NULL,
      attending boolean NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE guests`;
}
