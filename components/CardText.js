import { Card, Text } from "@rneui/base";
import cardTextStyle from "../styles/CardTextStyle";

const CardText = (props) => {
    return (
        <Card containerStyle={cardTextStyle.container}>
            <Text style={cardTextStyle.text}>{props.text}</Text>
        </Card>
    );
};

export default CardText;
