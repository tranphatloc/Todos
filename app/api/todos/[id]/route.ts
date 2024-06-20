import { NextRequest, NextResponse } from "next/server";

import sql from "@/config/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = (await req.json()) as {
    status?: boolean;
    task?: string;
  };
  const { status, task } = body;
  if (!!status && typeof status !== "boolean") {
    return NextResponse.json("Update failed", { status: 400 });
  }
  if (!!task && (typeof task !== "string" || task.trim().length === 0)) {
    return NextResponse.json("Update failed", { status: 400 });
  }
  const columns = Object.keys(body) as ("task" | "status")[];
  if (columns.length === 0) {
    return NextResponse.json("Update failed", { status: 400 });
  }
  await sql`update todos set ${sql(body, columns)} where id = ${id}`;
  return NextResponse.json({ message: "OK" }, { status: 200 });
  // const setClauses = [];

  // if (
  //   body.status !== undefined &&
  //   body.status !== null &&
  //   typeof body.status === "boolean"
  // ) {
  //   setClauses.push(sql`status = ${body.status}`);
  // }

  // if (
  //   body.task !== undefined &&
  //   body.task !== null &&
  //   typeof body.task === "string"
  // ) {
  //   setClauses.push(sql`task = ${body.task} `);
  // }
  // if (setClauses.length > 0) {
  //   const setClause = setClauses.reduce((prev, curr) => sql`${prev},${curr}`);
  //   await sql`update todos set ${setClause} where id = ${id}`;
  //   return NextResponse.json({ message: "OK" }, { status: 200 });
  // } else {
  //   return NextResponse.json(
  //     {
  //       message: "update failed",
  //     },
  //     { status: 400 }
  //   );
  // }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  const data = await sql`select * from todos where id = ${id}`;
  return NextResponse.json({ data: data[0] }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  await sql`delete from todos where id = ${id}`;
  return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
}
