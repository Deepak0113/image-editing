import { FC, useEffect, useRef, useState } from "react";
import '../styles/Board.css'
import BoardToolBar from "./BoardToolBar";
import DrawManager from "../utility/board/DrawBoard";
import { convertSvgToJpegDataUrl, getUInt8ArrayFromDataUrl } from "../utility/helper";
import { uploadImage } from "../api/api";


interface BoardProps {
    imageUrl: string;
    popupCloseToggle: () => void
}


const Board: FC<BoardProps> = ({ imageUrl, popupCloseToggle }) => {
    const boardRef = useRef<SVGSVGElement | null>(null); // reference for the svg element
    const [boardElementAttribute, setBoardElementAttribute] = useState<BoardElementAttribute>({
        fill: '#000000',
        lineWidth: 5,
        lineType: 'line',
        lineColor: '#000000'
    } as BoardElementAttribute); // board element attributes
    const [editMode, setEditMode] = useState<BoardEditMode>('pen'); // board edit mode type
    const [shapeSides, setShapeSides] = useState<number>(3); // sides of the shape to be created. default = 3
    const [drawBoard, setDrawBoard] = useState<DrawManager>(); // object of the DrawBoard to create shapes and draw


    useEffect(() => createSvgBoard(), [])


    // create svg board
    const createSvgBoard = () => {
        if (!boardRef) return;
        if (!boardRef.current) return;

        const svg = boardRef.current;
        const imageElement = new Image();
        // imageElement.src = imageUrl;

        imageElement.src = imageUrl
        imageElement.onload = () => {
            const aspectRatio = imageElement.width / imageElement.height;

            const svgHeight = 500;
            const svgWidth = aspectRatio * svgHeight;

            svg.setAttribute('height', `${svgHeight}`);
            svg.setAttribute('width', `${svgWidth}`);

            const imageSvgElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');

            // imageSvgElement.setAttribute('xlink:href', imageUrl);
            imageSvgElement.setAttribute('href', imageUrl);
            imageSvgElement.setAttribute('height', `${svgHeight}`)

            svg.appendChild(imageSvgElement)
        }

        const board = new DrawManager(svg);
        board.changeAttribute(boardElementAttribute)
        setDrawBoard(board);
        editMode === 'pen' ? board.startPen() : board.startShape(shapeSides);
    }


    // function to change the attributes of the svg elements created
    const changeAttribute = (changedAttribute: BoardElementAttribute) => {
        if (!drawBoard) return;

        console.log(changedAttribute)
        setBoardElementAttribute(() => changedAttribute);
        drawBoard.changeAttribute(changedAttribute);
    }


    // function to change the mode of edit element pen_mode, shape_mode
    const changeEditMode = (changedEditMode: BoardEditMode, sides?: number) => {
        console.log(`Edit mode => ${changedEditMode}`)
        if (!drawBoard) return;
        if(changedEditMode === 'pen'){
            drawBoard.startPen()
        } else if (changedEditMode === 'shapes') {
            drawBoard.startShape(sides === undefined ? 4 : sides)
        } else {
            drawBoard.startPointer()
        }
        setEditMode(changedEditMode);
    }

    // handle uploading image
    const handleUploadingImage = async () => {
        if (!boardRef) return;
        if (!boardRef.current) return;
        
        const svg = boardRef.current;
        
        try {
            const url = await convertSvgToJpegDataUrl(svg, imageUrl);
            const file = new File([new Uint8Array(getUInt8ArrayFromDataUrl(url))], 'dsa')
            const result = await uploadImage(file);
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="board">
            <div className="toolbar__container">
                <BoardToolBar
                    changeAttribute={changeAttribute}
                    changeEditMode={changeEditMode} />
                <button className="button ghost-btn" onClick={popupCloseToggle}>Clear board</button>
                <button className="button primary-btn clr-btn" onClick={handleUploadingImage}>Upload</button>
            </div>
            <svg ref={boardRef}></svg>
        </div>
    );
}

export default Board;