import type { Meta, StoryObj } from "@storybook/react";
import LinkForm from "../components/link";
import { LinksProvider } from "../context/link";

const meta = {
  title: "Example/LinkForm",
  component: LinkForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LinkForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => (
  <LinksProvider>
    <LinkForm {...args} />
  </LinksProvider>
);

export const Default = Template.bind({});
Default.args = {};
