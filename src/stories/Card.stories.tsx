import type { Meta, StoryObj } from "@storybook/react";
import Card from "../components/link/card";
import { LinksProvider } from "../context/link";
import { FormValues } from "../components/link";
import { FieldArrayWithId } from "react-hook-form";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const meta = {
  title: "Example/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    field: { control: "object" },
    index: { control: "number" },
  },
  args: {
    field: { id: "1", platform: "Github", link: "" } as FieldArrayWithId<
      FormValues,
      "links",
      "id"
    >,
    index: 0,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => (
  <LinksProvider>
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="links">{() => <Card {...args} />}</Droppable>
    </DragDropContext>
  </LinksProvider>
);

export const Default = Template.bind({});
Default.args = {};
