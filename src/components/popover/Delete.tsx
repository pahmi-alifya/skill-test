import React, { memo } from "react";
import { Text, Button, Grid, Row, Popover } from "@nextui-org/react";
import { DeleteIcon } from "../Icons";

type TPopoverDelete = {
  onClick: () => void;
};

const PopoverDelete = ({ onClick }: TPopoverDelete) => {
  return (
    <Popover>
      <Popover.Trigger>
        <Button color="error" auto flat>
          <DeleteIcon size={20} fill="#FF0080" />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Grid.Container
          css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
        >
          <Row justify="center" align="center">
            <Text b>Konfirmasi</Text>
          </Row>
          <Row>
            <Text>Apakah kamu yakin akan menghapus data ini ?</Text>
          </Row>
          <Grid.Container justify="center" alignContent="center">
            <Grid>
              <Button size="sm" shadow color="error" onClick={onClick}>
                Hapus
              </Button>
            </Grid>
          </Grid.Container>
        </Grid.Container>
      </Popover.Content>
    </Popover>
  );
};

export default memo(PopoverDelete);
