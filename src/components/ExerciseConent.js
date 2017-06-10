import React, { Component } from 'react';
import {config} from '../config'
import { varEmpty, strFindIgnoreCase } from '../utils/util';

class ExerciseContent extends Component {
    render() { // props: text
        const { text} = this.props;
        const imgSuffixes = ['.jpg', '.gif', '.png', '.bmp'];

        if (varEmpty(text))
            return <span/>;
        return (
            <span>
                {
                    text.split("[!").map((item, index) => {
                        if (index === 0)
                            return <span key={index} className="exercise-content-span">{item}</span>;
                        else {
                            let findImg = false;
                            let results = imgSuffixes.map((imgSuffix, j) => {
                                let pos = strFindIgnoreCase(item, imgSuffix + ']');
                                if (pos > 0 && item.indexOf(']') === pos + imgSuffix.length) {
                                    let imgUrl = item.substring(0, pos + imgSuffix.length);
                                    const pathNames = imgUrl.split('/');
                                    let imgName = pathNames[pathNames.length - 1];
                                    findImg = true;
                                    return (
                                        <span key={index} style={{display: 'block'}}>
                                            <img alt={imgName} src={config.imgUrlDir + '/' + imgUrl} style={{maxWidth: '660px'}}/>
                                            <span>{item.substring(pos + imgSuffix.length + 1, item.length)}</span>
                                        </span>
                                    );
                                }
                                return null;
                            });

                            if (findImg)
                                return results;

                            return (
                                <span key={index} className="exercise-content-span">
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