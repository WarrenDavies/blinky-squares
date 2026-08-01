import { useEffect, useState, useRef } from 'react'
import './App.css'

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
                  <label>
                      Colour 1:
                      <input 
                        type="color"
                        id="colour-picker0"
                        className="colour-picker"
                        value={gridConfig.colours[0]}
                        onChange={(e) =>
                            setGridConfig(config => ({
                                ...config,
                                colours: config.colours.map((colour, i) =>
                                    i === 0 ? e.target.value : colour
                                )
                            }))
                        }
                     />
                  </label>
                  <label>
                      Colour 2:
                      <input 
                        type="color"
                        id="colour-picker1"
                        className="colour-picker"
                        value={gridConfig.colours[1]}
                        onChange={(e) =>
                            setGridConfig(config => ({
                                ...config,
                                colours: config.colours.map((colour, i) =>
                                    i === 1 ? e.target.value : colour
                                )
                            }))
                        }
                     />
                  </label>
                  <label>
                      Colour 3:
                      <input 
                        type="color"
                        id="colour-picker2"
                        className="colour-picker"
                        value={gridConfig.colours[2]}
                        onChange={(e) =>
                            setGridConfig(config => ({
                                ...config,
                                colours: config.colours.map((colour, i) =>
                                    i === 2 ? e.target.value : colour
                                )
                            }))
                        }
                     />
                  </label>
                  <label>
                      Colour 4:
                      <input 
                        type="color"
                        id="colour-picker3"
                        className="colour-picker"
                        value={gridConfig.colours[3]}
                        onChange={(e) =>
                            setGridConfig(config => ({
                                ...config,
                                colours: config.colours.map((colour, i) =>
                                    i === 3 ? e.target.value : colour
                                )
                            }))
                        }
                     />
                  </label>
                  <label>
                      Colour 5:
                      <input 
                        type="color"
                        id="colour-picker4"
                        className="colour-picker"
                        value={gridConfig.colours[4]}
                        onChange={(e) =>
                            setGridConfig(config => ({
                                ...config,
                                colours: config.colours.map((colour, i) =>
                                    i === 4 ? e.target.value : colour
                                )
                            }))
                        }
                     />
                  </label>
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
