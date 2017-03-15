/**
 * Created by AlexWang on 2/12/2016.
 */
import React, {
    Component
} from 'react';
import $ from 'jquery';

class Waterfall extends Component {
    constructor() {
        super();
        this.state = {
            finishLoad: false,
            boxes: [],
            colume: 5,
        };
        this.columechange = this.columechange.bind(this);
        this. minArr = this. minArr.bind(this);
    }
    minArr(arr) {
        var min = arr[0];
        var len = arr.length;
        for (var i = 1; i < len; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
            return min;
        }

        columechange() {
            var windowwidth = $(window).width();
            if (windowwidth < 768) {
                this.setState({
                    colume: this.props.colXs
                })
            } else if (windowwidth >= 768 && windowwidth < 1200) {
                this.setState({
                    colume: this.props.colMd
                })
            } else {
                this.setState({
                    colume: this.props.colLg
                })
            }
        }

        componentWillMount() {

            this.columechange();
            var boxesTemp = [];
            var columnYs = [];
            for (let k = 0; k < this.state.colume; k++) {
                columnYs.push(0);
            }
            var currentX = 0;
            var column = -1;
            var i = -1;
            var loadedImg = 0;
            var marginLeft = this.props.marginLeft || 20;
            var marginRight = this.props.marginRight || 20;
            var marginMid = this.props.marginMid || 10;
            var marginTop = this.props.marginTop || 10;
            //var textHeight = this.props.textHeight || 150;
            var width = ($(window).width() - marginLeft - marginRight - marginMid * 2) / this.state.colume;
            this.props.images.map(
                function(image) {
                    i++;
                    let imgtemp = new Image();
                    imgtemp.src = this.props.images[i].image;
                    imgtemp.onload = function() {
                     //  column = (column + 1) % this.state.colume;
                        column = columnYs.indexOf(this.minArr(columnYs)) ;
                        console.log(column);
                        //get height of current div
                        let divHeight;
                        let realHeight;
                        divHeight = imgtemp.height / imgtemp.width * width;
                        realHeight = columnYs[column];
                        columnYs[column] += divHeight + marginTop;
                        currentX = marginLeft + (marginMid + width) * column;
                        boxesTemp.push({
                            left: currentX,
                            top: realHeight,
                            width: width,
                            height: divHeight
                        });
                        //setstate after loop finish
                        loadedImg++;
                        if (loadedImg == this.props.images.length) {
                            //console.log(boxesTemp);
                            this.setState({
                                boxes: boxesTemp,
                                finishLoad: true
                            });
                        }
                        this._update();
                    }.bind(this)

                }.bind(this)
            );

        }

        render() {
            //console.log("=====================start===============")
            if (this.state.finishLoad) {
                return (
                    <div>
                    {this.props.images.map(
                        function (image, i) {
                            if (i < this.state.boxes.length) {
                                //console.log(i);
                                //console.log(this.state.boxes[i].top);
                                var top = this.state.boxes[i].top;
                                var left = this.state.boxes[i].left;
                                var width = this.state.boxes[i].width;
                                var height = this.state.boxes[i].height;
                                return (
                                    <div key={i} style={{width:'200px',float:'left'}} >
                                        <div
                                            style={{position:'absolute',width:width,height:height,top:top,left:left}}>
                                            <img
                                                style={{width:width,height:height,top:top,left:left}}
                                                src={this.props.images[i].image}></img>
                                        </div>
                                    </div>
                                );
                            }
                        }.bind(this)
                    )}
                </div>
                );
            } else {
                return (
                    <div></div>
                );
            }
        }


        componentDidMount() {
            window.addEventListener("resize", this._update.bind(this));
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this._update.bind(this));
        }

        _update() {
            this.columechange();
            var boxesTemp = [];
            var columnYs = [];
            for (let k = 0; k < this.state.colume; k++) {
                columnYs.push(0);
            }
            var currentX = 0;
            var column = -1;
            var i = -1;
            var loadedImg = 0;
            var marginLeft = this.props.marginLeft || 20;
            var marginRight = this.props.marginRight || 20;
            var marginMid = this.props.marginMid || 10;
            var marginTop = this.props.marginTop || 10;
            //var textHeight = this.props.textHeight || 150;
            var width = ($(window).width() - marginLeft - marginRight - marginMid * 2) / this.state.colume;
            this.props.images.map(
                function(image) {
                    i++;
                    let imgtemp = new Image();
                    imgtemp.src = this.props.images[i].image;
                    imgtemp.onload = function() {
                        //column = (column + 1) % this.state.colume;
                        column = columnYs.indexOf(this.minArr(columnYs))
                            //get height of current div
                        let divHeight;
                        let realHeight;
                        divHeight = imgtemp.height / imgtemp.width * width;


                        realHeight = columnYs[column];
                        columnYs[column] += divHeight + marginTop;
                        currentX = marginLeft + (marginMid + width) * column;
                        boxesTemp.push({
                            left: currentX,
                            top: realHeight,
                            width: width,
                            height: divHeight
                        });
                        //setstate after loop finish
                        loadedImg++;
                        if (loadedImg == this.props.images.length) {
                            //console.log(boxesTemp);
                            this.setState({
                                boxes: boxesTemp,
                                finishLoad: true
                            });
                        }
                    }.bind(this)
                }.bind(this)
            )
        }
    }

    export default Waterfall