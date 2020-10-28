interface AppConfig {
    ROUTES: {
        LOG_IN: string;
        SIGN_UP: string;
        HOME: string;
        FOLDER: string;
        FOLDER_PARAMS: string;
        FAVOURITES: string;
        TRASH: string;
    };
    ENDPOINTS: {
        LOG_IN: string;
        SIGN_UP: string;
        USER_INFO: string;
        FOLDERS: string;
    };
}

export const APP_CONSTANTS: AppConfig = {
    ROUTES: {
        LOG_IN: '/log-in',
        SIGN_UP: '/sign-up',
        HOME: '/home',
        FOLDER: '/home/folder',
        FOLDER_PARAMS: '/home/folder/:id',
        FAVOURITES: '/favourites',
        TRASH: '/trash'
    },
    ENDPOINTS: {
        LOG_IN: `${process.env.REACT_APP_BASE_URL}/log-in`,
        SIGN_UP: `${process.env.REACT_APP_BASE_URL}/sign-up`,
        USER_INFO: `${process.env.REACT_APP_BASE_URL}/user-info`,
        FOLDERS: `${process.env.REACT_APP_BASE_URL}/folders`
    }
};
