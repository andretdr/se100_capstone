import '../assets/css/Dashboard.css'
import { useState, useContext, useEffect, useCallback } from 'react'
import StockContext from '../context/context'

const APIKEY = 'F2DJWEJ6LHY4XF26';


/** Input field, takes in the var, setVar and the type of input: symbol, quantity or price */
const InputComponent = (props) =>{

    /** verifies if latest input is an alphabet */
    const isAlphabetStr = (input) => {
        return (input.match(/^[a-zA-Z]*$/) != null)
    }

    
    /** verifies if latest input is a number w max 2 dec places */
    const isNumberStr = (input) => {
        return (input.match(/^\d*\.?\d?\d?$/) != null)
    }

    
    /** handles any change in input field */
    const handleChange = (event) => {
        const key = (event.target.value)
        // checks to make sure input is right type
        // if its symbol, just allow alphabets
        if ((props.type === 'symbol') && (isAlphabetStr(key))){
            props.setVar(key);
        }
        else if
        // if its quantity or price, allow numbers only
            (((props.type === 'quantity') || (props.type === 'price')) && (isNumberStr(key))){
            props.setVar(key);
        }
    }


    return (
                (props.type === 'symbol')
                ? <input onChange={handleChange} className='input_box col-8 col-md-3' type='text' id='input_symbol' 
                    name='input_symbol' placeholder='Stock Symbol' value={props.var}></input>
                : (props.type === 'quantity')
                ?   <div className='input-group-my col-8 col-md-3 px-0'>
                        <input onChange={handleChange} className='input_box w-100' type='text' id='input_quantity' 
                            name='input_quantity' placeholder='Quantity' value={props.var}></input>
                        <span className='input-addon'>units</span>
                    </div>
                :   <div className='input-group-my col-8 col-md-3 px-0'>
                        <span className='input-addon'>$</span>
                        <input onChange={handleChange} className='input_box w-100' type='text' id='input_price' 
                        name='input_price' placeholder='Purchase Price' value={props.var}></input>
                    </div>
    )
}


/** Handles error printing */
const HandleErrorComponent = (props) =>{
    return(
        <div className='text-danger text-center py-5'>
            {   (props.inputError.length > 0)
                ? <span>{props.inputError}</span>
                : <span></span>
            }
        </div>
    )
}


/** Handles input logic and rendering */
const DashboardComponent = ()=>{

    // values of input fields at anytime
    const[localSymbol, setLocalSymbol] = useState('');
    const[localQuantity, setLocalQuantity] = useState('');
    const[localPrice, setLocalPrice] = useState('');
    // state of values on key submission
    const[commitState, setCommitState] = useState({symbol:'', quantity:'', price:''});
    // error message for user
    const[inputError, setInputError] = useState('');
    // use context for 'global' state
    const {stock, setStock} = useContext(StockContext);


    /** runs getAPI only on commitState change */
    useEffect(()=>{
        // dont run on mount, theres nothing to retrieve
        if (commitState.symbol !== '')
            getAPI()
    },[commitState])


    /** the function which makes the API call */
    const getAPI = useCallback(async() => {

        try{
            const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${commitState.symbol.toUpperCase()}&apikey=${APIKEY}`, {mode:'cors'});
            const resObj = await res.json();
            // check if quote is valid
            if (!('Global Quote' in resObj))
                throw 'Quote is not available'

            if (!('05. price' in resObj['Global Quote']))
                throw 'Quote is not available, likely symbol does not exist'

            const currPrice = parseFloat(resObj['Global Quote']['05. price']);
            const purchasePrice = parseFloat(commitState.price);
            const quantity = parseFloat(commitState.quantity);
            const pnl = currPrice*quantity - purchasePrice*quantity;
            setStock([...stock, {symbol:localSymbol.toUpperCase(), quantity:quantity.toFixed(2), 
                purchasePrice:purchasePrice.toFixed(2), currPrice: currPrice.toFixed(2), pnl: pnl.toFixed(2)}])
        }
        catch(err){
            setInputError(err);
        }

    });


    /** Checks for any input errors */
    const checkError = () =>{
        let hasError = true;

        localSymbol === ''
        ? setInputError('Stock Symbol cannot be blank')
        : localQuantity === '' || parseFloat(localQuantity) === 0
        ? setInputError('Quantity cannot be 0')
        : localPrice === '' || parseFloat(localPrice) === 0
        ? setInputError('Purchase Price cannot be 0')
        : hasError = false;

        return hasError;
    }


    /** Handles add stock button click */
    const handleClick = () =>{
        // reset error
        setInputError('');
        // if no error, commit the input
        if (!checkError())
            setCommitState({symbol:localSymbol.toUpperCase(), quantity:localQuantity, price:localPrice});
    }


    return (
        <section id='dashboard_component' className='dashboard_component_container'>
            <div className='container-lg dashboard_container'>
                <h1 className='display-5 mb-5'>Finance Dashboard</h1>
                <div className='row gx-4 gy-4 justify-content-evenly align-items-center'>
                    <InputComponent var={localSymbol} setVar={setLocalSymbol} type={'symbol'}/>
                    <InputComponent var={localQuantity} setVar={setLocalQuantity} type={'quantity'}/>
                    <InputComponent var={localPrice} setVar={setLocalPrice} type={'price'}/>
                    <button onClick={handleClick} className='btn btn-primary col-8 col-md-2'>
                        Add Stock
                    </button>
                </div>
                <HandleErrorComponent inputError={inputError}/>
            </div>
        </section>
    )
}

export default DashboardComponent



