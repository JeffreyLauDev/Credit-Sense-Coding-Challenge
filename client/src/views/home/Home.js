import React from "react";
import Page from "src/components/Page";

import { Container, Grid } from "@material-ui/core";
import TransactionBox from "src/components/TransactionBox";

export default () => {
  return (
    <Page title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TransactionBox acc="123456" toAcc="874625" />
          </Grid>
          <Grid item xs={6}>
            <TransactionBox acc="874625" toAcc="123456"/>
          </Grid>
        </Grid>

      </Container>
    </Page>
  );
};
