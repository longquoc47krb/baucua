import { diceResource } from '../common/constants'
import BettingZone from './BettingZone'

function BettingTable() {
    return (
        <div>
            {/* <p className='px-4 py-2 text-gray-900 bg-[whitesmoke] text-left'>Mức cược:</p> */}
            <div className='grid grid-cols-3 grid-rows-2 betting-table'>
                {
                    diceResource.map((item) => <BettingZone item={item} />)
                }
            </div>
        </div>
    )
}

export default BettingTable