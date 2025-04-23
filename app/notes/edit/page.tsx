// Add "use client" at the top to mark the file as a client-side component
"use client";

import { useRouter } from "next/navigation"; // Import from next/navigation
import { useEffect, useState } from "react";
import { NoteForm } from "@/components/form/NoteForm";
import { supabase } from "@/lib/supabase";

export default function EditNotePage() {
  const router = useRouter();
  const [noteId, setNoteId] = useState<string | undefined>(undefined);
  const [note, setNote] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Use router.query.id in useEffect or get the noteId dynamically
  useEffect(() => {
    const id = window.location.pathname.split("/").pop(); // Get the ID from the URL path
    
    console.log("Note ID from URL:", id); // Log the note ID for debugging
    setNoteId(id); // Set the note ID

    if (id) {
      const fetchNote = async () => {
        const { data, error } = await supabase
          .from("notes")
          .select("title, content")
          .eq("id", id)
          .single();

        if (error) {
          alert("Failed to load note.");
          router.push("/notes");
        } else {
          setNote(data);
        }
        setLoading(false);
      };

      fetchNote();
    }
  }, [router]);

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
