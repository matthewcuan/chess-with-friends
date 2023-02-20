import { Chessboard } from 'react-chessboard';

export default function Board (position, onPieceDragBegin, onPieceDrop) {

    return (
        <Chessboard
          arePiecesDraggable={true}
          position={position}
          onPieceDragBegin={onPieceDragBegin}
          onPieceDrop={onPieceDrop}
          // onPieceDrop={() => console.log("it has been dropped")}        
        />
    )
}

