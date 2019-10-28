// const address = `http://192.168.1.180:8765/jms`;
// const address = `http://192.168.56.1:8765/jms`;
const address = `http://37.18.30.35/jms`;

const variables = {
    apiUrl: address,
    bilgenBookApiUrl: `${address}/bilgen-bbook`,

    appStates: {
        NO_TOKEN:           '1',
        NO_USER:            '2',
        NO_BOOK:            '3',
        DOWNLOADING_BOOK:   '4',
        USING_APP:          '5',
        UPDATING_BOOK:      '6',
    },

    scanOptions: {
        formats: "QR_CODE",
        cancelLabel: "EXIT. Also, try the volume buttons!",
        cancelLabelBackgroundColor: "#333333",
        message: "QR-кодты растаңыз",
        showFlipCameraButton: true,
        preferFrontCamera: false,
        showTorchButton: true,
        beepOnScan: true,
        torchOn: false,
        resultDisplayDuration: 500,
        openSettingsIfPermissionWasPreviouslyDenied: true
    },

    appFolderName: 'aidar'
};

export default variables;
