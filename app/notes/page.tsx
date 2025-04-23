"use client";
import { useNotes } from "@/hooks/useNotes";
import { NoteCard } from "@/components/NoteCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/ui/Header";

export default function NotesPage() {
  const { data: notes, isLoading } = useNotes();

  return (
    <>
    <Header /> 
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Notes</h1>
          <Link href="/notes/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              + New Note
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <span className="text-gray-500 animate-pulse">Loading your notes...</span>
            </div>
          ) : notes && notes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {notes.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
              <p className="mb-4">You haven’t created any notes yet.</p>
              <Link href="/notes/create">
                <Button variant="outline">Create your first note</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
