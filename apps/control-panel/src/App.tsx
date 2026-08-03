import { useEffect, useState, useRef } from 'react'
import './App.css'
import { ColourPicker } from './components/ColourPicker';

function App() {
    const [gridConfig, setGridConfig] = useState({
        width: 100,
        height: 100,
        cellSize: 10,
        colours: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
        blinkSpeeds: [0.5, 1, 1.5, 2, 2.5],
    });
    const gridRef = useRef(null);

    function getRandomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
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
            
            const randomSpeed = gridConfig.blinkSpeeds[Math.floor(Math.random() * gridConfig.blinkSpeeds.length)];
            square.style.animationDuration = `${randomSpeed}s`;
            square.style.animationDelay = `${Math.random() * 2}s`;

            gridContainer.appendChild(square);
        }
    }

    function updateColourPicker(index, newColour) {
        setGridConfig(config => ({
            ...config,
            colours: config.colours.map((colour, i) =>
                i === index ? newColour : colour
            )
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
                    <label>
                        Grid Width:
                        <input 
                            type="number" 
                            id="gridWidth" 
                            min="10" 
                            max="200" 
                            value={gridConfig.width}
                            onChange={(e) => 
                                setGridConfig(config => ({
                                    ...config,
                                    width: Number(e.target.value)
                                }))
                            }
                        />
                    </label>
                    <label>
                        Grid Height:
                        <input 
                            type="number" 
                            id="gridHeight" 
                            min="10" 
                            max="200" 
                            value={gridConfig.height}
                            onChange={(e) => 
                                setGridConfig(config => ({
                                    ...config,
                                    height: Number(e.target.value)
                                }))
                            }
                        />
                    </label>
                    <label>
                        Cell Size:
                        <input 
                            type="number" 
                            id="cellSize"
                            min="5"
                            max="20"
                            value={gridConfig.cellSize}
                            onChange={(e) => 
                                setGridConfig(config => ({
                                    ...config,
                                    cellSize: Number(e.target.value)
                                }))
                            }
                        />
                    </label>
                    <ColourPicker
                        id="colour-picker0"
                        labelText="Colour 1:"
                        value={gridConfig.colours[0]}
                        onColourChange={(colour) => updateColourPicker(0, colour)}
                    />
                    <ColourPicker
                        id="colour-picker0"
                        labelText="Colour 2:"
                        value={gridConfig.colours[1]}
                        onColourChange={(colour) => updateColourPicker(1, colour)}
                    />
                    <ColourPicker
                        id="colour-picker0"
                        labelText="Colour 3:"
                        value={gridConfig.colours[2]}
                        onColourChange={(colour) => updateColourPicker(2, colour)}
                    />
                    <ColourPicker
                        id="colour-picker0"
                        labelText="Colour 4:"
                        value={gridConfig.colours[3]}
                        onColourChange={(colour) => updateColourPicker(3, colour)}
                    />
                    <ColourPicker
                        id="colour-picker0"
                        labelText="Colour 5:"
                        value={gridConfig.colours[4]}
                        onColourChange={(colour) => updateColourPicker(4, colour)}
                    />
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
