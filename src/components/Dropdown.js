import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToPortfolio } from '../redux/actions'

class Dropdown extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedSymbol: ''
    };
  }

  get isSymbolSelected() {
    return !!this.state.selectedSymbol.length;
  }

  getSelectedCoin() {
    const { coins } = this.props;
    return coins.filter((coin) => coin.symbol === this.state.selectedSymbol)[0];
  }

  addToPortfolio() {
    const selectedCoin = this.getSelectedCoin();
    const { addToPortfolio } = this.props;
    addToPortfolio(selectedCoin);
    this.setState({
      selectedSymbol: ''
    });
  }

  render() {
    const coins = this.props.coins;
    return (
      <section className="top">
        <Autocomplete
          className="dd"
          options={coins}
          getOptionLabel={(option) => option ? option.symbol : ''}
          style={{ width: 300 }}
          onInputChange={(event, symbol) => {
            this.setState({
              selectedSymbol: symbol
            });
          }}
          renderInput={(params) => <TextField {...params} label={`Available Coins (${this.props.coins.length})`} variant="outlined" size="small" />}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={!this.isSymbolSelected}
          onClick={() => this.addToPortfolio()}>
          Add to Portfolio
        </Button>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  coins: state.coins.coins
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ addToPortfolio }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);