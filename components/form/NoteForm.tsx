"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type NoteFormProps = {
  initialValues?: { title: string; content: string };
  onSubmit: (data: { title: string; content: string }) => void;
  isSubmitting?: boolean;
};

export function NoteForm({ initialValues, onSubmit, isSubmitting }: NoteFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues || { title: "", content: "" },
  });

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="rounded-2xl bg-white p-6 shadow-lg space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base font-medium text-gray-700">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter note title"
          className="rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-xs text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-base font-medium text-gray-700">Content</Label>
        <Textarea
          id="content"
          {...register("content", { required: "Content is required" })}
          placeholder="Write your note here..."
          rows={6}
          className="rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {errors.content && (
          <p className="text-xs text-red-600">{errors.content.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
      >
        {isSubmitting ? "Saving..." : "Save Note"}
      </Button>
    </form>
  );
}
