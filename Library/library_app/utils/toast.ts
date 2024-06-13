import Toast from "react-native-root-toast";
const toastCustom = (type: string = "default", msg: string) => {
    let color: string | undefined = undefined;
    switch (type) {
        case "default":
            color = undefined
            break;
        case "primary":
            color = "#0d6efd"
            break;
        case "info":
            color = "#0dcaf0"
            break;
        case "success":
            color = "#198754"
            break;
        case "pending":
            color = "#ffc107"
            break;
        case "error":
            color = "#dc3545"
            break;
        default:
            break;
    }
    Toast.show(msg, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: color
    });
}
export const toast = {
    default: (msg: string) => {
        toastCustom("default", msg)
    },
    primary: (msg: string) => {
        toastCustom("primary", msg)
    },
    success: (msg: string) => {
        toastCustom("success", msg)
    },
    error: (msg: string) => {
        toastCustom("error", msg)
    }, info: (msg: string) => {
        toastCustom("info", msg)
    },
    pending: (msg: string) => {
        toastCustom("pending", msg)
    }
}