const express = require('express')
const axios = require('axios')

const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/GetExchangeRate', async (req, res) => {
    try {
        const { amount } = req.query
        const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=3c3a736d-2bb8-4501-90de-d7e51bf4dc4e&amount=${amount}&symbol=ETH&convert=USD`)

        res.send({ amount, USD: response.data.data.quote.USD['price'] })
    } catch (error) {
        console.log(error)
    }
})

app.listen(8000, () => {
    console.log("successfull")
})