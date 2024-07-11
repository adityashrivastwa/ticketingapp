"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not strated",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update Ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create Ticket");
      }
    }

    router.refresh();
    router.push("/");
  };

  const title = EDITMODE ? "Update your ticket" : "Create your ticket";
  const buttonText = EDITMODE ? "Update ticket" : "Create ticket";

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{title}</h3>
        <label>Title</label>
        <input
          id="title"
          label="title"
          type="text"
          onChange={handleChange}
          value={formData.title}
          name="title"
          required
        />
        <label>Description</label>
        <textarea
          id="description"
          label="description"
          onChange={handleChange}
          value={formData.description}
          name="description"
          rows={5}
          required
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value={"Hardware Problem"}>Hardware Problem</option>
          <option value={"Software Problem"}>Software Problem</option>
          <option value={"Project"}>Project</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            label="priority"
            value={1}
            onChange={handleChange}
            type="radio"
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            label="priority"
            value={2}
            onChange={handleChange}
            type="radio"
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            label="priority"
            value={3}
            onChange={handleChange}
            type="radio"
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            label="priority"
            value={4}
            onChange={handleChange}
            type="radio"
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            label="priority"
            value={5}
            onChange={handleChange}
            type="radio"
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          label="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />
        <label>Status</label>
        <select
          name="status"
          label="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="not started"> not started</option>
          <option value="started"> started</option>
          <option value="done"> done</option>
        </select>
        <input type="submit" className="btn max-w-xs" value={buttonText} />
      </form>
      TicketForm
    </div>
  );
};

export default TicketForm;
