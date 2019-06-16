import React from 'react';

class Grid extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            unflagged: 10,
            minesTripped: false,
            gameWon: false
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.rightClickHandler = this.rightClickHandler.bind(this)
    }

    checkWin(){
        if(!this.state.gameWon && (this.state.unflagged === 0 && this.props.initialGrid.every((quad)=>((quad.isMine && quad.isFlagged) || quad.isRevealed)))){
            this.setState({gameWon: true})
        }
    }

    clickHandler(quad, idx){
        if(quad.isMine){
            this.setState({minesTripped: true})
        } else if(!quad.isFlagged){
            this.props.recursivelyRevealMines(idx)
            this.checkWin()
        }
    } 
    
    rightClickHandler(event, quad, idx){
        event.preventDefault();
        if(this.state.unflagged >= 0 && this.state.unflagged <= 10){
            if(!quad.isRevealed){
                if(quad.isFlagged || (!quad.isFlagged && this.state.unflagged !== 0)){
                    this.props.flagMine(idx)
                    this.setState({unflagged: this.props.initialGrid[idx].isFlagged ? this.state.unflagged - 1 : this.state.unflagged + 1})
                    this.checkWin()
                }  
            }
        }
        return false;
    }

    determineClass(quad){
        var classString = ''
        if(quad.isFlagged || quad.isMine){
            classString = quad.isFlagged ? 'flagged' : 'mine'
        }
        return classString;
    }

    determineId(quad){
        return quad.isRevealed || (this.state.minesTripped && (quad.isMine && !quad.isFlagged || (quad.isFlagged && !quad.isMine))) ? 'revealedQuad' : 'quad'
    }

    determineInnerHTMLContent(quad){
        if(quad.isRevealed && !this.props.minesTripped){
                return quad.surroundingMineCount !== 0 ? quad.surroundingMineCount : null;     
        } else if(quad.isFlagged){
            return this.state.minesTripped && !quad.isMine ? <img src='red_flag.png'></img> : <img src='white_flag.png'></img>;
        } else if (this.state.minesTripped && quad.isMine ){
                return <img src='red_mine.png'></img> 
        } else {
            return null;
        }
    }

    renderTitleMessage(){
        if(this.state.minesTripped ){
            return ' OOPS !!';
        } else {
            if(this.state.gameWon){
                return ' YOU WON !!';
            } else {
                return 'remaining flags: ' + this.state.unflagged;
            }
        }
    } 

    render(){
        return (
            <div>
                <div id= 'title'>
                    <img src={this.state.minesTripped ? 'skull.png' : ''} onClick={()=>{window.location.reload()}} ></img>
                    <img src={this.state.gameWon ? 'smiley.png' : ''} onClick={()=>{window.location.reload()}} ></img>
                    {this.renderTitleMessage()}
                    {this.state.gameWon || this.state.minesTripped ? <div id='box'><h1> <span id='refresh' onClick={()=>{window.location.reload()}}>{this.state.gameWon || this.state.minesTripped ? 'PLAY AGAIN' : ''} </span></h1></div> : <div></div>} 
                </div>
                <span id='spanGrid'>
                {this.props.initialGrid.map((q, idx)=>{
                    var quad = this.props.initialGrid[idx]
                        return <div id={this.determineId(quad)} class={this.determineClass(quad)} key={idx} value={idx} onClick={()=>{ 
                            this.clickHandler(quad, idx)
                        }} onContextMenu={(event)=>{
                            this.rightClickHandler(event, quad, idx)
                        }}>{this.determineInnerHTMLContent(quad)}</div>
                })}
                </span>
            </div>
        )
    }
}

export default Grid