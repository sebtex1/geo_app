import { Button } from "@rneui/base";

const BoutonLogin = (props) => {
    return (
        <Button
            titleStyle={{ color: "black" }}
            buttonStyle={{ borderColor: "black", borderRadius: 10, borderWidth: 2 }}
            type="outline"
            title="CONTINUER"
            {...props}
        />
    );
};

export default BoutonLogin;
