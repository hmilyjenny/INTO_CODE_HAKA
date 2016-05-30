import React from 'react';
import QRCode from 'qrcodejs2';

var QRCodeComponent = React.createClass({
    componentDidMount: function () {
        let qrcode = new QRCode(this.refs.QRCodeDiv, {
            width: this.props.width ? this.props.width : 168,
            height: this.props.height ? this.props.height : 168,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        qrcode.makeCode(this.props.QRText);
    },
    render: function () {
        return (
            <div ref="QRCodeDiv"></div>
        );
    }
})

export default QRCodeComponent;