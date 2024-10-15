import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { ShareSocial } from "react-share-social";

interface SharedFooterProps {
  id: string;
}

export default function SharedFooter({ id }: SharedFooterProps) {
  const url = useMemo(() => {
    const url = window.location;

    return `${url.protocol}//${url.host}/${id}`;
  }, [id]);

  const style = {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px",
      height: "60px",
      backgroundColor: "transparent",
    },
    copyContainer: {
      display: "none",
    },
  };
  return (
    <Box
      sx={{
        borderRadius: "12px",
        margin: "16px",
      }}
      zIndex={10}
    >
      <ShareSocial
        url={url}
        socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
        style={style}
      />
    </Box>
  );
}
