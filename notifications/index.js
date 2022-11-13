
export const newNotification = (store, notification = {
    type: "info",
    title: "Notification",
    message: "This is a notification",
    date: new Date()

}, exp) => {
    const uuid = Date.now();

    store.update(notifications => [...notifications, {
        ...notification,
        uuid
    }])

    if (exp) {
        setTimeout(() => {
            deleteNotification(store, uuid);
        }, exp)
    }
}


export const deleteNotification = (store, uuid) => {
    store.update(notifications => notifications.filter(notification => notification.uuid !== uuid))
}