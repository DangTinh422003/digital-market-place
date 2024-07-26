"use client";
import React, { useEffect } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useFormState } from "react-dom";
import { updateUserSettings } from "@/app/action";
import { State, UPDATE_USER_SETTINGS_FORM_FIELDS } from "@/constants";
import { toast } from "sonner";

export interface SettingsFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

const SettingsForm = ({ email, firstName, lastName }: SettingsFormProps) => {
  const initState: State = {
    message: "",
    status: "idle",
  };

  const [state, formAction] = useFormState(updateUserSettings, initState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    }
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you will find settings regarding your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First Name</Label>
          <Input
            name={UPDATE_USER_SETTINGS_FORM_FIELDS.FIRST_NAME}
            type="text"
            defaultValue={firstName}
          ></Input>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Last Name</Label>
          <Input
            name={UPDATE_USER_SETTINGS_FORM_FIELDS.LAST_NAME}
            type="text"
            defaultValue={lastName}
          ></Input>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input
            name={UPDATE_USER_SETTINGS_FORM_FIELDS.EMAIL}
            type="email"
            defaultValue={email}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button type="submit">Update your settings</Button>
      </CardFooter>
    </form>
  );
};

export default SettingsForm;
