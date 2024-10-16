import { Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "./header";
import Card from "./card";
import Footer from "./footer";
import GetStartedComponent from "./getStarted";
import { useLinks } from "../../context/link";
import { useRef } from "react";

export type FormValues = {
  links: { platform: string; link: string }[];
};

const LinkForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { linkLoading, fields, move, append, handleSubmit, onLinkSubmit } =
    useLinks();

  const containerRef = useRef(null);

  const addLink = () => {
    append({ platform: "Github", link: "" }, { shouldFocus: false });
  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const renderAddLinkButton = () => (
    <Button
      variant="outlined"
      onClick={addLink}
      disabled={fields.length >= 5 || linkLoading}
      style={{
        marginBlock: "13px 20px",
        fontSize: "13px",
        fontWeight: "600",
        textTransform: "none",
        borderRadius: "8px",
        width: "100%",
        padding: "8px",
        cursor: fields.length >= 5 ? "not-allowed" : "pointer",
        color:
          fields.length >= 5
            ? theme.palette.text.disabled
            : theme.palette.primary.main,
        borderColor:
          fields.length >= 5
            ? theme.palette.text.disabled
            : theme.palette.primary.main,
      }}
    >
      + Add new link
    </Button>
  );

  const renderCards = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            minHeight={"55vh"}
          >
            {fields.map((field, index) => (
              <Card key={field.id} field={field} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );

  return (
    <form
      onSubmit={handleSubmit?.(onLinkSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: isMobile ? "5px" : "10px 20px",
      }}
      ref={containerRef}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: isMobile ? "5px" : "10px 20px",
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Header />
          {renderAddLinkButton()}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            marginBottom: "20px",
          }}
        >
          {fields.length === 0 ? <GetStartedComponent /> : renderCards()}
        </Box>

        {fields.length !== 0 && <Footer loading={linkLoading} />}
      </Box>
    </form>
  );
};

export default LinkForm;
