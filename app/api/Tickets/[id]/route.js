import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundTicket = await Ticket.findById({ _id: id });
    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete ticket.", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { ticketId } = params;
    await Ticket.deleteOne(ticketId);
    return NextResponse.json(
      { message: "Ticket deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete ticket.", error },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const updateTicketData = body.formData;

    await Ticket.findByIdAndUpdate(id, { ...updateTicketData });
    return NextResponse.json({ message: "Ticket updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
