import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 769,
            lg: 1024,
            xl: 1200,
        },
    },
});

export default function CardTile({ movie }) {
    let navigate = useNavigate();


    let slug = movie.title.toLowerCase().split(' ').join('-');

    return (

        <Card id={ movie._id } sx={ { maxWidth: 300, width: '100%', height: '100%', backgroundColor: '#6444e4', borderRadius: '1rem', [theme.breakpoints.down('sm')]: { borderRadius: '0.5rem', maxWidth: 150, backgroundColor: '#6444e4' } } } onClick={ () => navigate(`/movie/${slug}/${movie._id}`) }>
            <CardActionArea>
                <CardMedia
                    component="img"
                    // height="140"
                    image={ `${movie.posterURL}` }
                    sx={ { objectFit: 'cover', height: 'auto', width: '100%', aspectRatio: '2 / 3', [theme.breakpoints.up('sm')]: { aspectRatio: '2 / 3' } } }
                    alt={ movie.title }
                />
                <CardContent sx={ {
                    // --- Base Styles (for xs screens: 0px and up till 599px) ---
                    minHeight: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', // Added to help center the text block

                    // --- Overrides for larger screens ---
                    // For sm screens (600px and up till 768px)
                    [theme.breakpoints.up('sm')]: {
                        minHeight: '1rem',
                    },
                    // For md screens (769px and up till 1023px)
                    [theme.breakpoints.up('md')]: {
                        minHeight: '2rem',
                    },
                    // For lg screens (1024px and up)
                    [theme.breakpoints.up('lg')]: {
                        minHeight: '3rem',
                    }
                } }>
                    <Typography variant="h3" component="div" sx={ {
                        fontSize: '0.8rem', textAlign: 'center', color: 'white', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', letterSpacing: '0.17em', width: '100%', [theme.breakpoints.down('sm')]: {
                            fontSize: '0.4rem', fontWeight: 'bold' // smaller text for phones
                        }, [theme.breakpoints.between('sm', 'md')]: {
                            fontSize: '0.5rem', fontWeight: 'bold' // medium text for tablets
                        }
                    }
                    }>
                        { movie.title }
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>

    )
}
