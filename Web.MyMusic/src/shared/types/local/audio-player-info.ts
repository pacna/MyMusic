export type AudioPlayerInfo = {
    id: string;
    visible: boolean;
    path: string;
};

export type AudioPlayerContextConfig = {
    audioPlayerState: AudioPlayerInfo;
    audioPlayerDispatch: (value: {
        property: string | string[];
        payload: string | boolean | AudioPlayerInfo;
    }) => void;
};
