import type { Meta, StoryObj } from "@storybook/react";
import FormInput from "../components/form/input";
import { useForm, FormProvider } from "react-hook-form";

const meta = {
  title: "Example/FormInput",
  component: FormInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    type: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
  },
  args: {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    disabled: false,
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <FormInput {...args} control={methods.control} errors={{}} />
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
