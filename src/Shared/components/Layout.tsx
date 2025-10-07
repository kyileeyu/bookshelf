import { Button, Stack } from "@mui/material";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        margin: "0 auto",
        paddingY: "20px",
        width: "300px",
        height: "100svh",
      }}>
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        sx={{ width: "100%" }}>
        <Button variant={"text"}>&lt;</Button>
      </Stack>

      {children}

      <Button fullWidth variant={"contained"}>
        다음
      </Button>
    </Stack>
  );
};

export default Layout;
