const StringUtil = {
    isBlank: (string) => {
        return !string || /^\s*$/.test(string);
    },
};

export default StringUtil;
