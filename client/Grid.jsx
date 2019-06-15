import React from 'react';

class Grid extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            unflagged: 10,
            minesTripped: false,
            gameWon: false
        }
    }

    incrementFlagCount(){
        this.setState({
            unflagged: this.state.unflagged - 1
        })
    }

    determineClass(quad){
        var classString = ''
        if(quad.isFlagged || quad.isMine){
            classString = quad.isFlagged ? 'flagged' : 'mine';
        }
        return classString;
    }

    determineinnerHTMLContent(quad){
        if(quad.revealed && !this.props.minesTripped){
                return quad.surroundingMineCount !== 0 ? quad.surroundingMineCount : null;     
        } else if(quad.isFlagged){
            if(this.state.minesTripped && !quad.isMine){
                return  <img src='red_flag.png'></img>;
            } else {
                return  <img src='white_lag.png'></img>;
            }
        } else if (this.state.minesTripped && quad.isMine ){
                return <img src='redmine.png'></img>;
        } else {
            return null;
        }
    }

    renderTitleMessage(){
        if(this.state.minesTripped ){
            return ' REFRESH 2 PLAY AGAIN !!';
        } else {
            if(this.state.unflagged === 0 && this.props.initialGrid.every((quad)=>((quad.isMine && quad.isFlagged) || quad.revealed ? true : false))){
                this.setState({gameWon: true})
                return '!! REFRESH 2 PLAY AGAIN';
            } else {
                return 'remaining flags: ' + this.state.unflagged;
            }
        }
    }

    render(){
        return (
            <div>
                <div id= 'logo'>
                <img src={this.state.minesTripped ? 'skull.png' : ''}></img>
                <img src={this.state.gameWon ? 'smiley.png' : ''}></img>
                    {this.renderTitleMessage()}
                </div>
                <span id='spanGrid'>
                {this.props.initialGrid.map((q, idx)=>{
                    var quad = this.props.initialGrid[idx]
                        return <div id={quad.revealed || (this.state.minesTripped && (quad.isMine && !quad.isFlagged || (quad.isFlagged && !quad.isMine)) )? 'revealedQuad' : 'quad'} class={this.determineClass(quad)} key={idx} value={idx} onClick={(e)=>{
                             if(quad.isMine){
                                this.setState({minesTripped: true})
                            } else if(!quad.isFlagged){
                                this.props.recursivelyRevealMines(idx)
                            }
                        }} onContextMenu={(event)=>{
                            event.preventDefault()
                            if(this.state.unflagged >= 0 && this.state.unflagged <= 10){
                                if(!quad.revealed){
                                    if(quad.isFlagged || (!quad.isFlagged && this.state.unflagged !== 0)){
                                        this.props.flagMine(idx)
                                        this.setState({unflagged: this.props.initialGrid[idx].isFlagged ? this.state.unflagged - 1 : this.state.unflagged + 1})
                                    }  
                                }
                                
                            }
                            
                            return false;
                        }}>{this.determineinnerHTMLContent(quad)}</div>
                })}
                </span>
            </div>
        )
    }

}

export default Grid