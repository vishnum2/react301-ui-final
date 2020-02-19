import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GiftsList from "../components/GiftsList";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { fetchCards, fetchCard, fetchCardFilter } from "../state/actions";
import history from "../../common/components/history";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import AscendingButton from "@material-ui/icons/SwapVert";
import IconButton from "@material-ui/core/IconButton";
import DescendingButton from "@material-ui/icons/SwapVerticalCircle";
import Tooltip from "@material-ui/core/Tooltip";
import { adminEmail } from "../../../config/constants";
import Grid from "@material-ui/core/Grid";

import {
  comparePointsAsc,
  comparePointsDesc,
  compareCountAsc,
  compareCountDesc,
  compareValidityAsc,
  compareValidityDesc
} from "../../common/components/CompareForSort";

const sortCategoryArray = ["Points", "Count", "Validity"];
export class GiftsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //sortOrder : true (ascending order) and false (descending order)
      sortOrder: true,
      sortByValue: "None",
      filterValue: "All",
      searchValue: ""
    };
  }
  componentDidMount() {
    this.props.fetchCards();
  }
  componentDidCatch(error) {
    console.log(error);
  }

  handleSortButtonClick = () => {
    // console.log('handlesort clicked');
    const e = {
      target: {
        value: this.state.sortByValue
      }
    };
    this.onChangeSort(e);
    this.setState({ sortOrder: !this.state.sortOrder }, () => {
      // console.log(this.state);
    });
  };
  // handleClickCard = (id) => {
  //   this.props.fetchCard(id);
  // }

  // handleUpdateClick = (id) => {
  //   console.log("container id", id);
  //   history.push('/AddUpdateForm/' + id)
  // }

  onChangeRetailer = e => {
    const selectedValue = e.target.value;
    this.setState({
      filterValue: e.target.value
    });
    let newGiftCard = [];
    if (selectedValue !== "All") {
      this.props.giftCards.forEach(element => {
        console.log(element.cardRetailer, selectedValue);
        if (element.cardRetailer === selectedValue) {
          console.log("Im called");
          newGiftCard.push(element);
        }
      });
    } else {
      newGiftCard = this.props.giftCards;
    }
    this.props.fetchCardFilter(newGiftCard);
  };

  onChangeSort = e => {
    const { sortOrder } = this.state;
    const giftCards =
      this.state.filterValue === "All"
        ? this.props.giftCards
        : this.props.giftCardsFiltered;
    this.setState({
      sortByValue: e.target.value,
      sortOrder: !this.state.sortOrder
    });
    let newGiftCard = giftCards;
    if (e.target.value !== "None") {
      switch (e.target.value) {
        case "Points":
          newGiftCard = sortOrder
            ? giftCards.sort(comparePointsAsc)
            : giftCards.sort(comparePointsDesc);
          break;
        case "Count":
          newGiftCard = sortOrder
            ? giftCards.sort(compareCountAsc)
            : giftCards.sort(compareCountDesc);
          break;
        case "Validity":
          newGiftCard = sortOrder
            ? giftCards.sort(compareValidityAsc)
            : giftCards.sort(compareValidityDesc);
          break;
        default:
      }
    }
    this.props.fetchCardFilter(newGiftCard);
  };

  addUpdateForm = () => {
    history.push("/AddUpdateForm");
  };

  // debounce = (a,b,c) => {
  //   var d,e;
  //   return function() {
  //             let h = () => {
  //               d=null,
  //               c||(e=a.apply(f,g))
  //             }
  //               var f=this,g=arguments;
  //               return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e
  //             }
  //             }

  searchValueChange = e => {
    const selectedValue = e.target.value;
    this.setState({
      searchValue: e.target.value
    });
    if (selectedValue === "") {
      console.log("Selected value is null");
      setTimeout(() => {
        this.props.fetchCardFilter(this.props.giftCards);
      }, 2000);
    } else {
      setTimeout(() => {
        let newGiftCard = [];
        this.props.giftCards.forEach(element => {
          if (element.cardRetailer === selectedValue) {
            newGiftCard.push(element);
          }
        });
        this.props.fetchCardFilter(newGiftCard);
      }, 2000);
    }
  };
  // {
  //   console.log(((ev) => {
  //     this.setState({
  //       searchValue: ev.target.value
  //     });
  //     console.log((ev.target.value).length);
  //   }))
  // }

  render() {
    if (this.props.giftCards.length === 0) {
      return (
        <CircularProgress style={{ marginLeft: "50%", marginTop: "10%" }} />
      );
    }
    let cardRetailerArray = [];
    for (let i = 0; i < this.props.giftCards.length; i++) {
      cardRetailerArray.push(this.props.giftCards[i].cardRetailer);
    }
    let uniqueCardRetailerArray = [...new Set(cardRetailerArray)];
    return (
      <React.Fragment>
        {/* <select onChange={this.onChangeRetailer}>
          <option value="All">All</option>
          {
            uniqueCardRetailerArray.map((option) => {
              return(
                <option value={option}>{option}</option>
              )
            })
          }
        </select> */}
        <Grid container spacing={0}>
          <Grid item xs={12} sm={3}>
            <label style={{ marginLeft: "2%" }}>Filter by Retailer:</label>
            <Select
              testData="filterByRetailerTest"
              style={{
                marginLeft: "2%",
                marginTop: "2%",
                width: "100px",
                height: "35px"
              }}
              native
              onChange={this.onChangeRetailer}
              input={<OutlinedInput labelWidth={0} name="kpiValue" />}
            >
              <option value="All">All</option>
              {uniqueCardRetailerArray.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <label style={{ marginLeft: "2%" }}>Sort by:</label>
            <Select
              style={{
                marginLeft: "2%",
                marginTop: "2%",
                marginRight: "2%",
                width: "100px",
                height: "35px"
              }}
              native
              onChange={this.onChangeSort}
              input={<OutlinedInput labelWidth={0} name="sortByValue" />}
            >
              <option value="None">None</option>
              {sortCategoryArray.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </Select>
            {this.state.sortOrder ? (
              <Tooltip
                title={
                  this.state.sortByValue === "Validity"
                    ? "Oldest to Newest"
                    : "Low to High"
                }
              >
                <IconButton
                  testData="Icon1"
                  onClick={this.handleSortButtonClick}
                  disabled={this.state.sortByValue === "None"}
                >
                  <AscendingButton />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  this.state.sortByValue === "Validity"
                    ? "Newest to Oldest"
                    : "High to Low"
                }
              >
                <IconButton onClick={this.handleSortButtonClick}>
                  <DescendingButton />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} sm={3}>
            {adminEmail.includes(this.props.userDetails.email) ? (
              <Button
                testData="addCardButtonTest"
                style={{ marginTop: "2%", marginRight: "3%", marginLeft: "2%" }}
                variant="contained"
                color="primary"
                onClick={this.addUpdateForm}
              >
                ADD CARD
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={3}>
            search bar:
            <input
              name="SearchBar"
              value={this.state.searchValue}
              onChange={this.searchValueChange}
            />
          </Grid>
        </Grid>

        <div style={{ textAlign: "center" }}>
          <GiftsList
            {...this.props}
            handleClickCard={this.handleClickCard}
            handleUpdateClick={this.handleUpdateClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => {
  return {
    giftCards: state.gifts.giftCards,
    giftCardsFiltered: state.gifts.giftCardsFiltered,
    userDetails: state.login.detailsObject
  };
};

GiftsListContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  fetchCards,
  fetchCard,
  fetchCardFilter
})(GiftsListContainer);
