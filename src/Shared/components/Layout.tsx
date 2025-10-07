import { Button, Stack } from "@mui/material";

const Layout = ({
  isFirstPage,
  clickPrev,
  clickNext,
  children,
}: {
  isFirstPage: boolean;
  clickPrev: () => void;
  clickNext: () => void;
  children: React.ReactElement;
}) => {
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
        <Button variant={"text"} onClick={clickPrev} disabled={isFirstPage}>
          &lt;
        </Button>
      </Stack>

      {children}

      <Button fullWidth variant={"contained"} onClick={clickNext}>
        다음
      </Button>
    </Stack>
  );
};

export default Layout;
