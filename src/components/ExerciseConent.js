import React, { Component } from 'react';
import {config} from '../config'
import { varEmpty, strFindIgnoreCase } from '../utils/util';

class ExerciseContent extends Component {

    render() { // props: text
        const { text} = this.props;
        const imgSuffixes = ['.jpg', '.gif', '.png', '.bmp'];
        const imgUrlDir = config.imgUrlDir;

        if (varEmpty(text))
            return <span/>;
        return (
            <span>
                {
                    text.split("[!").map((item, index) => {
                        if (index === 0)
                            return <span key={index} >{item}</span>;
                        else {
                            let findImg = false;
                            let results = imgSuffixes.map((imgSuffix, j) => {
                                let pos = strFindIgnoreCase(item, imgSuffix + ']');
                                if (pos > 0 && item.indexOf(']') === pos + imgSuffix.length) {
                                    let imgName = item.substring(0, pos + imgSuffix.length);
                                    let imgUrl = imgUrlDir + imgName;
                                    findImg = true;
                                    return (
                                        <span key={index}>
                                            <img alt={imgName} src={imgUrl} />
                                            <span>{item.substring(pos + imgSuffix.length + 1, item.length)}</span>
                                        </span>
                                    );
                                }
                                return null;
                            });

                            if (findImg)
                                return results;

                            return (
                                <span key={index}>
                                    {item}
                                </span>
                            );
                        }
                    })
                }
            </span>
        );
    }
}
export default ExerciseContent