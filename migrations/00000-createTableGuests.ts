import type { Sql } from 'postgres';
import { z } from 'zod';

export type Guest = {
  id: number;
  firstName: string;
  lastName: string;
  attending: boolean;
};

export const guestsSchema = z.object({
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  attending: z.boolean(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE guests (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(30) NOT NULL,
      last_name varchar(30) NOT NULL,
      attending boolean NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE guests`;
}
