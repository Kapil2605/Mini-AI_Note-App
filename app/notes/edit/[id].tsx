"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { NoteForm } from "@/components/form/NoteForm";
import { supabase } from "@/lib/supabase";

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params?.id as string | undefined;
  if (!noteId) {
    alert("Invalid note ID.");
    router.push("/notes");
    return null;
  }
  const [note, setNote] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("title, content")
        .eq("id", noteId)
        .single();

      if (error) {
        alert("Failed to load note.");
        router.push("/notes");
      } else {
        setNote(data);
      }
      setLoading(false);
    };

    if (noteId) fetchNote();
  }, [noteId, router]);

  const handleUpdate = async (updatedData: { title: string; content: string }) => {
    setUpdating(true);
    const { error } = await supabase
      .from("notes")
      .update(updatedData)
      .eq("id", noteId);

    setUpdating(false);

    if (error) {
      alert("Error updating note: " + error.message);
    } else {
      router.push("/notes");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Note</h1>
        {note && (
          <NoteForm
            initialValues={note}
            onSubmit={handleUpdate}
            isSubmitting={updating}
          />
        )}
      </div>
    </div>
  );
}
