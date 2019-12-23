import React from "react";
import { css } from "@emotion/core";
import {PulseLoader } from "react-spinners";
import "./spinnerCustom.css"


export default class SpinnerCustom extends React.Component {
    constructor(props) {
        super(props);
    }

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