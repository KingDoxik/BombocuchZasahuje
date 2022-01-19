import { ReactElement } from 'react'
import { FlagIcon, FireIcon } from '@heroicons/react/outline'
import { TileModel } from '../core/minesweeper';


interface TileProps {
    tile: TileModel,
    onReveal: () => void,
    onAddFlag: () => void,
    onRemoveFlag: () => void,
}

export default function Tile({ tile, onReveal, onAddFlag, onRemoveFlag }: TileProps): ReactElement {
    if (tile.flag === true) {
        return (
            <button onClick={onRemoveFlag} onContextMenu={(e) => { e.preventDefault(); onRemoveFlag() }} className="w-12 h-12 bg-green-100 hover:bg-green-50 rounded-lg border-2 border-green-300 flex items-center justify-center">
                <FlagIcon className="w-6 h-6 text-green-500" />
            </button>
        );
    }
    
    if (!tile.revealed) {
        return (
            <button onClick={onReveal} onContextMenu={(e) => { e.preventDefault(); onAddFlag() }} className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition duration-100" />
        )
    }
    
    if (tile.bomb) {
        return (<div className="w-12 h-12 bg-red-100 rounded-lg border-2 border-red-300 flex items-center justify-center">
            <FireIcon className="w-6 h-6 text-red-500" />
        </div>);
    }

    return (
        <div className="w-12 h-12 bg-white rounded-lg border-2 border-gray-100 transition duration-100 flex items-center justify-center">
            {
                tile.number ? (<span>{tile.number}</span>) : <></>
            }
        </div>
    )
}
