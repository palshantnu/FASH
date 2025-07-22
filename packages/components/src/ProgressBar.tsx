import React, { useState } from 'react';
import { View } from 'react-native';

interface barProps {
    percentage: string,
    height: number,
    backgroundColor: string,
    completedColor: string,
}

const ProgressBar = (props: barProps) => {
    const [getPercentage, setPercentage] = useState(props.percentage);
    const [getheight, setHeight] = useState(props.height);
    const [getBackgroundColor, setBackgroundColor] = useState(props.backgroundColor);
    const [getCompletedColor, setCompletedColor] = useState(props.completedColor);
    return (
        <View>
            <View style={{ justifyContent: 'center' }}>
                <View
                    style={{

                        width: '100%',
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 8,
                        borderColor: getBackgroundColor,
                        borderWidth: 1,
                        backgroundColor:getBackgroundColor
                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 8,
                        backgroundColor: getCompletedColor,
                        position: 'absolute',
                        bottom: props.height
                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        bottom: 10,
                    }}>
                </View>
            </View>
        </View>
    );
};
export default ProgressBar;