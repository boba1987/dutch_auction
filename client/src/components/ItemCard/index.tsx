import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { WithStyles, createStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia, {CardMediaProps} from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import moment from 'moment';
const ReactCountdownClock = require('react-countdown-clock');

const styles = (theme: Theme) => createStyles({
  card: {
    maxWidth: 345,
    margin: '0 auto',
    marginBottom: 20
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
});

interface ImgMediaCardProps extends WithStyles<typeof styles>{
  classes: {
    card: string,
    media: string
  },
  title: string,
  description: string,
  status: string,
  price: number,
  seller: string,
  nextUpdate: string,
  lastUpdate: string
}

interface CardMediaPropsCustom extends CardMediaProps {
  height: string,
  alt: string
}

const CardMediaComponent = (props: CardMediaPropsCustom) => (
  <CardMedia
    {...props}
  />
);

const ImgMediaCard = (props: ImgMediaCardProps) => {
  const { classes, title, description, status, price, seller, nextUpdate, lastUpdate } = props;
  const now = moment(moment().format());
  const next = moment(nextUpdate);
  console.log(now);
  console.log(next);
  console.log(next.diff(now, 'seconds'));
  
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">
          Auction by: <b>{seller}</b>
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
          <Typography component="p">
            Auction Status: {status}
          </Typography>
          <Typography component="p">
            Current price: {price} CHF
          </Typography>
        </CardContent>
      </CardActionArea>
      {
        status == 'ACTIVE' ? (
          <div>
            <CardActions>
            <Button size="small" color="primary">
              Make a Bid
            </Button>
            </CardActions>
            Time to price update:
            <CardActions>
              <ReactCountdownClock 
                seconds={next.diff(now, 'seconds')}
                color="#000"
                alpha={0.9}
                size={50} />
            </CardActions>
          </div>
        ) : ''
      }
    </Card>
  );
}

export default withStyles(styles)(ImgMediaCard);