import { ReactElement, useCallback, useEffect, useState } from 'react'
import { MineSweeper, TileModel } from '../core/minesweeper';
import Tile from './Tile';

interface Props {
    minesweeper: MineSweeper
}

export default function TileField({ minesweeper }: Props): ReactElement {
    const [tiles, setTiles] = useState<TileModel[]>([]);
    const [tileMatrix, setTileMatrix] = useState<TileModel[][]>([]);

    const onReveal = useCallback((tile: TileModel) => {
        minesweeper.reveal(tile.x, tile.y);
        setTileMatrix(minesweeper.tiles);
    }, [minesweeper]);

    const onAddFlag = useCallback((tile: TileModel) => {
        minesweeper.addFlag(tile.x, tile.y);
        setTileMatrix(minesweeper.tiles);
    }, [minesweeper]);

    const onRemoveFlag = useCallback((tile: TileModel) => {
        minesweeper.removeFlag(tile.x, tile.y);
        setTileMatrix(minesweeper.tiles);
    }, [minesweeper]);

    useEffect(() => {
        let tilesFlat: TileModel[] = [];
        tileMatrix.forEach((tilesX) => { tilesFlat = [...tilesFlat, ...tilesX] });
        setTiles(tilesFlat);
    }, [tileMatrix]);

    useEffect(() => {
        setTileMatrix(minesweeper.tiles);
    }, [minesweeper.tiles])

    return (
        <div>
            <div style={{ gridTemplateColumns: ('repeat(' + minesweeper.columns.toString() + ', minmax(0, 1fr))') }} className={"grid gap-4"}>
                {
                    tiles.map((tile, i) => <Tile onAddFlag={() => onAddFlag(tile)} onRemoveFlag={() => onRemoveFlag(tile)} onReveal={() => onReveal(tile)} tile={tile} key={i} />)
                }
            </div>
        </div>
    )
}
