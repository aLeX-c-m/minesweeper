# Minesweeper

1. 'npm install' dependencies
2. 'npm run sdev'
3. 'npm run rdev'
4. navigate to localhost:3000/
5. right click to place white flag
6. click to reveal quadrant
    a. if you click on an active mine:
        - all mines will be tripped and show red mine pngs
        - flags that were incorrectly placed over inactive quadrants will turn red
    b. if you click on an inactive mine:
        - all empty quadrants around it will be revealed up until a quadrant that reveals the surrounding mine count