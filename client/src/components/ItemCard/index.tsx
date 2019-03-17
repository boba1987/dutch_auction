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

const styles = (theme: Theme) => createStyles({
  card: {
    maxWidth: 345,
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
  image: string,
  height: string,
  title: string,
  alt: string,
  description: string
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
  const { classes, image, alt, height, title, description } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMediaComponent 
          component="img"
          height={height}
          alt={alt}
          className={classes.media}
          image={image}
          title={title}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Make a Bid
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(ImgMediaCard);