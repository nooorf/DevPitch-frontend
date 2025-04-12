"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type CollaborationModel = {
  _id: string;
  interest: string;
  expertise: string;
  linkedin?: string;
  description: string;
  status:string;
  postId: {
    _id: string;
    title: string;
  };
  userId?: {
    name: string;
    email: string;
  };
};

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState<"sent" | "received">("sent");
  const [loading, setLoading] = useState(true);
  const [sentRequests, setSentRequests] = useState<CollaborationModel[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<CollaborationModel[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const endpoint =
          "http://localhost:5000/collaborations/request/" + activeTab;
        const res = await fetch(endpoint, { credentials: "include" });
        const data = await res.json();
        if (activeTab === "sent") {
          setSentRequests(data.sentRequests);
        } else {
          setReceivedRequests(data.receivedRequests);
        }
      } catch (err) {
        console.error("Failed to fetch requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [activeTab]);

  const renderRequestCard = (request: CollaborationModel) => (
    <div
      key={request._id}
      className="border rounded-lg p-4 shadow-sm mb-4 bg-white hover:shadow-md transition-shadow"
    >
      {activeTab === "sent" ? (
        <h3 className="text-lg font-semibold">
          Sent to:{" "}
          <Link
            href={`/startup/${request.postId._id}`}
            className="text-blue-600 underline"
          >
            {request.postId.title}
          </Link>
        </h3>
      ) : (
        <>
          <h3 className="text-lg font-semibold">
            From: {request.userId?.name || "Unknown"}
          </h3>
          <p>
            <strong>Email:</strong> {request.userId?.email || "N/A"}
          </p>
        </>
      )}
      <p>
        <strong>Interest:</strong> {request.interest}
      </p>
      <p>
        <strong>Expertise:</strong> {request.expertise}
      </p>
      {request.linkedin && (
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href={request.linkedin}
            className="text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            {request.linkedin}
          </a>
        </p>
      )}
      <p className="mt-2">
        <strong>Description:</strong> {request.description}
      </p>
      <p><strong>Status:</strong> {request.status}</p>
    </div>
  );

  const currentRequests =
    activeTab === "sent" ? sentRequests : receivedRequests;

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Collaboration Requests</h1>

      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === "sent" ? "default" : "outline"}
          onClick={() => setActiveTab("sent")}
        >
          Sent
        </Button>
        <Button
          variant={activeTab === "received" ? "default" : "outline"}
          onClick={() => setActiveTab("received")}
        >
          Received
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-10 text-gray-600">
          <Loader2 className="animate-spin mr-2" /> Loading...
        </div>
      ) : currentRequests.length === 0 ? (
        <p className="text-gray-600">No {activeTab} requests found.</p>
      ) : (
        <div>{currentRequests.map(renderRequestCard)}</div>
      )}
    </section>
  );
}
