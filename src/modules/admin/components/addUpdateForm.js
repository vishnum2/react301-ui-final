import React, { Component } from "react";
import InputTypeComponent from "../../common/components/inputTypeComponent";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { adminAddCard, adminUpdateCard } from "../../gifts/state/actions/index";
import history from "../../common/components/history";
import { DateFormatter } from "../../common/components/DateFormatter";
import Snackbar from "../../common/components/Snackbar";

export class AddUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNameValue: "",
      cardNameError: false,
      cardNameHelperText: "",
      cardPointsValue: "",
      cardPointsError: false,
      cardPointsHelperText: "",
      cardCategoryValue: "",
      cardCategoryError: false,
      cardCategoryHelperText: "",
      cardRetailerValue: "",
      cardRetailerError: false,
      cardRetailerHelperText: "",
      cardExpiryDateValue: "",
      cardExpiryDateError: false,
      cardExpiryDateHelperText: "",
      cardCountValue: "",
      cardCountError: false,
      cardCountHelperText: "",
      cardImageValue: "",
      cardImageError: false,
      cardImageHelperText: "",
      cardVendorValue: "",
      cardVendorError: false,
      cardVendorHelperText: "",
      cardShortDescValue: "",
      cardShortDescError: false,
      cardShortDescHelperText: "",
      cardLongDescValue: "",
      cardLongDescError: false,
      cardLongDescHelperText: "",
      showErrorSnackBar: false,
      showUpdateSnackBar: false,
      showSuccessSnackBar: false
    };
    this.clearInput = this.clearInput.bind(this);
  }

  currentGiftCard = {};
  componentDidMount() {
    // let currentGiftCard = {};
    this.props.giftCards.forEach(card => {
      if (card.id === +this.props.match.params.id) {
        this.currentGiftCard = card;
        this.setState({
          cardNameValue: this.currentGiftCard.cardName,
          cardPointsValue: this.currentGiftCard.cardPoints,
          cardCategoryValue: this.currentGiftCard.cardCategory,
          cardRetailerValue: this.currentGiftCard.cardRetailer,
          cardExpiryDateValue: DateFormatter(
            this.currentGiftCard.cardExpiryDate
          ),
          cardCountValue: this.currentGiftCard.cardCount,
          cardImageValue: this.currentGiftCard.cardImage,
          cardVendorValue: this.currentGiftCard.cardVendor,
          cardShortDescValue: this.currentGiftCard.cardShortDesc,
          cardLongDescValue: this.currentGiftCard.cardLongDesc
        });
      }
    });
  }

  clearInput() {
    this.setState({
      cardNameValue: "",
      cardNameError: false,
      cardNameHelperText: "",
      cardPointsValue: "",
      cardPointsError: false,
      cardPointsHelperText: "",
      cardCategoryValue: "",
      cardCategoryError: false,
      cardCategoryHelperText: "",
      cardRetailerValue: "",
      cardRetailerError: false,
      cardRetailerHelperText: "",
      cardExpiryDateValue: "",
      cardExpiryDateError: false,
      cardExpiryDateHelperText: "",
      cardCountValue: "",
      cardCountError: false,
      cardCountHelperText: "",
      cardImageValue: "",
      cardImageError: false,
      cardImageHelperText: "",
      cardVendorValue: "",
      cardVendorError: false,
      cardVendorHelperText: "",
      cardShortDescValue: "",
      cardShortDescError: false,
      cardShortDescHelperText: "",
      cardLongDescValue: "",
      cardLongDescError: false,
      cardLongDescHelperText: ""
    });
  }

  handleCardNameChange = event => {
    // console.log('Handle Card name change invoked');
    let value = event.target.value;
    if (/^[A-Za-z\s]+$/.test(value) && value.length > 0 && value.length < 100) {
      this.setState({
        cardNameValue: value,
        cardNameError: false,
        cardNameHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardName: value };
    } else {
      this.setState({
        cardNameValue: value,
        cardNameError: true,
        cardNameHelperText: "Only alphabets of max length 100 are accepted"
      });
    }
  };
  handleCardPointsChange = event => {
    let value = event.target.value;
    if (/^[0-9]+$/.test(value) && value.toString().length > 0 && value >= 0) {
      this.setState({
        cardPointsValue: value,
        cardPointsError: false,
        cardPointsHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardPoints: value };
    } else {
      console.log(value);
      this.setState({
        cardPointsValue: value,
        cardPointsError: true,
        cardPointsHelperText: "Only whole numbers are accepted"
      });
    }
  };
  handleCardCategoryChange = event => {
    let value = event.target.value;
    if (/^[A-Za-z\s]+$/.test(value) && value.length > 0 && value.length < 100) {
      this.setState({
        cardCategoryValue: value,
        cardCategoryError: false,
        cardCategoryHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardCategory: value };
    } else {
      this.setState({
        cardCategoryValue: value,
        cardCategoryError: true,
        cardCategoryHelperText: "Only alphabets of max length 100 are accepted"
      });
    }
  };
  handleCardRetailerChange = event => {
    let value = event.target.value;
    if (/^[A-Za-z\s]+$/.test(value) && value.length > 0 && value.length < 100) {
      this.setState({
        cardRetailerValue: value,
        cardRetailerError: false,
        cardRetailerHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardRetailer: value };
    } else {
      this.setState({
        cardRetailerValue: value,
        cardRetailerError: true,
        cardRetailerHelperText: "Only alphabets of max length 100 are accepted"
      });
    }
  };
  handleCardExpiryDateChange = event => {
    let value = event.target.value;
    let cardExpiryDateValue = new Date(value).getTime();
    let currentDate = new Date().getTime();
    //2019-05-31
    if (cardExpiryDateValue > currentDate) {
      this.setState({
        cardExpiryDateValue: value,
        cardExpiryDateError: false,
        cardExpiryDateHelperText: ""
      });
      const cardExpiryDate = new Date(value);
      this.updatePayload = {
        ...this.updatePayload,
        cardExpiryDate: cardExpiryDate
      };
    } else {
      this.setState({
        cardExpiryDateValue: value,
        cardExpiryDateError: true,
        cardExpiryDateHelperText: "Expiry Date must be more than current date"
      });
    }
  };
  handleCardCountChange = event => {
    let value = event.target.value;
    if (/^[0-9]+$/.test(value) && value.toString().length > 0 && value >= 0) {
      this.setState({
        cardCountValue: value,
        cardCountError: false,
        cardCountHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardCount: value };
    } else {
      this.setState({
        cardCountValue: value,
        cardCountError: true,
        cardCountHelperText: "Only whole numbers are accepted"
      });
    }
  };
  handleCardImageChange = event => {
    let value = event.target.value;
    if (
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value) &&
      value.length > 0 &&
      value.length < 10000
    ) {
      this.setState({
        cardImageValue: value,
        cardImageError: false,
        cardImageHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardImage: value };
    } else {
      this.setState({
        cardImageValue: value,
        cardImageError: true,
        cardImageHelperText:
          "Only valid image links of max length 10000 are accepted"
      });
    }
  };
  handleCardVendorChange = event => {
    let value = event.target.value;
    if (/^[A-Za-z\s]+$/.test(value) && value.length > 0 && value.length < 100) {
      this.setState({
        cardVendorValue: value,
        cardVendorError: false,
        cardVendorHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardVendor: value };
    } else {
      this.setState({
        cardVendorValue: value,
        cardVendorError: true,
        cardVendorHelperText: "Only alphabets of max length 100 are accepted"
      });
    }
  };
  handleCardShortDescChange = event => {
    let value = event.target.value;
    if (value.length > 0 && value.length < 100) {
      this.setState({
        cardShortDescValue: value,
        cardShortDescError: false,
        cardShortDescHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardShortDesc: value };
    } else {
      this.setState({
        cardShortDescValue: value,
        cardShortDescError: true,
        cardShortDescHelperText: "Only alphabets of max length 100 are accepted"
      });
    }
  };
  handleCardLongDescChange = event => {
    let value = event.target.value;
    if (value.length > 0 && value.length < 10000) {
      this.setState({
        cardLongDescValue: value,
        cardLongDescError: false,
        cardLongDescHelperText: ""
      });
      this.updatePayload = { ...this.updatePayload, cardLongDesc: value };
    } else {
      this.setState({
        cardLongDescValue: value,
        cardLongDescError: true,
        cardLongDescHelperText:
          "Only alphabets of max length 10000 are accepted"
      });
    }
  };
  cardObject = {};

  addUpdateCard = () => {
    // let cardExpiryDateValue = new Date(this.state.cardExpiryDateValue).getTime();
    // let currentDate = new Date().getTime()
    if (
      this.state.cardNameError ||
      this.state.cardPointsError ||
      this.state.cardCategoryError ||
      this.state.cardRetailerError ||
      this.state.cardExpiryDateError ||
      this.state.cardCountError ||
      this.state.cardImageError ||
      this.state.cardVendorError ||
      this.state.cardShortDescError ||
      this.state.cardLongDescError ||
      this.state.cardNameValue === "" ||
      this.state.cardPointsValue === "" ||
      this.state.cardCategoryValue === "" ||
      this.state.cardRetailerValue === "" ||
      this.state.cardExpiryDateValue === "" ||
      this.state.cardCountValue === "" ||
      this.state.cardImageValue === "" ||
      this.state.cardVendorValue === "" ||
      this.state.cardShortDescValue === "" ||
      this.state.cardLongDescValue === ""
    ) {
      this.setState({
        showErrorSnackBar: true
      });
      setTimeout(() => {
        this.setState({
          showErrorSnackBar: false
        });
      }, 6000);
      console.log("validation failed or some fields are missing");
      //  return <MySnackbar message='Some validations are failing' color='red'/>
      return;
    } else if (!this.props.match.params.id) {
      console.log("else called proper");
      let cardExpiryDateValue = new Date(this.state.cardExpiryDateValue);
      this.cardObject = {
        id: Math.floor(Math.random() * 100 + 1),
        cardName: this.state.cardNameValue,
        cardPoints: this.state.cardPointsValue,
        cardCategory: this.state.cardCategoryValue,
        cardRetailer: this.state.cardRetailerValue,
        cardIssueDate: new Date(),
        cardExpiryDate: cardExpiryDateValue,
        cardCount: this.state.cardCountValue,
        cardImage: this.state.cardImageValue,
        cardVendor: this.state.cardVendorValue,
        cardShortDesc: this.state.cardShortDescValue,
        cardLongDesc: this.state.cardLongDescValue,
        cardComments: []
      };
      this.props.adminAddCard(this.cardObject).then(() => {
        console.log("promise resolved");
        this.setState({
          showSuccessSnackBar: true
        });
        console.log(this.state.showSuccessSnackBar);
        setTimeout(() => {
          console.log("snackbar closing");
          this.setState({
            showSuccessSnackBar: false
          });
          history.push("/giftCards");
        }, 2000);
      });
    } else {
      console.log(JSON.stringify(this.updatePayload));
      if (Object.keys(this.updatePayload).length !== 0) {
        this.props
          .adminUpdateCard(this.currentGiftCard.id, this.updatePayload)
          .then(() => {
            this.setState({
              showUpdateSnackBar: true
            });
            setTimeout(() => {
              this.setState({
                showUpdateSnackBar: false
              });
              history.push("/giftCards");
            }, 2000);
          });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          testData="input1"
          inputType="text"
          inputPlaceholder={"Card Name"}
          inputValue={this.state.cardNameValue}
          inputError={this.state.cardNameError}
          endAdornment={false}
          inputHelperText={this.state.cardNameHelperText}
          handleInputChange={this.handleCardNameChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="text"
          inputPlaceholder={"Card Points"}
          inputValue={this.state.cardPointsValue}
          inputError={this.state.cardPointsError}
          endAdornment={false}
          inputHelperText={this.state.cardPointsHelperText}
          handleInputChange={this.handleCardPointsChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="text"
          inputPlaceholder={"Card Category"}
          inputValue={this.state.cardCategoryValue}
          inputError={this.state.cardCategoryError}
          endAdornment={false}
          inputHelperText={this.state.cardCategoryHelperText}
          handleInputChange={this.handleCardCategoryChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="text"
          inputPlaceholder={"Card Retailer"}
          inputValue={this.state.cardRetailerValue}
          inputError={this.state.cardRetailerError}
          endAdornment={false}
          inputHelperText={this.state.cardRetailerHelperText}
          handleInputChange={this.handleCardRetailerChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="date"
          inputPlaceholder={"Card Expiry Date"}
          inputValue={this.state.cardExpiryDateValue}
          inputError={this.state.cardExpiryDateError}
          endAdornment={false}
          inputHelperText={this.state.cardExpiryDateHelperText}
          handleInputChange={this.handleCardExpiryDateChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="text"
          inputPlaceholder={"Card Count"}
          inputValue={this.state.cardCountValue}
          inputError={this.state.cardCountError}
          endAdornment={false}
          inputHelperText={this.state.cardCountHelperText}
          handleInputChange={this.handleCardCountChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="text"
          inputPlaceholder={"Card Image"}
          inputValue={this.state.cardImageValue}
          inputError={this.state.cardImageError}
          endAdornment={false}
          inputHelperText={this.state.cardImageHelperText}
          handleInputChange={this.handleCardImageChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="text"
          inputPlaceholder={"Card Vendor"}
          inputValue={this.state.cardVendorValue}
          inputError={this.state.cardVendorError}
          endAdornment={false}
          inputHelperText={this.state.cardVendorHelperText}
          handleInputChange={this.handleCardVendorChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="text"
          inputPlaceholder={"Short Description"}
          inputValue={this.state.cardShortDescValue}
          inputError={this.state.cardShortDescError}
          endAdornment={false}
          inputHelperText={this.state.cardShortDescHelperText}
          handleInputChange={this.handleCardShortDescChange.bind(this)}
          // ref="myInput"
        />
        <InputTypeComponent
          styles={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            width: "45%"
          }}
          inputType="text"
          inputPlaceholder={"Long Description"}
          inputValue={this.state.cardLongDescValue}
          inputError={this.state.cardLongDescError}
          endAdornment={false}
          inputHelperText={this.state.cardLongDescHelperText}
          handleInputChange={this.handleCardLongDescChange.bind(this)}
          // ref="myInput"
        />
        <div style={{ marginTop: "10px", marginBottom: "100px" }}>
          <Button
            id="clear"
            variant="contained"
            style={{ marginLeft: "20px" }}
            onClick={this.clearInput}
          >
            CLEAR
          </Button>
          <Button
            testData="update/addButton"
            variant="contained"
            style={{ marginLeft: "10px" }}
            color="primary"
            onClick={this.addUpdateCard}
          >
            {this.props.match.params.id ? "UPDATE" : "ADD"}
          </Button>
        </div>
        <div>
          {this.state.showErrorSnackBar ? (
            <Snackbar
              message={"Validation failed or some fields are missing"}
              color="red"
            />
          ) : null}
          {this.state.showSuccessSnackBar ? (
            <Snackbar message={"Card added successfully"} color="green" />
          ) : null}
          {this.state.showUpdateSnackBar ? (
            <Snackbar message={"Card updated successfully"} color="green" />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => {
  return {
    giftCards: state.gifts.giftCards
  };
};

export default connect(mapStateToProps, { adminAddCard, adminUpdateCard })(
  withRouter(AddUpdateForm)
);
