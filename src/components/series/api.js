import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://alpha-vantage.p.rapidapi.com',
    headers: {
        'content-type':'application/octet-stream',
        'x-rapidapi-host':'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': 'acf69a0d89msh5b0524780e29fadp12ed3ajsn1ddd69758a7a'
    }
});

export default {
    monthStockTimeSeries: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            'outputsize':'compact',
            'datatype':'json',
            'function':'TIME_SERIES_DAILY_ADJUSTED',
            'symbol': symbol.toUpperCase(),
            'extended_hours': 'false'
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')
            const json = JSON.parse(data)
            const dates = Object.keys(json['Time Series (Daily)']).slice(0,20).reverse()
            // Construct response data for chart input
            const closePrices = dates.map(date => date = {
                date: date.slice(-5),
                close: Number(json['Time Series (Daily)'][date]['4. close'])
            })
            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']


            const closeValues = closePrices.map(item => item.close);
            const minPrice = Math.min(...closeValues);
            const maxPrice = Math.max(...closeValues);
            const temp = (closeValues[closeValues.length - 1] - closeValues[0]) / closeValues[0] * 100;

            const change = temp.toFixed(2);
            data = {
                symbol,
                refreshed,
                closePrices,
                minPrice,
                maxPrice,
                change
            }
            return data;
        }],
    }),

    hourStockTimeSeries: (symbol) => 
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            'outputsize':'compact',
            'datatype':'json',
            'function':'TIME_SERIES_INTRADAY',
            'interval': '5min',
            'symbol': symbol.toUpperCase(),
            'extended_hours': 'false'
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')

            
            const json = JSON.parse(data)
            const dates = Object.keys(json['Time Series (5min)']).slice(0,12).reverse()
            console.log('sliced')

            // Construct response data for chart input
            const closePrices = dates.map(date => date = {
                date: date.slice(-8,-3),
                close: Number(json['Time Series (5min)'][date]['4. close'])
            })
            console.log('closed')

            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']


            const closeValues = closePrices.map(item => item.close);
            const minPrice = Math.min(...closeValues);
            const maxPrice = Math.max(...closeValues);
            const temp = (closeValues[closeValues.length - 1] - closeValues[0]) / closeValues[0] * 100;

            const change = temp.toFixed(2);
            data = {
                symbol,
                refreshed,
                closePrices,
                minPrice,
                maxPrice,
                change

            }
            return data;
        }],
    }),


    
    threeHourStockTimeSeries: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            'outputsize':'compact',
            'datatype':'json',
            'function':'TIME_SERIES_INTRADAY',
            'interval': '5min',
            'symbol': symbol.toUpperCase(),
            'extended_hours': 'false'
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')

            
            const json = JSON.parse(data)
            const dates = Object.keys(json['Time Series (5min)']).slice(0,36).reverse()
            console.log('sliced')

            // Construct response data for chart input
            const closePrices = dates.map(date => date = {
                date: date.slice(-8, -3),
                close: Number(json['Time Series (5min)'][date]['4. close'])
            })
            console.log('closed')

            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']


            const closeValues = closePrices.map(item => item.close);
            const minPrice = Math.min(...closeValues);
            const maxPrice = Math.max(...closeValues);
            const temp = (closeValues[closeValues.length - 1] - closeValues[0]) / closeValues[0] * 100;

            const change = temp.toFixed(2);
            data = {
                symbol,
                refreshed,
                closePrices,
                minPrice,
                maxPrice,
                change

            }
            return data;
        }],
    }),

    pastDayStockTimeSeries: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            'outputsize':'compact',
            'datatype':'json',
            'function':'TIME_SERIES_INTRADAY',
            'interval': '60min',
            'symbol': symbol.toUpperCase(),
            'extended_hours': 'false'
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')

            
            const json = JSON.parse(data)
            const dates = Object.keys(json['Time Series (60min)']).slice(0,24).reverse()
            console.log('sliced')

            // Construct response data for chart input
            const closePrices = dates.map(date => date = {
                date: date.slice(-8, -3),
                close: Number(json['Time Series (60min)'][date]['4. close'])
            })
            console.log('closed')

            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']


            const closeValues = closePrices.map(item => item.close);
            const minPrice = Math.min(...closeValues);
            const maxPrice = Math.max(...closeValues);
            const temp = (closeValues[closeValues.length - 1] - closeValues[0]) / closeValues[0] * 100;

            const change = temp.toFixed(2);
            
            data = {
                symbol,
                refreshed,
                closePrices,
                minPrice,
                maxPrice,
                change

            }
            return data;
        }],
    }),

    pastHalfDayStockTimeSeries: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            'outputsize':'compact',
            'datatype':'json',
            'function':'TIME_SERIES_INTRADAY',
            'interval': '30min',
            'symbol': symbol.toUpperCase(),
            'extended_hours': 'false'
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')

            
            const json = JSON.parse(data)
            const dates = Object.keys(json['Time Series (30min)']).slice(0,24).reverse()
            console.log(dates)

         
         

            // Construct response data for chart input
            const closePrices = dates.map(date => date = {
                date: date.slice(-8, -3),
                close: Number(json['Time Series (30min)'][date]['4. close'])
            })

            

            console.log('closed')

            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']


            const closeValues = closePrices.map(item => item.close);
            const minPrice = Math.min(...closeValues);
            const maxPrice = Math.max(...closeValues);
            const temp = (closeValues[closeValues.length - 1] - closeValues[0]) / closeValues[0] * 100;

            const change = temp.toFixed(2);
            data = {
                symbol,
                refreshed,
                closePrices,
                minPrice,
                maxPrice,
                change

            }
            return data;
        }],
    }),

    threeMonthStockTimeSeries: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            
            'datatype':'json',
            'function':'TIME_SERIES_WEEKLY_ADJUSTED',
            'symbol': symbol.toUpperCase(),
            
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')
            const json = JSON.parse(data)
            const dates = Object.keys(json['Weekly Adjusted Time Series']).slice(0,14).reverse()
            // Construct response data for chart input
            const closePrices = dates.map(date => date = {
                date: date.slice(-5),
                close: Number(json['Weekly Adjusted Time Series'][date]['4. close'])
            })
            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']


            const closeValues = closePrices.map(item => item.close);
            const minPrice = Math.min(...closeValues);
            const maxPrice = Math.max(...closeValues);
            const temp = (closeValues[closeValues.length - 1] - closeValues[0]) / closeValues[0] * 100;

            const change = temp.toFixed(2);
            data = {
                symbol,
                refreshed,
                closePrices,
                minPrice,
                maxPrice,
                change
            }
            return data;
        }],
    }),

    sixMonthStockTimeSeries: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            
            'datatype':'json',
            'function':'TIME_SERIES_WEEKLY_ADJUSTED',
            'symbol': symbol.toUpperCase(),
            
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')
            const json = JSON.parse(data)
            const dates = Object.keys(json['Weekly Adjusted Time Series']).slice(0,29).reverse()
            // Construct response data for chart input
            const closePrices = dates.map(date => date = {
                date: date.slice(-5),
                close: Number(json['Weekly Adjusted Time Series'][date]['4. close'])
            })
            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']


            const closeValues = closePrices.map(item => item.close);
            const minPrice = Math.min(...closeValues);
            const maxPrice = Math.max(...closeValues);
            const temp = (closeValues[closeValues.length - 1] - closeValues[0]) / closeValues[0] * 100;

            const change = temp.toFixed(2);
            data = {
                symbol,
                refreshed,
                closePrices,
                minPrice,
                maxPrice,
                change
            }
            return data;
        }],
    }),

    yearStockTimeSeries: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            
            'datatype':'json',
            'function':'TIME_SERIES_MONTHLY_ADJUSTED',
            'symbol': symbol.toUpperCase(),
            
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')
            const json = JSON.parse(data)
            const dates = Object.keys(json['Monthly Adjusted Time Series']).slice(0, 13).reverse()
            // Construct response data for chart input
            const closePrices = dates.map(date => date = {
                date: date.slice(-5),
                close: Number(json['Monthly Adjusted Time Series'][date]['4. close'])
            })
            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']


            const closeValues = closePrices.map(item => item.close);
            const minPrice = Math.min(...closeValues);
            const maxPrice = Math.max(...closeValues);
            const temp = (closeValues[closeValues.length - 1] - closeValues[0]) / closeValues[0] * 100;

            const change = temp.toFixed(2);
            data = {
                symbol,
                refreshed,
                closePrices,
                minPrice,
                maxPrice,
                change
            }
            return data;
        }],
    }),




}