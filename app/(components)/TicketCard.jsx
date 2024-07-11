import React from "react";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";
import Link from "next/link";

const TicketCard = ({ tickets }) => {
  return (
    <div className="flex flex-col bg-card bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={tickets.priority} />
      </div>
      <div className="ml-auto">
        <DeleteBlock id={tickets._id} />
      </div>
      <Link href={`/TicketPage/${tickets._id}`}>
        <h4>{tickets?.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">{tickets?.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">10/7/24 2:30</p>
            <ProgressDisplay progress={tickets.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={tickets.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
