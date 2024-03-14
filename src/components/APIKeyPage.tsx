"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Loader2, Trash2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

type Props = {};

const APIKeyPage = (props: Props) => {
  const [key, setKey] = useState<string>("");
  const [open, setOpen] = useState(false);

  const utils = trpc.useUtils();
  let isUpload = false;

  const { data: fetchedKey, isLoading } = trpc.getApiKey.useQuery();

  if (!fetchedKey) {
    isUpload = true;
  }

  const { mutate: uploadKey } = trpc.uploadApiKey.useMutation({
    onSuccess: () => {
      isUpload = false;
      utils.getApiKey.invalidate(); // this will mark getApiKey query stale/outdated and will automatically refetch again
      setKey("");
      setOpen(false);
    },
  });

  const { mutate: deleteKey } = trpc.deleteApiKey.useMutation({
    onSuccess: () => {
      isUpload = true;
      utils.getApiKey.invalidate();
    },
  });

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">OpenAI Key</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" disabled={!isUpload}>
              Enter OpenAI Key
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>OpenAI Key</DialogTitle>
              <DialogDescription>
                Please enter your OpenAI key to be able to use docu-inquire
                service
              </DialogDescription>
            </DialogHeader>
            <Input
              id="link"
              placeholder="Entry here..."
              className="my-4"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <DialogFooter className="sm:justify-start">
              <Button
                variant="outline"
                onClick={() => uploadKey({ apiKey: key })}
              >
                Submit
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 flex flex-col gap-16">
        {fetchedKey && (
          <div className="flex justify-between items-center px-6 py-4 rounded-lg bg-white shadow transition hover:shadow-lg">
            <div className="flex flex-col gap-2">
              {fetchedKey.openAiKey.slice(0, 3) +
                " . . . " +
                fetchedKey.openAiKey.slice(
                  fetchedKey.openAiKey.length - 4,
                  fetchedKey.openAiKey.length
                )}
              <p className="text-sm text-zinc-500">
                Uploaded on{" "}
                {new Date(fetchedKey.uploadedAt).toISOString().split("T")[0]}
              </p>
            </div>
            <Trash2
              className="h-10 w-10 p-2.5 hover:bg-destructive rounded-full transition-all ease-in duration-200 cursor-pointer"
              onClick={() => deleteKey({ keyId: fetchedKey.id })}
              aria-label="delete-button"
            />
          </div>
        )}

        {isLoading && (
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800 self-center" />
        )}

        <div className="sm:px-20 px-5 text-center flex flex-col gap-10">
          {!fetchedKey ? (
            <p className="text-lg font-bold">
              You are required to provide your OpenAI API Key to utilize
              docu-inquire service.
            </p>
          ) : (
            <p>
              <span className="font-semibold">
                OpenAI API Key{" "}
                <span className="text-green-600">successfully</span> uploaded!
              </span>{" "}
              <br />
              Click{" "}
              <Link href="/dashboard" className="text-primary hover:underline">
                here
              </Link>{" "}
              to access the dashboard and initiate conversations with PDF
              documents!
            </p>
          )}
          <div className="italic flex flex-col gap-2 sm:gap-0">
            <p>
              Your OpenAI API key is securely managed within our system and will
              only be used for this project&apos;s purposes. Rest assured, it
              will not be misused.
            </p>
            <p>
              If you&apos;re unsure how to create an OpenAI API key, you can
              find a guide on how to do so{" "}
              <a
                href="https://gptforwork.com/help/gpt-for-docs/setup/create-openai-api-key"
                className="text-primary hover:underline"
                target="_blank"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIKeyPage;
