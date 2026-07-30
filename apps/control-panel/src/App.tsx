import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
    const [gridConfig, setGridConfig] = useState({
        width: 100,
        height: 100,
        cellSize: 10,
        colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
        blinkSpeeds: [0.5, 1, 1.5, 2, 2.5],
    });
    const gridRef = useRef(null);

    function getRandomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function drawGrid(
        gridConfig,
    ) {
        console.log(gridConfig)
        const gridContainer = gridRef.current
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns =
            `repeat(${gridConfig.width}, ${gridConfig.cellSize}px)`;
        gridContainer.style.width = `${gridConfig.width * gridConfig.cellSize}px`;
        gridContainer.style.height = `${gridConfig.height * gridConfig.cellSize}px`;

        for (let i = 0; i < gridConfig.width * gridConfig.height; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.backgroundColor = getRandomColor(gridConfig.colors);
            
            const randomSpeed = gridConfig.blinkSpeeds[Math.floor(Math.random() * gridConfig.blinkSpeeds.length)];
            square.style.animationDuration = `${randomSpeed}s`;
            square.style.animationDelay = `${Math.random() * 2}s`;

            gridContainer.appendChild(square);
        }
        console.log("drawing")
    }

    // document.getElementById('control-panel').addEventListener('input', (e) => {
    //     if (e.target.classList.contains('colour-picker')) {
    //         const pickerId = e.target.id;
    //         const pickerIndex = parseInt(pickerId.replace('colour-picker', ''));
    //         gridConfig.colors[pickerIndex] = e.target.value;
    //         drawGrid(gridConfig);
    //     }
    // });


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
                      <input type="color" id="colour-picker0" className="colour-picker" value="#FF0000" />
                  </label>
                  <label>
                      Colour 2:
                      <input type="color" id="colour-picker1" className="colour-picker" value="#00FF00" />
                  </label>
                  <label>
                      Colour 3:
                      <input type="color" id="colour-picker2" className="colour-picker" value="#0000FF" />
                  </label>
                  <label>
                      Colour 4:
                      <input type="color" id="colour-picker3" className="colour-picker" value="#FFFF00" />
                  </label>
                  <label>
                      Colour 5:
                      <input type="color" id="colour-picker4" className="colour-picker" value="#FF00FF" />
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
