"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { NoteForm } from "@/components/form/NoteForm";
import { summarizeText } from "@/lib/summarizer"; // Assuming you're importing this function
import Header from "@/components/ui/Header";

export default function CreateNotePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: { title: string; content: string }) => {
    setLoading(true);
    try {
      // Get the summary from DeepSeek
      const summary = await summarizeText(data.content);

      // Insert note into Supabase with title, content, and summary
      const { error } = await supabase.from("notes").insert({
        title: data.title,
        content: data.content,
        summary,
      });

      if (!error) {
        router.push("/notes");
      } else {
        alert(error.message);
      }
    } catch (err) {
      alert("Error creating note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
        <NoteForm onSubmit={handleCreate} isSubmitting={loading} />
      </div>
    </>
  );
}
