import { Component } from "react";

class OTMessage extends Component {
  render() {
    return (
      <>
        <div className={`alert alert-${this.props.alertType}`} style={{position: 'relative'}}>
          {this.props.children}
          <button type="button" className="btn" style={{right: '0px', bottom: '10px', position: 'absolute'}} onClick={this.props.closeAlert}>&times;</button>
        </div>
      </>
    );
  }
}

export default OTMessage;
