/**
 * Created by AlexWang on 8/11/2016.
 */
import React, {
    Component
} from 'react'
import Waterfall from "./component/Waterfall"
class Home extends Component {
    constructor() {
        super();
        this.state = {
            images: [{
                    image: "../img/1.png",
                }, 
                {
                    image: "../img/2.png",
                }, 
                {
                    image: "../img/3.png",
                }, 
                {
                    image: "../img/4.png",
                }, 
                {
                    image: "../img/5.png",
                }, 
                {
                    image: "../img/6.png",
                }, 
                {
                    image: "../img/7.png",
                }, 
                {
                    image: "../img/8.png",
                }, 
            ],
        }
    }


    render() {
        return (
            <div>
                <Waterfall  images={this.state.images} colLg={5} colMd={3} colXs={1} ></Waterfall>
            </div>
        );
    }
}

export default Home