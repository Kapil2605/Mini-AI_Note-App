"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type NoteCardProps = {
  note: { id: string; title: string; content: string; summary: string };
};

export function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();

  const handleDelete = async () => {

    await supabase.from("notes").delete().eq("id", note.id);
    alert("Note deleted successfully.");
    router.refresh();  // refresh data after deletion
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-gray-600">{note.content}</p>
        <p className="text-sm text-muted-foreground">Summary: {note.summary}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push(`/notes/edit/${note.id}`)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
