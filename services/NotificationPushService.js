import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function pushNotification(expoPushToken, notification) {
    const message = {
        to: expoPushToken,
        title: "Findy",
        body: notification.body,
        data: { someData: notification.data },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
}

export async function getToken() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}

function addListeners() {
    let notificationListener = null;
    let responseListener = null;
    let notification = false;

    notificationListener = Notifications.addNotificationReceivedListener((resNotification) => {
        notification = resNotification;
    });

    responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
    });
}

export async function sendNotification(notification) {
    const token = await getToken();

    addListeners();

    await pushNotification(token, notification);
}

export async function sendNotificationToOther(token, notification) {
    addListeners();

    await pushNotification(token, notification);
}
