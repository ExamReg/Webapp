import React from "react";
import {PulseLoader } from "react-spinners";
import "./spinnerCustom.css"


export default class SpinnerCustom extends React.Component {

    render() {
        return (
                <div className="cover">
                    <PulseLoader
                        size={16}
                        color={"white"}
                        loading={this.props.loading}
                    />
                </div>
        );
    }
}