import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { ShareSocial } from "react-share-social";
import { useLinks } from "../../context/link";

export default function SharedFooter() {
  const { getValues } = useLinks();

  const url = useMemo(() => {
    const id = getValues("id") || [];
    const url = window.location;

    return `${url.protocol}//${url.host}/${id}`;
  }, [getValues]);

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
