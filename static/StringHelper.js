const StringHelper = {
    isBlank: (string) => {
        return !string || /^\s*$/.test(string);
    },
};

export default StringHelper;
