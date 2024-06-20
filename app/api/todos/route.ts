import { NextRequest, NextResponse } from "next/server";

import sql from "@/config/db";

interface Todo {
  id: number;
  task: string;
  status: boolean;
  createdAt: Date;
}

export async function GET(_req: NextRequest) {
  const data = await sql<Todo[]>`SELECT * FROM todos`;

  return NextResponse.json(data, {
    status: 200,
  });
}
export async function POST(req: NextRequest) {
  const body = (await req.json()) as { task?: string };
  //   console.log(body.task)
  if (!body.task) {
    return NextResponse.json(
      {
        message: "task is invalid",
      },
      { status: 400 }
    );
  }
  const inserted =
    await sql`INSERT into todos (task) values (${body.task}) returning *`;
  return NextResponse.json(
    { message: "todo created", data: inserted[0] },
    { status: 201 }
  );
}
