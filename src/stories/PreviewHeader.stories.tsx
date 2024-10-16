import type { Meta, StoryObj } from "@storybook/react";
import PreviewHeader from "../components/preview/header";
import { MemoryRouter } from "react-router-dom";
import { LinksProvider } from "../context/link";

const meta = {
  title: "Example/PreviewHeader",
  component: PreviewHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PreviewHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => (
  <LinksProvider>
    <MemoryRouter>
      <PreviewHeader {...args} />
    </MemoryRouter>
  </LinksProvider>
);

export const Default = Template.bind({});
Default.args = {};
