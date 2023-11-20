import { ChangeEvent, FC, useEffect, useState } from "react";
import { CircleIcon, ColorFillCircleIcon, DashLineIcon, EraserIcon, Line2Icon, Line3Icon, PenIcon, PointerIcon, PolygonIcon, SquareIcon, TriangleIcon } from "../icons/icons";
import '../styles/BoardToolBar.css'

interface BoardToolBarProps {
    changeAttribute: (changedAttribute: BoardElementAttribute) => void;
    changeEditMode: (changedEditMode: BoardEditMode, sides?: number) => void;
}

type ToolType = 1 | 2 | 3 | 4 | 5 | 6;
type LineType = 1 | 2 | 3;


const BoardToolBar: FC<BoardToolBarProps> = ({ changeAttribute, changeEditMode }) => {
    const [colorChangeFill, setColorChangeFill] = useState<string>('#000000');
    const [colorChangeBorder, setColorChangeBorder] = useState<string>('#000000');

    const [boardElementAttribute, setBoardElementAttribute] = useState<BoardElementAttribute>({
        fill: '#000000',
        lineWidth: 5,
        lineType: 'line',
        lineColor: '#000000'
    } as BoardElementAttribute); // board element attributes

    const [selectedTool, setSelectedTool] = useState<ToolType>(1);
    const [selectedLine, setSelectedLine] = useState<LineType>(1);


    useEffect(() => {
        changeAttribute(boardElementAttribute)
    }, [boardElementAttribute])


    // function to handle color change while selecting the color from pallet
    const handleColorChangeBorder = (event: ChangeEvent<HTMLInputElement>) => {
        setColorChangeBorder(event.target.value);
        setBoardElementAttribute(prev => (
            {
                ...prev,
                lineColor: event.target.value
            } as BoardElementAttribute
        ))
    }

    const handleColorChangeFill = (event: ChangeEvent<HTMLInputElement>) => {
        setColorChangeFill(event.target.value);
        setBoardElementAttribute(prev => (
            {
                ...prev,
                fill: event.target.value
            } as BoardElementAttribute
        ))
    }

    const handleLineChange = (type: BoardElementAttribute['lineType'], index: LineType) => {
        // setColorChange(event.target.value);
        setSelectedLine(index)
        setBoardElementAttribute(prev => (
            {
                ...prev,
                lineType: type,
                lineWidth: index === 1 ? 3 : 5
            } as BoardElementAttribute
        ))
    }

    // function to handle tool click
    const handleToolClick = (changedEditMode: BoardEditMode, index: ToolType, sides?: number) => {
        if (changedEditMode === 'shapes') {
            changeEditMode(changedEditMode, sides);
        } else {
            changeEditMode(changedEditMode)
        }

        setSelectedTool(index)
    }

    // function to handle line click
    const handleLineClick = (changedEditMode: BoardEditMode, index: ToolType, sides?: number) => {
        if (changedEditMode === 'shapes') {
            changeEditMode(changedEditMode, sides);
        } else {
            changeEditMode(changedEditMode)
        }

        setSelectedTool(index)
    }


    return (
        <div className="toolbar">
            <div className="toolbar__section">
                {/* select edit mode pen */}
                <div className={"icon-btn primary-btn " + (selectedTool === 1 ? 'selected' : null)} onClick={() => handleToolClick('pen', 1)}>
                    <PenIcon height={24} />
                </div>
                {/* select edit mode shapes */}
                <div className={"icon-btn primary-btn " + (selectedTool === 2 ? 'selected' : null)} onClick={() => handleToolClick('shapes', 2, 3)}>
                    <TriangleIcon height={24} />
                </div>
                <div className={"icon-btn primary-btn " + (selectedTool === 3 ? 'selected' : null)} onClick={() => handleToolClick('shapes', 3, 4)}>
                    <SquareIcon height={24} />
                </div>
                <div className={"icon-btn primary-btn " + (selectedTool === 4 ? 'selected' : null)} onClick={() => handleToolClick('shapes', 4, 0)}>
                    <CircleIcon height={24} />
                </div>
                <div className={"icon-btn primary-btn " + (selectedTool === 5 ? 'selected' : null)} onClick={() => handleToolClick('shapes', 5, 5)}>
                    <PolygonIcon height={24} />
                </div>
                <div className={"icon-btn primary-btn " + (selectedTool === 6 ? 'selected' : null)} onClick={() => handleToolClick('eraser', 6)}>
                    {/* <PointerIcon height={24} /> */}
                    <EraserIcon height={24} />
                </div>
            </div>



            {/* selecting color */}
            <div className="btn icon-btn btn-primary color-btn">
                <label htmlFor="color-border">
                    <ColorFillCircleIcon fill={colorChangeBorder} height={24} />
                    Border
                </label>
                <input type="color" style={{ display: 'none' }} id='color-border' onChange={handleColorChangeBorder} />
            </div>
            <div className="btn icon-btn btn-primary color-btn">
                <label htmlFor="color-fill">
                    <ColorFillCircleIcon fill={colorChangeFill} height={24} />
                    Fill
                </label>
                <input type="color" style={{ display: 'none' }} id='color-fill' onChange={handleColorChangeFill} />
            </div>


            <div className="toolbar__section">
                <div className={"icon-btn primary-btn " + (selectedLine === 1 ? 'selected' : null)} onClick={() => handleLineChange('line', 1)}>
                    <Line2Icon height={24} />
                </div>

                <div className={"icon-btn primary-btn " + (selectedLine === 2 ? 'selected' : null)} onClick={() => handleLineChange('line', 2)}>
                    <Line3Icon height={24} />
                </div>

                <div className={"icon-btn primary-btn " + (selectedLine === 3 ? 'selected' : null)} onClick={() => handleLineChange('dash', 3)}>
                    <DashLineIcon height={24} />
                </div>
            </div>
        </div>
    )
}

export default BoardToolBar;