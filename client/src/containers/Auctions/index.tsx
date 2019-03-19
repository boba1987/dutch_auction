import React, {Component} from 'react';
import Card from '../../components/ItemCard';
import axios from 'axios';
import io from 'socket.io-client';

interface Auction {
  title: string, 
  description: string, 
  status: string,
  id: number,
  price: number,
  seller: string
};

class AuctionsPage extends Component<any, {auctions: Auction[]}> {
  constructor(props: any) {
    super(props);

    this.state = {
      auctions: []
    }
  }
  componentDidMount() {
    axios({
      url: '/auction?'
    }).then(({data}: any) => {
      this.setState({auctions: data});
    }).catch(error => console.error(error));

    const socket = io("ws://localhost:4001");
    socket.on('auctions', (auctions: any) => {
      this.setState({auctions});
    });
  }
  
  render() {
    return (
      <div>
        {this.state.auctions.map((auction: Auction) => <Card 
          status={auction.status}
          key={auction.id}
          price={auction.price}
          title={auction.title}
          seller={auction.seller}
          description={auction.description}/>)}
      </div>
    )
  }
}

export default AuctionsPage;