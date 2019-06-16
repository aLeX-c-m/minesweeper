import React from 'react'
import ReactDOM from 'react-dom'
import Grid from './Grid.jsx'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            initialGrid: Array(100).fill(true, 0, 10).fill(false, 10, 100),
            rowLength: 10
        }
        this.setMines = this.setMines.bind(this)
        this.flagMine = this.flagMine.bind(this)
        this.recursivelyRevealMines = this.recursivelyRevealMines.bind(this)
    }

    componentWillMount(){
        this.setMines()
    }

    setMines(){   
        var shuffle = new Promise((resolve) =>{
            var a = this.state.initialGrid.slice()
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            resolve(a);
        })
        shuffle.then((grid)=>{
            return grid.map((isMine, idx)=>{
                var { rowLength } = this.state
                var adjacentCount = !!grid[idx - 1]  + !!grid[idx + 1] + !!grid[idx - rowLength - 1] + !!grid[idx - rowLength] + !!grid[idx - rowLength + 1] + !!grid[idx + rowLength - 1] + !!grid[idx + rowLength] + !!grid[idx + rowLength + 1]
                if(idx % rowLength === 0 || (idx + 1) % rowLength === 0 ){
                    var adjacentCount = idx % rowLength === 0 ? !!grid[idx + 1] + !!grid[idx - rowLength] + !!grid[idx - rowLength + 1] + !!grid[idx + rowLength] + !!grid[idx + rowLength + 1] : !!grid[idx - 1]  + !!grid[idx - rowLength - 1] + !!grid[idx - rowLength] + !!grid[idx + rowLength - 1] + !!grid[idx + rowLength]
                }
                return {
                    isFlagged: false,
                    isMine: isMine,
                    isRevealed: false,
                    surroundingMineCount: isMine ? 0 : adjacentCount
                };
            })
        })
        .then((newGrid)=>{
            this.setState({
                initialGrid: newGrid
            })
            
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    recursivelyRevealMines(overallIdx){
        var newMineMap = this.state.initialGrid.slice()
        var { rowLength } = this.state
        var recursivelyReveal = new Promise((resolve)=>{
            var recurse =  function (idx){
                if(idx >= 0 && idx <= newMineMap.length - 1 && newMineMap[idx].isRevealed === false && newMineMap[idx].isMine === false && newMineMap[idx].isFlagged === false){
                    newMineMap[idx].isRevealed = true;
                    if(newMineMap[idx].surroundingMineCount === 0){
                        var indices = [idx - rowLength, idx - 1, idx + 1, idx - rowLength - 1, idx - rowLength + 1, idx + rowLength, idx + rowLength + 1, idx + rowLength - 1]
                        if (idx  % rowLength === 0 || (idx + 1) % rowLength === 0 ){
                            indices = (idx + 1) % rowLength === 0 ? [idx - rowLength, idx - 1, idx - rowLength - 1, idx + rowLength, idx + rowLength - 1] : [idx - rowLength, idx + 1, idx - rowLength + 1, idx + rowLength, idx + rowLength + 1]
                        }
                        indices.forEach((index)=>{
                            if(index >= 0 && index <= newMineMap.length - 1 && newMineMap[index].isRevealed === false){
                                recurse(index);
                            }
                        })
                    }   
                } 
            }
            resolve(recurse(overallIdx))
        })
        recursivelyReveal.then(()=>{
            this.setState({
                initialGrid: newMineMap
            });
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    flagMine(idx){
        var newMineMap = this.state.initialGrid.slice()
        newMineMap[idx].isFlagged = !newMineMap[idx].isFlagged
        this.setState({
            initialGrid: newMineMap
        });
    }

    render(){
        return (
            <div>
                <div id='box'>
                    <h1><span class='title'>MINESWEEPER</span></h1>
                </div>
                 < Grid flagMine={this.flagMine} initialGrid={this.state.initialGrid} recursivelyRevealMines={this.recursivelyRevealMines} />
            </div>)
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))

