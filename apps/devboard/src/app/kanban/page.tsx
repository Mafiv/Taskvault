"use client";

import React, { useState, useEffect } from "react";
import { KanbanBoard } from "@devboard/kanban";
import { timeAgo, slugify, formatDate } from "@devboard/utils";
import { Card, CardBody } from "@devboard/ui-components";

export default function KanbanAssemblyPage() {
  const [mountedTime, setMountedTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    setMountedTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pageSlug = slugify("Kanban Board Module");

  return (
    <div className="min-h-screen bg-gray-50/50 p-8 flex flex-col gap-8">
      {/* Page Header showing Utility usage */}
      <Card className="border-indigo-100 bg-white shadow-sm">
        <CardBody className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">DevBoard Kanban Module</h1>
              <p className="text-gray-600 mb-1">
                System Assembly Page for the Kanban Board
              </p>
              <p className="text-sm font-mono text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded">
                Slug: /{pageSlug}
              </p>
            </div>
            
            <div className="text-right flex flex-col gap-1 text-sm text-gray-500">
              <p>Current Date: <span className="font-medium text-gray-800">{formatDate(currentTime)}</span></p>
              {mountedTime && (
                <p>Page mounted: <span className="font-medium text-indigo-600">{timeAgo(mountedTime)}</span></p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Assembly of the Kanban Board Component */}
      <section className="flex-1">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Task Board</h2>
          <p className="text-sm text-gray-500">Includes advanced features: Priority Tags & Due Dates logic</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* 
            Strict Architectural Rule: Configuration and Assembly only on System directory 
            The KanbanBoard composite manages its own state and layout internally!
          */}
          <KanbanBoard />
        </div>
      </section>
    </div>
  );
}
