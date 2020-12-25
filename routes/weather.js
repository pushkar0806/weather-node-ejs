const router = require('express').Router();
const fetch = require('node-fetch');

const { URL } = require('../helpers')

/**
 * Get API On initial render of App
 */
router.get('/', (req, res) => {
    res.render('index', {
            city: null,
            desc: null,
            icon: null,
            temp: null
    })
});

/**
 * API to search for the Current weather of the provided city
 */
router.post('/', async (req, res) => {
    const { city } = req.body;
    const url_api = `${URL}${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    try {
        await fetch(url_api)
            .then(res => res.json())
            .then(data => {
                if(data.message === 'city not found') {
                    return res.render('index', {
                        city: data.message && data.message.toUpperCase(),
                        desc: null,
                        icon: null,
                        temp: null
                    })
                } else {
                    const city = data.name;
                    const desc = data.weather[0].description.toUpperCase();
                    const icon = data.weather[0].icon;
                    const temp = data.main.temp;
                    res.render('index', {
                        city, desc, icon, temp
                    })
                }
            })
    } catch(err) {
        res.render('index', {
            city: 'Something went wrong',
            desc: null,
            icon: null,
            temp: null
        })
    }
});

module.exports = router;