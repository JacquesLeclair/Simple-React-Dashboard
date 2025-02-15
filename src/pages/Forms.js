import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";
import { MailIcon } from "../icons";

function Forms() {
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <p className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Basic Info</p>
        <div class="grid  grid-cols-4 gap-4">
          <div className="col-span-2 ">
            <Label>
              <span>First</span>
              <Input className="mt-1" placeholder="Enter Client's First name" />
            </Label>
          </div>

          <div className="col-span-2 ">
            <Label>
              <span>Last Name</span>
              <Input className="mt-1" placeholder="Enter Client's First name" />
            </Label>
          </div>
        </div>
        <div class="grid  grid-cols-4 gap-4 mt-4">
          <div className="col-span-2 ">
            <Label>
              <span>Mobile Number</span>
              <Input className="mt-1" placeholder="Enter Client's First name" />
            </Label>
          </div>

          <div className="col-span-2 ">
            <Label>
              <span>Email Address</span>
              <Input className="mt-1" placeholder="Enter Client's Email" />
            </Label>
          </div>
        </div>

        <div className="mt-4">
          {/* TODO: Check if this label is accessible, or fallback */}
          {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
        </div>

        <Label className="mt-4">
          <span>Gender</span>
          <Select className="mt-1">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </Label>

        <div class="grid  grid-cols-4 gap-4 mt-4">
          <div className="col-span-2 ">
            <Label>
              <span>Date of Birth</span>
              <Input className="mt-1" placeholder="Enter Client's First name" />
            </Label>
          </div>

          <div className="col-span-2 ">
            <Label>
              <span>Year</span>
              <Input className="mt-1" placeholder="Enter Client's Email" />
            </Label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forms;
