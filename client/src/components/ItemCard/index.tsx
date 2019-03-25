import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { WithStyles, createStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import moment from 'moment';

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

const ImgMediaCard = (props: ImgMediaCardProps) => {
  const { classes, title, description, status, price, seller, nextUpdate, lastUpdate } = props;
  
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
            <Typography component="p">
              Last price update: 
              { moment(lastUpdate).format('LLLL') }
            </Typography>
            <Typography component="p">
              Next price update: { moment(nextUpdate).format('LLLL') }
            </Typography>
            <CardActions>
              <Button size="small" color="primary">
                Make a Bid
              </Button>
            </CardActions>
          </div>
        ) : ''
      }
    </Card>
  );
}

export default withStyles(styles)(ImgMediaCard);