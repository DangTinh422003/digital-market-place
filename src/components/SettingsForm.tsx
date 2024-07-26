"use client";
import React from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const SettingsForm = () => {
  return (
    <form>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you will find settings regarding your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First Name</Label>
          <Input type="text"></Input>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Last Name</Label>
          <Input type="text"></Input>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input type="email" />
        </div>
      </CardContent>
    </form>
  );
};

export default SettingsForm;
