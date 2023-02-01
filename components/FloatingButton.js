import React from 'react';
import { View } from 'react-native';
import { FloatingAction } from "react-native-floating-action";

const FloatingButton = (props) => {
    const actions = [
        {
            text: props.text,
            icon: props.icon,
            name: props.text,
            position: 1,
        },
    ];
    return (
        <>
            <FloatingAction
                color='#FFDA66'
                iconWidth={props.size}
                iconHeight={props.size}
                actions={actions}
                overrideWithAction={true}
                onPressItem={() => {
                    props.onPress();
                }}
            />
        </>
    );
};

export default FloatingButton;