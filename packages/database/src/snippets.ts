import { prisma } from "./client";
import { Snippet } from "@prisma/client";

export type SnippetWithDates = Snippet;

export async function getSnippets(): Promise<SnippetWithDates[]> {
  return prisma.snippet.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getSnippetById(id: string): Promise<SnippetWithDates | null> {
  return prisma.snippet.findUnique({
    where: { id },
  });
}

export async function createSnippet(data: {
  title: string;
  content: string;
  language?: string;
  tags?: string;
}): Promise<SnippetWithDates> {
  return prisma.snippet.create({
    data,
  });
}

export async function updateSnippet(
  id: string,
  data: {
    title?: string;
    content?: string;
    language?: string;
    tags?: string;
  }
): Promise<SnippetWithDates> {
  return prisma.snippet.update({
    where: { id },
    data,
  });
}

export async function deleteSnippet(id: string): Promise<SnippetWithDates> {
  return prisma.snippet.delete({
    where: { id },
  });
}
