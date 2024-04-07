import { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

class Loading extends Component {
    render() { 
        return (
            <div className='row justify-content-center mt-4'>
                {
                    Array(18).fill([]).map(()=>{
                        return (
                            <div className="col-2 text-center m-3 p-3">
                                <Skeleton height={25} width={200} />
                                <Skeleton circle={true} height={100} width={100} />
                                <Skeleton height={25} width={100} count={2} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
 
export default Loading;