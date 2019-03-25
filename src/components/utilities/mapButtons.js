import React, { Component } from "react"

class mapButtons extends React.Component {

    render(){
        return (
            <div className='mapButtons'>
                <button data-id="2" onClick={this.props.switchMapStyle}>
                    Population data
                </button>
                <button data-id="3" onClick={this.props.switchMapStyle}>
                    World subregions
                </button>
                <button data-id="1" onClick={this.props.switchMapStyle}>
                    Standard
                </button>
                <button data-id="4" onClick={this.props.switchMapStyle}>
                    Income
                </button>
                <button onClick={this.props.handleReset}>
                    Reset
                </button>
            </div>
        )
    }
}
export default mapButtons