import {useDispatch, useSelector} from 'react-redux';
import React, { useState, useEffect } from 'react';
import {changeSymbol} from './../../redux/action/index'
import api from './api';
import {
  LineChart,
  XAxis,
  CartesianGrid,
  Line,
  Tooltip,
  YAxis,
  Label
} from 'recharts' ;

export const Series = () => {

    const dispatch = useDispatch();
    /* Everything below this line will have to do with updating the symbol we're looking at */
    const [symbol, setSymbol] = useState("");
    const [message, setMessage] = useState("");
    const [responseData, setResponseData] = useState("");

    
    const currSymbol = useSelector((state) => state.symbol);
  
    const fetchData = (e) => { //default and past month data
      e.preventDefault()
      dispatch(changeSymbol(symbol));

      setMessage("Loading...")

      api.monthStockTimeSeries(symbol)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
            console.log(response.data)
            
        })
        .catch((error)=>{
          setMessage("fuck")
          console.log(error)
        })

    }

    /* Everything Above this line will have to do with updating the symbol we're looking at */




    const fetchPastThreeHourData = (e) =>{
      e.preventDefault()
      dispatch(changeSymbol(symbol));
      
      setMessage("Loading...")

      api.threeHourStockTimeSeries(symbol)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
            console.log(response.data)
            
        })
        .catch((error)=>{
          setMessage("fuck")
          console.log(error)
        })

    } 
    

    const fetchPastDayData = (e) =>{
      e.preventDefault()
      dispatch(changeSymbol(symbol));
      
      setMessage("Loading...")

      api.pastDayStockTimeSeries(symbol)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
            console.log(response.data)
            
        })
        .catch((error)=>{
          setMessage("fuck")
          console.log(error)
        })

    } 

    const fetchHalfDayData = (e) =>{
      e.preventDefault()
      dispatch(changeSymbol(symbol));
      
      setMessage("Loading...")

      api.pastHalfDayStockTimeSeries(symbol)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
            console.log(response.data)
            
        })
        .catch((error)=>{
          setMessage("fuck")
          console.log(error)
        })

    } 

    const fetchThreeMonthData = (e) =>{
      e.preventDefault()
      dispatch(changeSymbol(symbol));
      
      setMessage("Loading...")

      api.threeMonthStockTimeSeries(symbol)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
            console.log(response.data)
            
        })
        .catch((error)=>{
          setMessage("fuck")
          console.log(error)
        })

    } 

    const fetchSixMonthData = (e) =>{
      e.preventDefault()
      dispatch(changeSymbol(symbol));
      
      setMessage("Loading...")

      api.sixMonthStockTimeSeries(symbol)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
            console.log(response.data)
            
        })
        .catch((error)=>{
          setMessage("fuck")
          console.log(error)
        })
    }

    const fetchYearData = (e) =>{
      e.preventDefault()
      dispatch(changeSymbol(symbol));
      
      setMessage("Loading...")

      api.yearStockTimeSeries(symbol)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
            console.log(response.data)
            
        })
        .catch((error)=>{
          setMessage("fuck")
          console.log(error)
        })
    }






  return (
    <div className='Series d-flex flex-column ' >
      <form onSubmit={fetchData}> 
        <input placeholder ='Search for a Symbol' value={symbol} onChange={event => setSymbol(event.target.value)} /><button type="submit">Search</button>
      </form>
      <div className='InfoArea d-flex flex-row '>
        <div className='GraphArea'>
          <h3>Symbol: {responseData ? responseData.symbol : ''}</h3>
          <p>Daily Time Series with Splits and Dividend Events</p>
          <small>Last Refresh: {responseData ? responseData.refreshed : ''}</small>
          <LineChart
              width={900}
              height={500}
              data={responseData.closePrices}
              margin={{ top: 50, right: 20, left: 10, bottom: 5 }}
              >
              <YAxis tickCount={100} domain={[responseData.minPrice, responseData.maxPrice]}  type="number" width={80}>
                  <Label value="Close Price" position="insideLeft" angle={270} />
              </YAxis>
              <Tooltip />
              <XAxis padding={{left: 4, right: 4}} tickCount={20} angle={0} height={90} dataKey="date" />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="close" stroke="#ff7300" yAxisId={0} />
            </LineChart>        
              
              
              
              <button onClick={fetchPastThreeHourData}>Last Three Hours</button>
              <button onClick={fetchPastDayData}>Last 24 Hours</button>
              <button onClick={fetchHalfDayData}>Last 12 Hours</button>
              <button onClick={fetchData}>Past Month</button>
              <button onClick={fetchThreeMonthData}>Last 3 Months</button>
              <button onClick={fetchSixMonthData}>Last 6 Months</button>
              <button onClick={fetchYearData}>Last Year</button>
            </div>
            <div className='border solid'> 
              <h1>Stats for the Current Temporal Scope</h1>

              <h2>Max: {responseData.maxPrice}</h2>
              <h2>Min: {responseData.minPrice}</h2>
              <h2>% Change: {responseData.change}  </h2>


            </div>

          </div>
    </div>
  )
}
