import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GiftCard from "../../common/components/GiftCard";
import { TablePaginationActionsWrapped } from "../../common/components/TablePaginationActionsWrapped";

const styles = () => ({
  root: {
    width: "90%",
    margin: "2%",
    padding: "1%"
  },
  table: {
    minWidth: 100
  },
  tableWrapper: {
    overflow: "hidden"
  }
});

export class GiftsList extends React.Component {
  state = {
    giftCardsFiltered: this.props.giftCardsFiltered,
    page: 0,
    rowsPerPage: 10
  };

  handleChangePage = (event, page) => {
    console.log(typeof page);
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    console.log(typeof event.target.value);
    this.setState({ page: 0, rowsPerPage: Number(event.target.value) });
  };

  render() {
    let { classes, giftCardsFiltered, userDetails } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, giftCardsFiltered.length - page * rowsPerPage);
    {
      console.log(rowsPerPage);
    }
    return (
      <Paper testData="paperContainer" className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              <Grid container spacing={16}>
                {giftCardsFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((giftCard, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                        <GiftCard
                          giftCard={giftCard}
                          userEmail={userDetails.email}
                        />
                        {/* {(userDetails.email === "lathak95@gmail.com" || this.props.userDetails.email === "yoyogiftg2@gmail.com")? <Button variant="contained" color="primary" onClick={()=> this.props.handleUpdateClick(giftCard.id)}>UPDATE</Button> : null} */}
                      </Grid>
                    );
                  })}
              </Grid>
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20]}
                  colSpan={3}
                  count={giftCardsFiltered.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                  props
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

GiftsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GiftsList);
