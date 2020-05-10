import React from "react";
import MaterialTable from 'material-table';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadQuotes, removeFromPortfolio } from '../redux/actions'

class MyCoins extends React.Component {

  loadLatestQuotes() {
    const { loadQuotes, coins } = this.props;
    const coinIds = coins.map(coin => coin.id);
    loadQuotes(coinIds);
  }

  componentDidUpdate(oldProps) {
    if (this.props.coins.length > oldProps.coins.length) {
      this.loadLatestQuotes();
    }
  }

  render() {
    const coins = this.props.coins;
    const columns = [
      { title: 'Symbol', field: 'symbol' },
      { title: 'CMC Rank', field: 'rank' },
      { title: 'Price (USD)', field: 'price' },
    ];
    const rowActions = {
      isDeletable: () => coins.length > 1,
      onRowDelete: (oldData) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            const { removeFromPortfolio } = this.props;
            removeFromPortfolio(oldData);
          }, 100);
        });
      }
    };
    return (
      <section className="table">
        <MaterialTable
          title={`My Portfolio (${this.props.coins.length})`}
          columns={columns}
          data={coins}
          editable={rowActions}
          options={{
            sorting: true,
            pageSize: 10,
            pageSizeOptions: [10, 20]
          }}
        />
      </section>
    )
  }
}

const mapStateToProps = state => ({
  coins: state.coins.portfolio
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ loadQuotes, removeFromPortfolio }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCoins);