import { Input } from "@rneui/base";
import commonStyles from "../styles/CommonStyles";

const InputField = (props) => {
    return (
        <Input
            inputStyle={[commonStyles.backgroundSecondary, { borderRadius: 10 }]}
            inputContainerStyle={{ borderColor: "black", borderRadius: 12 }}
            labelStyle={{ color: "black" }}
            {...props}
        />
    );
};

export default InputField;
