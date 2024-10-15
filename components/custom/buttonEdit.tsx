"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { editTodo } from "@/app/actions";

interface DataType {
  id: string;
  text: string;
}

interface ButtonProps {
  Data: DataType;
}

const initialState = {
  message: "",
};

export default function ButtonEdit({ Data }: ButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(editTodo, initialState);

  useEffect(() => {
    if (state.message && state.message.startsWith("Edited todo")) {
      setOpen(false);
    }
  }, [state]);

  const handleSubmit = async (formData: FormData) => {
    await formAction(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                id
              </Label>
              <Input
                id="id"
                defaultValue={Data.id}
                className="col-span-3"
                name="id"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="todo" className="text-right">
                Text
              </Label>
              <Input
                id="todo"
                defaultValue={Data.text}
                className="col-span-3"
                name="todo"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar alterações"}
    </Button>
  );
}
