import '../assets/css/Output.css'
import { useState, useContext, useEffect } from 'react';
import StockContext from '../context/context'

const ResultsComponent = () =>{
    //{symbol:'', quantity:'', purchasePrice:0, currPrice:0, pnl:0}
    const [resultList, setResultList] = useState([]);
    const {stock} = useContext(StockContext);

    return (
        stock.length === 0
        ? <div>
            <div className='text-center'>No Stocks Added Yet</div>
        </div>
        :   <div className='container-sm pb-5'>
                <div className='card my-4 mx-0 shadow-lg border-0'>
                    {stock.map((item, key)=>{return(
                    <div key={'key' + key} className='card-body nth-color px-3 py-5 row justify-content-center'>
                        <div className='col-12 col-sm-9 col-md-6 col-lg-5 px-0'> 
                        <p className='fs-3 fw-semibold mb-3 text-center'>Symbol : {item.symbol}</p>
                        <p className='fw-normal mb-0 px-3 row justify-content-between'>
                            <span className='col-7'>Quantity</span>
                            <span className='col-5 text-end'>{item.quantity}</span>
                        </p>

                        <p className='fw-normal mb-0 px-3 row justify-content-between'>
                            <span className='col-7'>Current Price</span>
                            <span className='col-5 text-end'>${item.currPrice}</span>
                        </p>

                        <p className='fw-normal mb-0 px-3 row justify-content-between'>
                            <span className='col-7'>Purchase Price</span>
                            <span className='col-5 text-end'>${item.purchasePrice}</span>
                        </p>

                        {item.pnl >= 0
                            ?   <p className='fw-semibold text-success mb-0 px-3 row justify-content-between'>
                                    <span className='col-7 fs-5'>Profit/Loss</span>
                                    <span className='col-5 fs-5 text-end'>${item.pnl}</span>
                                </p>
                            :   <p className='fw-semibold text-danger mb-0 px-3 row justify-content-between'>
                                    <span className='col-7 fs-5'>Profit/Loss</span>
                                    <span className='col-5 fs-5 text-end'>${item.pnl}</span>
                                </p>                   
                        }
                        </div>
                    </div>
                    )
                    })}
                </div>
            </div>
    )

}


const OutputComponent = ()=>{


    return (<section className=''>
                <div className='container-lg pt-5'>
                    <h1 className='display-5'>Stock List</h1>
                    <ResultsComponent />
                    <div className='text-end pb-5'>
                        <a href='#dashboard_component'>back to top</a>
                    </div>
                </div>
            </section>
    )
}

export default OutputComponent



