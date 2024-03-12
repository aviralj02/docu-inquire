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
import { Trash2 } from "lucide-react";

type Props = {};

const APIKeyPage = (props: Props) => {
  const [key, setKey] = useState<string>("");

  const formattedKey = "skey . . . hs78";

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">OpenAI Key</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Enter OpenAI Key</Button>
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
              <Button variant="outline">Submit</Button>
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
        <div className="flex justify-between items-center px-6 py-4 rounded-lg bg-white shadow transition hover:shadow-lg">
          <div className="flex flex-col gap-2">
            {formattedKey}
            <p className="text-sm text-zinc-500">Uploaded on Feb 2024</p>
          </div>
          <Trash2 className="h-10 w-10 p-2.5 hover:bg-destructive rounded-full transition-all ease-in duration-200 cursor-pointer" />
        </div>

        <div className="sm:px-20 px-5 text-center flex flex-col gap-10">
          <p className="text-lg font-bold">
            You are required to provide your OpenAI API Key to utilize
            docu-inquire service.
          </p>
          <div className="italic flex flex-col gap-2 sm:gap-0">
            <p className="">
              Your OpenAI API key is securely managed within our system and will
              only be used for this project's purposes. Rest assured, it will
              not be misused.
            </p>
            <p className="">
              If you're unsure how to create an OpenAI API key, you can find a
              guide on how to do so{" "}
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
