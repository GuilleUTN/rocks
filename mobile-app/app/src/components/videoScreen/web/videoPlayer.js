import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
import { connect } from 'react-redux';

class VideoPlayerWeb extends Component {
constructor(props){
  super(props)
}
handleChanges(){
  if(this.refs.player){
    if(this.props.video.paused){
      this.refs.player.pause()
    }else{
      this.refs.player.play()
    }
  }
}
render() {
    this.handleChanges()
    return (
          <Player
          ref="player"
          autoPlay
          muted={this.props.video.muted}
        >
          <source src={this.props.uri} />
          <ControlBar autoHide={false} />
        </Player>
    );
  }
}

function mapStateToProps(state){
  return{
    video:state.video,
  }
}

export default connect(mapStateToProps,()=>{return{}})(VideoPlayerWeb)
