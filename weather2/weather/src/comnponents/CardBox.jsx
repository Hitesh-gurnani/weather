import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Box, sliderClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ImLocation } from 'react-icons/im'
import { BiSearch } from 'react-icons/bi'
import InputAdornment from "@mui/material/InputAdornment";
import Datafetech from './Datafetech';
import { useEffect } from 'react';
import axios from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UilSun } from '@iconscout/react-unicons'
import getWeatherData from '../service/WeatherService';
import fetch from 'react'
const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
    return (
        <TextField
            {...props}
            InputProps={{
                ...InputProps,
                startAdornment: iconStart ? (
                    <InputAdornment position="start">{iconStart}</InputAdornment>
                ) : null,
                endAdornment: iconEnd ? (
                    <InputAdornment position="end">{iconEnd}</InputAdornment>
                ) : null
            }}
        />
    );
};


const options = {
    axisX: {
        gridThickness: 1,
        lineThickness: 0,
        labelFormatter: function () {
            return "10:10pm";
        }
    },
    axisY: {
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 0,
        labelFormatter: function () {
            return " ";
        }
    },

    data: [
        {
            type: "line",
            dataPoints: [
                { x: 10, y: 10 },
                { x: 20, y: 12 },
                { x: 30, y: 14 },
                { x: 40, y: 16 },
                { x: 50, y: 18 },
                { x: 60, y: 25 },


            ]
        }
    ]
}

function CardBox() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [place, setplace] = useState('')
    const [weatherObj, setweatherObj] = useState('');
    const [weatherData, setweatherData] = useState('')
    const [weatherData5days, setweatherData5days] = useState([])
    const [search, setsearch] = useState(false);
    const [requiredlist, setrequiredlist] = useState(false)
    const fetchWeather = async () => {
        let data = await getWeatherData('weather', { q: `${place}` })
        setweatherData(data)
        let data2 = await getWeatherData('forecast', { q: `${place}` })
        setweatherData5days(data2)
    }
    console.log(weatherData5days)
    useEffect(() => {
        fetchWeather()
    }, [place])


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}><Box sx={{
            width: 400,
            marginTop: '3vh',
            border: '1px solid black',
            borderRadius: '40px',
            height: '95vh',
            backgroundColor: 'white',
        }}>
            <IconTextField label="Enter location" iconStart={<ImLocation />} iconEnd={<BiSearch onClick={() => { setsearch(true) }} />} onChange={(e) => setplace(e.target.value)} style={{ marginTop: '30px', width: '90%' }} />
            {/* {console.log(place)} */}
            <div style={{ marginTop: '-35px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <div style={{ margin: '10px', display: 'flex' }}>
                    {

                        search && weatherData5days.list?.filter((e, i) => i < 4).map((daydata, idx) => {
                            return (
                                <>
                                    <div style={{ margin: '10px' }} key={idx}>
                                        <p>{days[(new Date().getDay() + idx) % 7]}</p>
                                        <div style={{ marginTop: '-20px' }}> <b>{parseFloat(daydata.main.temp_max - 273.15).toFixed(2)}°</b> {parseFloat(daydata.main.temp_min - 273.15).toFixed(2)}°</div>

                                        <img src={`http://openweathermap.org/img/wn/${daydata.weather[0].icon}.png`} alt="" style={{ maxWidth: '40%' }} />
                                        <div style={{ fontSize: '10px' }}>{daydata.weather[0].main}</div>

                                    </div>
                                    {/* {console.log(daydata.main.temp_max)} */}
                                </>
                            )

                        })
                    }

                </div>

                {/* <div style={{ margin: '10px' }}>
                    <p>Fri</p>
                    <div style={{ marginTop: '-20px' }}> <b>28°</b> 28°</div>
                    <UilSun size="20" color="yellow" />
                    <div style={{ fontSize: '10px' }}>Sunny</div>
                </div>
                <div style={{ margin: '10px' }}>
                    <p>Fri</p>
                    <div style={{ marginTop: '-20px' }}> <b>28°</b> 28°</div>
                    <UilSun size="20" color="yellow" />
                    <div style={{ fontSize: '10px' }}>Sunny</div>
                </div>
                <div style={{ margin: '10px' }}>
                    <p>Fri</p>
                    <div style={{ marginTop: '-20px' }}> <b>28°</b> 28°</div>
                    <UilSun size="20" color="yellow" />
                    <div style={{ fontSize: '10px' }}>Sunny</div>
                </div> */}



            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                {search && <Box sx={{
                    width: 350,
                    marginTop: '-2vh',
                    borderRadius: '40px',
                    height: '60vh',
                    backgroundColor: 'white',
                    boxShadow: '1px 2px 5px 0px '

                }} >
                    <div style={{ display: 'flex', textAlign: 'left', marginTop: '-14px', marginLeft: '20px' }}>
                        <p style={{ fontSize: '40px' }}> <b>26°C</b> </p>
                        <UilSun size="80" color="yellow" style={{ paddingLeft: '40px', paddingTop: '30px' }} />
                    </div>
                    <CanvasJSChart options={options} containerProps={{ width: '100%', height: '90px' }}
                    />
                    <div style={{ display: 'flex', marginLeft: '10px', marginTop: '2px' }}>
                        <Card sx={{
                            minWidth: 140, maxHeight: 60, margin: '10px', display: "flex",
                            justifyContent: "flex-start", backgroundColor: 'rgb(245,250,255)'
                        }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 15 }} variant="h5" component="div">
                                    <b>
                                        Pressure
                                    </b>
                                </Typography>
                                <Typography variant="body2">
                                    {search && weatherData?.main?.pressure + 'hp'.toString()}
                                </Typography>
                            </CardContent>

                        </Card>
                        <Card sx={{
                            minWidth: 140, maxHeight: 60, margin: '10px', display: "flex",
                            justifyContent: "flex-start", backgroundColor: 'rgb(245,250,255)'
                        }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 15 }} variant="h5" component="div">
                                    <b>
                                        Humidity
                                    </b>
                                </Typography>
                                <Typography variant="body2" style={{ marginLeft: '-30px' }}>
                                    {search && weatherData?.main?.humidity + '%'.toString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '12px' }}>
                        <div>
                            <Typography variant="body2" >
                                <b>Sunrise</b>
                            </Typography>
                            <Typography variant="body2" >
                                {search && JSON.stringify(new Date(weatherData?.sys?.sunrise * 1000)).slice(12, 20) + 'AM'}
                            </Typography>
                        </div>
                        <div style={{ marginLeft: '170px' }}>
                            <Typography variant="body2" >
                                <b>Sunset</b>

                            </Typography>
                            <Typography variant="body2" >
                                {search && JSON.stringify(new Date(weatherData?.sys?.sunset * 1000)).slice(12, 20) + ' PM'}
                            </Typography>
                        </div>

                    </div>
                </Box>}
            </div>


        </Box >


        </div >


    )
}

export default CardBox