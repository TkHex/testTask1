export class InputController {
    constructor() {
        this.ACTION_LEFT = null;
        this.ACTION_RIGHT = null;
        this.ACTION_TOP = null;
        this.ACTION_DOWN = null;
        this.ACTION_SPACE = null;
        
        this.deviceList = new Map();
        this.actions = [];

        this.buttonPress = this.buttonPress.bind(this);
        this.buttonRelease = this.buttonRelease.bind(this);
    }

    getDevices() {
        return this.deviceList;
    }

    getActiveDevices() {
        let activeDev = new Array();

        this.deviceList.forEach(dev => {
            if (this.deviceList.get(dev) == true) {
                activeDev.push(dev);
            }
        });
        return activeDev;
    }

    addDevice(deviceName) {
        if (!this.isContainDevice(deviceName)) {
            this.deviceList.set(deviceName, false);
            console.log(`Устройство ${deviceName} добавлено!`);
        } else {
            console.log("Ошибка добавления устройства: устройство уже включено");
        }
    }

    removeDevice(deviceName) {
        if (this.isContainDevice(deviceName)) {
            this.deviceList.delete(deviceName);
            console.log(`Устройство ${deviceName} удалено!`);
        } else {
            console.log("Ошибка удаления устройства: устройство не найдено");
        }
    }

    isContainDevice(device) {
        if (this.deviceList.has(device)) {
            return true;
        } else {
            return false;
        }
    }

    isEnabledDevice(device) {
        if (this.isContainDevice(device) && this.deviceList.get(device)) {
            return true;
        } else {
            return false;
        }
    }

    enableDevice(deviceName) {
        if (!this.isEnabledDevice(deviceName)) {
            this.deviceList.set(deviceName, true);

            if (deviceName === "keyboard") {
                document.addEventListener("keydown", this.buttonPress);
                document.addEventListener("keyup", this.buttonRelease);
            }
        }
    }

    disableDevice(deviceName) {
        if (this.isEnabledDevice(deviceName)) {
            this.deviceList.set(deviceName, false);

            if (deviceName === "keyboard") {
                document.removeEventListener('keydown', this.buttonPress);
                document.removeEventListener('keyup', this.buttonRelease);
            }
        }
    }

    buttonPress(event) {
        if (event.keyCode === 37 || event.keyCode === 65) {
            this.ACTION_LEFT = true;
        }

        if (event.keyCode === 68 || event.keyCode === 39) {
            this.ACTION_RIGHT = true;
        }

        if (event.keyCode === 87 || event.keyCode === 38) {
            this.ACTION_TOP = true;
        }

        if (event.keyCode === 83 || event.keyCode === 40) {
            this.ACTION_BOTTOM = true;
        }

        if (event.key === ' ') {
            this.ACTION_SPACE = true;
            setTimeout(() => {
                this.ACTION_SPACE = false;
            }, 500);
        }
    }

    buttonRelease(event) {
        if (event.keyCode === 65 || event.keyCode == 37) {
            this.ACTION_LEFT = false;
        }

        if (event.keyCode === 68 || event.keyCode === 39) {
            this.ACTION_RIGHT = false;
        }

        if (event.keyCode === 87 || event.keyCode === 38) {
            this.ACTION_TOP = false;
        }

        if (event.keyCode === 83 || event.keyCode === 40) {
            this.ACTION_BOTTOM = false;
        }

        if (event.key === ' ') {
            this.ACTION_SPACE = false;
        }
    }
}

export const controller = new InputController();