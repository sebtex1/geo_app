const AvatarUtil = {
    getAvatar: (avatar) => {
        switch (avatar) {
            case "man_1":
                return require("../assets/default_avatars/man_1.png");
            case "man_2":
                return require("../assets/default_avatars/man_2.png");
            case "man_3":
                return require("../assets/default_avatars/man_3.png");
            case "man_4":
                return require("../assets/default_avatars/man_4.png");
            case "man_5":
                return require("../assets/default_avatars/man_5.png");
            case "girl_1":
                return require("../assets/default_avatars/girl_1.png");
            case "girl_2":
                return require("../assets/default_avatars/girl_2.png");
            case "girl_3":
                return require("../assets/default_avatars/girl_3.png");
            case "girl_4":
                return require("../assets/default_avatars/girl_4.png");
            case "girl_5":
                return require("../assets/default_avatars/girl_5.png");
            case false:
                break;
        }
    },
};

export default AvatarUtil;
