import { useEffect, useState, useRef } from 'react'
import './App.css'
import { ColourPicker } from './components/ColourPicker';
import { NumberInput } from './components/NumberInput';

function App() {
    const [gridConfig, setGridConfig] = useState({
        width: 100,
        height: 100,
        cellSize: 10,
        colours: [
            { id: 1, colour: "#FF0000" },
            { id: 2, colour: "#00FF00" },
            { id: 3, colour: "#0000FF" },
            { id: 4, colour: "#FFFF00" },
            { id: 5, colour: "#FF00FF" }
        ],
        blinkSpeeds: [
            { id: 1, speed: 0.5, },
            { id: 2, speed: 1, },
            { id: 3, speed: 1.5, },
            { id: 4, speed: 2, },
            { id: 5, speed: 2.5 },
        ],
    });
    const gridRef = useRef(null);

    function getRandomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)].colour;
    }

    function getRandomSpeed(speeds) {
        return speeds[Math.floor(Math.random() * speeds.length)].speed;
    }

    function drawGrid(
        gridConfig,
    ) {
        const gridContainer = gridRef.current
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns =
            `repeat(${gridConfig.width}, ${gridConfig.cellSize}px)`;
        gridContainer.style.width = `${gridConfig.width * gridConfig.cellSize}px`;
        gridContainer.style.height = `${gridConfig.height * gridConfig.cellSize}px`;

        for (let i = 0; i < gridConfig.width * gridConfig.height; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.backgroundColor = getRandomColor(gridConfig.colours);
            square.style.animationDuration = `${getRandomSpeed(gridConfig.blinkSpeeds)}s`;
            square.style.animationDelay = `${Math.random() * 2}s`;

            gridContainer.appendChild(square);
        }
    }

    function updateColourPicker(id, newColour) {
        setGridConfig(config => ({
            ...config,
            colours: config.colours.map((colourConfig, i) =>
                id === colourConfig.id
                    ? { ...colourConfig, colour: newColour }
                    : colourConfig
            )
        }))
    }

    function updateNumericalConfig(param, newValue) {
        setGridConfig(config => ({
            ...config,
            [param]: newValue
        }))
    }

    useEffect(() => {
        drawGrid(
            gridConfig
        )
    }, [gridConfig]);
        
  return (
    <>
        <header id="main-header">
            <h1>Blinky Squares</h1>
        </header>
        <section className="container">
            <aside id="control-panel">
                <h2>Control Panel</h2>
                    <NumberInput
                        id="gridWidth"
                        labelText="Grid Width:"
                        min="1"
                        max="200"
                        value={gridConfig.width}
                        onInputChange={(value) => updateNumericalConfig("width", value)}
                    />
                    <NumberInput
                        id="gridHeight"
                        labelText="Grid Height:"
                        min="10"
                        max="200"
                        value={gridConfig.height}
                        onInputChange={(value) => updateNumericalConfig("height", value)}
                    />
                    <NumberInput
                        id="cellSize"
                        labelText="Cell size:"
                        min="5"
                        max="20"
                        value={gridConfig.cellSize}
                        onInputChange={(value) => updateNumericalConfig("cellSize", value)}
                    />
                    {gridConfig.colours.map(item => (
                        <ColourPicker
                            id={"colour-picker" + item.id}
                            labelText={"Colour " + item.id}
                            key={item.id}
                            value={item.colour}
                            onColourChange={(colour) => updateColourPicker(item.id, colour)}
                        />
                    ))}
            </aside>
            <div id="grid-container">
                <div 
                    id="squares-grid"
                    ref={gridRef}
                ></div>
            </div>
        </section>
    </>
  )
}

export default App
